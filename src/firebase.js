import firebase from "@firebase/app";
import "@firebase/auth";
import router from "./router";
import store from "./store";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_KEY,
  authDomain: process.env.VUE_APP_FB_DOMEIN,
  databaseURL: process.env.VUE_APP_FB_IO,
  projectId: process.env.VUE_APP_FB_PROD_ID,
  storageBucket: process.env.VUE_APP_FB_BUCKET_ID,
  messagingSenderId: process.env.VUE_APP_FB_SENDER_ID,
  appId: process.env.VUE_APP_FB_ID
};

export default {
  // initialize firebase settings
  init() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },

  // login using email & password
  // return JWT token by result of firebase authentication, save JWT for local storage
  signInWithEmailAndPassword(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        res => {
          res.user.getIdToken().then(idToken => {
            localStorage.setItem("jwt", idToken);
            router.push("/").catch(err => {
              console.log(err);
              console.log("router push /");
            });
          });
        },
        err => {
          console.log(err.message);
        }
      );
  },

  // making account using email & password
  // After making account, routing for '/signin'
  singUpWithEmailAndPassword(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        router.push("/");
      })
      .catch(err => {
        console.log(err.message);
      });
  },

  //logout
  // After logout, delete saved jwt and update the state of mutation in vuex
  logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("jwt");
        store.commit("firebase/onAuthEmailChanged", "");
        store.commit("firebase/onUserStatusChanged", false);
      })
      .catch(err => {
        console.log(`fail logout (${err}`);
      });
  },

  // Authentication Management
  // Update user state and jwt state
  onAuth() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.ma) {
          localStorage.setItem("jwt", user.ma);
        }
        store.commit("firebase/onAuthEmailChanged", user.email);
        if (user.uid) {
          store.commit("firebase/onUserStatusChanged", true);
        } else {
          store.commit("firebase/onUserStatusChanged", false);
        }
      } else {
        store.commit("firebase/onAuthEmailChanged", "");
        store.commit("firebase/onUserStatusChanged", false);
      }
    });
  }
};
