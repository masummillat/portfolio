import firebase from "../utils/firebase/firebase";

export const login = {
    state: {
        token: null
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        login(state, payload) {
            return {
                ...state,
                token: payload
            }
        }
    },
    effects: (dispatch) => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async asyncLogin(payload, rootState) {
            console.log(payload)
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(res=>{
                    console.log(res)
                    dispatch.count.increment(res)
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });

        }
    })
}