import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

let app;
auth.onAuthStateChanged(() => {
  if(!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .mount("#app");
  }
});
