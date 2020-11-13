import Firebase from "../../firebase";

const state = {
  name: "",
  email: "",
  user_doc: "",
  status: false
};

const getters = {
  name(state) {
    return state.naame;
  },
  email(state) {
    return state.email;
  },
  user_doc(state) {
    return state.user_doc;
  },
  isSignedIn(state) {
    return state.status;
  }
};

const actions = {};

const mutations = {
  onAuthNameChanged(state, name) {
    state.name = name;
  },
  onAuthEmailChanged(state, email) {
    // information of firebase user
    state.email = email;
  },
  onAuthUserDocChanged(state, user_doc) {
    // information of firebase user
    state.user_doc = user_doc;
  },
  onUserStatusChanged(state, status) {
    state.status = status;
  },
  initializeAccount(state, account) {
    const db = Firebase.firestore();
    db.collection("user")
      .doc(state.user_doc)
      .set({
        age: account.age,
        name: account.username,
        description: account.description,
        email: state.email,
        height: account.height,
        weight: account.weight,
        sex: account.sex,
        posts: 0,
        icon: account.image_url,
        created_at: new Date(),
        updated_at: new Date()
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
