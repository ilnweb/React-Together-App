import firebase from 'firebase/app';
import { firestore, authFB } from '../../firebase/firebase.config';

export const removeItem = (cartItems, itemToRemove) => {
	const collectionSet = firestore.doc(`users/${authFB.currentUser.uid}`);
	collectionSet.update({
		spendings: firebase.firestore.FieldValue.arrayRemove({
			...itemToRemove
		})
	});

	return cartItems.filter((item) => item.id !== itemToRemove.id);
};
