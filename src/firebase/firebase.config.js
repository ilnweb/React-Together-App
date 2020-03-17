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
	const snapShot = await userRef.get();
	const userRefArray = firestore.doc(`searchusers/F6HYw5Nwerc3tnwSf3aI`);

	if (!snapShot.exists) {
		const createdAt = new Date();
    const { displayName, email, photoURL } = userAuth;
		try {
			await userRef.set({
				displayName,
				email,
				photoURL,
				createdAt,
				spendings: [],
        connections: [],
        notifications:[],
				...additionalData
			});
		} catch (error) {
			alert('error creating user', error.message);
		}

		try {
			await userRefArray.update({
        users: firebase.firestore.FieldValue.arrayUnion({
          id: userAuth.uid,
          photoURL,
          displayName,
          ...additionalData,
         
				})
			});
		} catch (error) {
			console.log('error creating user array', error.message);
		}
	}

	return userRef;
};

////////////// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authFB = firebase.auth();
export const firestore = firebase.firestore();
export const storageFB = firebase.storage()

const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => authFB.signInWithPopup(providerGoogle);

const providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.setCustomParameters({ prompt: 'select_account' });
export const signInWithFacebook = () => authFB.signInWithPopup(providerFacebook);

export default firebase;
