import firebase from "../utils/firebase/firebase";

export const auth = {
    state: {
        token: null,
        user:null
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        login(state, payload) {
            return {
                ...state,
                token: payload
            }
        },
        logout(state, payload) {
            return {
                ...state,
                token:null,
                user:null
            }
        },
        storeUserData(state, payload) {
          return{
            ...state,
            user:payload
          }
        }
    },
    effects: (dispatch) => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async asyncLogin(payload, rootState) {
           return  await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(res=>{
                  var user = firebase.auth().currentUser;
                    user.getIdToken().then(data => {
                      localStorage.setItem("token", data)
                      dispatch.auth.login(data)
                    });
                  if (user != null) {
                    user.providerData.forEach(function (profile) {
                      dispatch.auth.storeUserData(profile)
                    });
                  }

                    return res;

                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error)
                    // ...
                    return Promise.reject(error);
                });


        },
        async asyncLogout (payload, rootState) {

           return await firebase.auth().signOut().then(function(res) {
                // Sign-out successful.
                dispatch.auth.logout();
                localStorage.removeItem('token');
                return res;
            }).catch(function(error) {
                // An error happened.
                console.log(error);
                return Promise.reject(error)
            });
        },
      async asyncSignup (payload, rootState) {

        return await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(res=>{
            console.log(res)
          })
          .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      },
      async asyncUpdateProfile (payload, rootState){
          console.log(new File(payload.photo))
        var user = firebase.auth().currentUser;
          console.log(user)

        // firebase.storage().ref(`/${user.uid}/${payload.photo.name}`)
        //   .put(payload.photo)
        //   .then(snapshot=>{
        //     // firebase.database().ref('users/' + user.uid).set({
        //     //   username: payload.displayName,
        //     //   email: user.displayName,
        //     //   profile_picture : snapshot.
        //     // });
        //     console.log(snapshot)
        //   })

        // storageRef
        //update profile info

        // user.updateProfile({
        //   displayName: payload.displayName,
        //   photoURL: "https://example.com/jane-q-user/profile.jpg"
        // }).then(function(res) {
        //   // Update successful.
        //   console.log(res)
        // }).catch(function(error) {
        //   // An error happened.
        //   console.log(error)
        // });
      },
      async getUserData ( rootState) {
        firebase.auth().onAuthStateChanged((res)=>{
          res.getIdToken().then((token)=>{
              // localStorage.setItem("token", token)
              dispatch.auth.login(token)
          })
          res.providerData.forEach(function (profile) {
            dispatch.auth.storeUserData(profile)

          });
        });


      }
    })
}