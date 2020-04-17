import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAABdSWBNRq4qGfthkBI7kyxHdOph3L_kc',
	authDomain: 'togheder-f6bf2.firebaseapp.com',
	databaseURL: 'https://togheder-f6bf2.firebaseio.com',
	projectId: 'togheder-f6bf2',
	storageBucket: 'togheder-f6bf2.appspot.com',
	messagingSenderId: '565014091507',
	appId: '1:565014091507:web:6c367313a124f405b88986',
	measurementId: 'G-04GFM4DMET'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const userArr = firestore.doc('searchusers/F6HYw5Nwerc3tnwSf3aI');
	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email, photoURL } = userAuth;
		const createdAt = new Date();

		try {
			await userRef
				.set({
					displayName,
					email,
					createdAt,
					photoURL,
					spendings: [],
					connections: [],
					notifications: [],
					...additionalData
				})
		} catch (error) {
			console.log('error creating user', error.message);
    }
    const snapShotUser = await userRef.get();
		try {
			await userArr.update({
		    users: firebase.firestore.FieldValue.arrayUnion({
		      displayName:snapShotUser.data().displayName,
		      id: snapShotUser.id,
		      photoURL:snapShotUser.data().photoURL
		      
		    })
		  })
		} catch (error) {
			console.log('error adding user to array', error.message);
		}
	}

	return userRef;
};

export const createNewConnection = async (connectionName, connectionImg, invitedfriends, currentUser) => {
	const connectionRef = firestore.collection(`connections`);
	const createdAt = new Date();
	const userIDs = {};
	const usersDataReady = {};
	let connectionId = '';

	invitedfriends.map((item) => {
		userIDs[item.id] = [];
		usersDataReady[item.id] = {
			displayName: item.displayName,
			photoURL: item.photoURL,
			status: false
		};
		return usersDataReady;
	});

	try {
		await connectionRef
			.add({
				createdAt,
				connectionName,
				connectionImg,
				users: usersDataReady
			})
			.then(function(docRef) {
				connectionId = docRef.id;
				docRef.collection('userData').doc('spendings').set({
					...userIDs
				});
				docRef.collection('userData').doc('calendar').set({
					...userIDs
				});
				docRef.collection('userData').doc('list').set({
					...userIDs
				});
			});
	} catch (error) {
		alert('error creating connection', error.message);
	}

	invitedfriends.map(async (item) => {
		const userRef = firestore.doc(`users/${item.id}`);
		if (item.id !== currentUser.id) {
			try {
				await userRef.update({
					notifications: firebase.firestore.FieldValue.arrayUnion({
						displayName: currentUser.displayName,
						connectionId,
						createdAt,
						connectionName,
						connectionImg
					})
				});
			} catch (error) {
				alert('error sending notification', error.message);
			}
		}
	});

	const userRef = firestore.doc(`users/${currentUser.id}`);
	try {
		await userRef.update({
			connections: firebase.firestore.FieldValue.arrayUnion({
				connectionId,
				createdAt,
				connectionName,
				connectionImg
			})
		});
	} catch (error) {
		alert('error sending notification', error.message);
	}

	return connectionRef;
};

export const acceptInvitation = async (connection, currentUserId) => {
	const userRef = firestore.doc(`users/${currentUserId}`);
	try {
		await userRef.update({
			connections: firebase.firestore.FieldValue.arrayUnion({
				...connection
			})
		});
	} catch (error) {
		alert('error sending notification', error.message);
	}
	try {
		await userRef.update({
			notifications: firebase.firestore.FieldValue.arrayRemove({
				...connection
			})
		});
	} catch (error) {
		alert('error sending notification', error.message);
	}
};

export const pullConnection = async (connectionID, setConnection) => {
	const connections = firestore.doc(`connections/${connectionID}`);
	const subConnections = firestore.collection(`connections/${connectionID}/userData/`);
	connections.get().then((doc) => {
		subConnections.onSnapshot((querySnapshot) => {
			setConnection({
				id: doc.id,
				...doc.data(),
				userData: querySnapshot.docs.reduce((obj, doc2) => {
					return {
						...obj,
						[doc2.id]: doc2.data()
					};
				}, {})
			});
		});
	});
};

export const changeUsers = async (connectionID, setConnection) => {
	const users = firestore.collection(`users`);
  const userSearch = firestore.doc('searchusers/F6HYw5Nwerc3tnwSf3aI');
	users.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
      userSearch.update({
        [doc.id]: {
          displayName: doc.data().displayName,
          photoURL:doc.data().photoURL
        }
      })
      console.log(doc.id, " => ", doc.data());
    });
});
};
////////////// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authFB = firebase.auth();
export const firestore = firebase.firestore();
export const storageFB = firebase.storage();

const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => authFB.signInWithPopup(providerGoogle);

const providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.setCustomParameters({ prompt: 'select_account' });
export const signInWithFacebook = () => authFB.signInWithPopup(providerFacebook);

export default firebase;
