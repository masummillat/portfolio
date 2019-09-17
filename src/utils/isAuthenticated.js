import firebase from './firebase/firebase';

 function isAuthenticated() {
     firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
             // User is signed in.
             var displayName = user.displayName;
             var email = user.email;
             var emailVerified = user.emailVerified;
             var photoURL = user.photoURL;
             var isAnonymous = user.isAnonymous;
             var uid = user.uid;
             var providerData = user.providerData;
           return true
             // ...
         } else {
             // User is signed out.
             // ...
             console.log('lsfjlsajdflksdajflkjlks')
             return false

         }
     });

     return true

}


// var authCheck = ()=> new Promise(function(resolve, reject) {
//     );
//     // reject('could not manage request')
// });
export default isAuthenticated;