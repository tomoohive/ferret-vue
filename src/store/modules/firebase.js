const state = {
  email: "",
  status: false
};

const getters = {
  email(state) {
    return state.email;
  },
  isSignedIn(state) {
    return state.status;
  }
};

const actions = {};

const mutations = {
  onAuthEmailChanged(state, email) {
    // information of firebase user
    state.email = email;
  },
  onUserStatusChanged(state, status) {
    state.status = status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
