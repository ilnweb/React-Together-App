const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

const setUserInArray = (user => {
  return admin.firestore().doc('searchusers/F6HYw5Nwerc3tnwSf3aI').update({
    users: firebase.firestore.FieldValue.arrayUnion({
      ...user
    })
  })
})


exports.userCreated = functions.firestore.document('users/{userId}').onCreate(doc => {
    const userData = doc.data();
    const user = {
      displayName:userData.displayName,
      id:userData.id,
      photoURL:userData.photoURL
    }
    return setUserInArray(user);
});
