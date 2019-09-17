import firebase from "../utils/firebase/firebase";

export const login = {
    state: {
        token: null
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        login(state, payload) {
            console.log(payload)
            return {
                ...state,
                token: payload
            }
        },
        logout(state, payload) {
            return {
                ...state,
                token:null
            }
        }
    },
    effects: (dispatch) => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async asyncLogin(payload, rootState) {
            console.log(payload)
            await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(res=>{

                    firebase.auth().currentUser.getIdToken().then(data => {
                        localStorage.setItem("token", data)
                        dispatch.login.login(data)
                    })

                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error)
                    // ...
                });


        },
        async asyncLogout (payload, rootState) {

            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                dispatch.login.logout();
                localStorage.removeItem('token');
            }).catch(function(error) {
                // An error happened.
                console.log(error);
            });
        }
    })
}