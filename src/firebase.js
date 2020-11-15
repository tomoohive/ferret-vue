import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/storage";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuor8B91s4NgpcccmsSJOXU_DNpp_Fy5Q",
  authDomain: "tohackmeapp.firebaseapp.com",
  databaseURL: "https://tohackmeapp.firebaseio.com",
  projectId: "tohackmeapp",
  storageBucket: "tohackmeapp.appspot.com",
  messagingSenderId: "527927050667",
  appId: "1:527927050667:web:d55f79996a79f5139892ee"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const userCollection = db.collection('user')
const clothesCollection = db.collection('clothes')

export {
  db,
  auth,
  userCollection,
  clothesCollection
  // initialize firebase settings
  // init() {
  //   firebase.initializeApp(firebaseConfig);
  //   // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  // },

  // // login using email & password
  // // return JWT token by result of firebase authentication, save JWT for local storage
  // signInWithEmailAndPassword(email, password) {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(
  //       res => {
  //         res.user.getIdToken().then(idToken => {
  //           localStorage.setItem("jwt", idToken);
  //           router.push("/home").catch(err => {
  //             console.log(err);
  //             console.log("router push /home");
  //           });
  //         });
  //       },
  //       err => {
  //         console.log(err.message);
  //       }
  //     );
  // },

  // // making account using email & password
  // // After making account, routing for '/signin'
  // signUpWithEmailAndPassword(email, password) {
  //   console.log('SighUp')
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(res => {
  //       alert("Success");
  //       console.log(res);
  //       // store.commit("firebase/onAuthUserDocChanged", res.uid);
  //       // router.push("/initialize");
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
  // },

  // //logout
  // // After logout, delete saved jwt and update the state of mutation in vuex
  // logOut() {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       localStorage.removeItem("jwt");
  //       store.commit("firebase/onAuthEmailChanged", "");
  //       store.commit("firebase/onUserStatusChanged", false);
  //     })
  //     .catch(err => {
  //       console.log(`fail logout (${err}`);
  //     });
  // },

  // // Authentication Management
  // // Update user state and jwt state
  // onAuth() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       if (user.ma) {
  //         localStorage.setItem("jwt", user.ma);
  //       }
  //       store.commit("firebase/onAuthEmailChanged", user.email);
  //       if (user.uid) {
  //         store.commit("firebase/onUserStatusChanged", true);
  //       } else {
  //         store.commit("firebase/onUserStatusChanged", false);
  //       }
  //     } else {
  //       store.commit("firebase/onAuthEmailChanged", "");
  //       store.commit("firebase/onUserStatusChanged", false);
  //     }
  //   });
  // }
};
