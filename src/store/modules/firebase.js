import router from "../../router";
import * as fb from "../../firebase";

const state = {
  name: "",
  email: "",
  user_doc: null,
  status: false,
  userProfile: {}
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

const actions = {
  async logIn({ dispatch }, form) {
    const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
    
    console.log("login")
    dispatch('fetchUserProfile', user);
  },
  async fetchUserProfie({ commit }, user) {
    const userProfile = await fb.userCollection.doc(user.uid).get();

    commit('setUserProfile', userProfile.data());

    router.push('/home');
  },
  async signUp({ state }, form) {
    const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

    state.user_doc = user
    console.log("signup")
    await fb.userCollection.doc(user.uid).set({
      email: form.email
    });

    router.push('/initialize');
  },
  async initializeAccount({ dispatch, state }, form) {
    await fb.userCollection.doc(state.user.uid).set({
      age: form.age,
      name: form.username,
      description: form.description,
      email: state.email,
      height: form.height,
      weight: form.weight,
      sex: form.sex,
      posts: 0,
      icon: form.image_url,
      created_at: new Date(),
      updated_at: new Date()
    });

    dispatch('fetchUserProfile', state.user);
  }
};

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
  setUserProfile(state, val) {
    state.userProfile = val;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
