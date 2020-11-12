import { createStore } from "vuex";
import firebase from "./modules/firebase";
import evaluation from "./modules/evaluation";

export default new createStore({
  modules: {
    firebase,
    evaluation
  },
  strict: false
});
