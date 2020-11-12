import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import Firebase from "./firebase";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Firebase.init();

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    if (user.ma) {
      localStorage.setItem("jwt", user.ma);
    }
    store.commit("firebase/onAuthEmailChanged", user.email);
    if (user.uid) {
      store.commit("firebase/onUserStatesChanged", true);
    } else {
      store.commit("firebase/onUserStatusChanged", false);
    }
  } else {
    store.commit("firebase/onAuthEmailChanged", "");
  }

  createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
});
