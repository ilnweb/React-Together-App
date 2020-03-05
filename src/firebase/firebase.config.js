import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
    const createdAt = new Date();
    const spendings = [];

		try {
			await userRef.set({
				displayName,
				email,
        createdAt,
        spendings,
				...additionalData
			});
		} catch (error) {
			alert('error creating user', error.message);
		}
	}

	return userRef;
};

////////////// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authFB = firebase.auth();
export const firestore = firebase.firestore();

const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => authFB.signInWithPopup(providerGoogle);

const providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.setCustomParameters({ prompt: 'select_account' });
export const signInWithFacebook = () => authFB.signInWithPopup(providerFacebook);

export default firebase;
