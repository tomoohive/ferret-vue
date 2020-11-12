import axios from "axios";

import calculateValue from "./evaluation/calculateValue.js";

const state = {
  image: "",
  clothesList: [],
  evaluatedClothes: {
    seasonal_sense: 0,
    formality: 0,
    trend: 0,
    value: 0,
    colorfulness: 0
  }
};

const getters = {
  image(state) {
    return state.image;
  },
  clothesList(state) {
    return state.clothesList;
  },
  evaluatedClothes(state) {
    return state.evaluatedClothes;
  }
};

const actions = {
  onImageChanged({ commit }, image) {
    commit("onImageChanged", image);
  },
  onClothesListChanged({ commit }, clothesList) {
    commit("onClothesListChanged", clothesList);
  },
  onEvaluatedClothesChanged({ commit }, evaluatedClothes) {
    commit("onEvaluatedClothes", evaluatedClothes);
  },
  addCloth({ commit }) {
    commit("addCloth");
  },
  deleteCloth({ commit }, id) {
    commit("deleteCloth", id);
  },
  async sendClothesData2API({ commit, state }) {
    const send_words = [];
    var sum_value = 0;
    state.clothesList.map(cloth => {
      send_words.push(cloth.item_name);
      send_words.push(cloth.item_type);
      sum_value += Number(cloth.value);
    });
    console.log(state.clothesList);
    const response1 = await axios
      .post("/calc/", {
        words: send_words
      })
      .then(res => res.data)
      .catch(err => console.log(err));
    const response2 = await axios
      .post("/calccolorful/", {
        image_path: state.image
      })
      .then(res => res.data)
      .catch(err => console.log(err));

    const clothesList = {
      seasonal_sense: response1.season[3],
      formality: response1.formal[0],
      trend: response1.trend[0],
      value: calculateValue(sum_value),
      colorfulness: response2.values
    };
    commit("onEvaluatedClothesChanged", clothesList);
    console.log(state.evaluatedClothes);
  }
};

const mutations = {
  onImageChanged(state, image) {
    state.image = image;
  },
  onClothesListChanged(state, clothesList) {
    state.clothesList = clothesList;
  },
  onEvaluatedClothesChanged(state, evaluatedClothes) {
    state.evaluatedClothes = evaluatedClothes;
  },
  addCloth(state) {
    state.clothesList.push({
      item_name: "",
      item_type: "",
      value: 0
    });
  },
  deleteCloth(state, id) {
    state.clothesList.splice(id, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
