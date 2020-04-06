import firebase from 'firebase/app';
import { firestore, authFB } from '../../firebase/firebase.config';

export const removeConnectionItem = (cartItems, itemToRemove, connectionID) => {
  const collectionSet = firestore.doc(`connections/${connectionID}/userData/spendings`);
  collectionSet.update({
    [authFB.currentUser.uid]: firebase.firestore.FieldValue.arrayRemove({
      ...itemToRemove
    })
  });
 
	return cartItems.filter((item) => item.id !== itemToRemove.id);
};
