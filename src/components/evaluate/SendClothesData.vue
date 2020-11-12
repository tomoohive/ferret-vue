<template lang="pug">
a.button(@click="this.sendClothesData2API()") 判定する
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SendClothesData",
  data() {
    return {
      send_words: []
    };
  },
  methods: {
    ...mapActions("evaluation", ["sendClothesData2API"])
  },
  computed: mapState("evaluation", {
    clothesList: "clothesList",
    evaluatedClothes: "evaluatedClothes"
  })
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  width: 150px;
  height: 54px;
  text-align: center;
  text-decoration: none;
  line-height: 54px;
  outline: none;
  font-weight: bold;
}
.button::before,
.button::after {
  position: absolute;
  z-index: -1;
  display: block;
  content: "";
}
.button,
.button::before,
.button::after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.button {
  position: relative;
  z-index: 2;
  border: 2px solid #333;
  color: #fff;
  line-height: 50px;
  -webkit-perspective: 300px;
  perspective: 300px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.button:hover {
  color: #333;
}
.button::after {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #333;
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
  -webkit-transform: rotateX(0);
  transform: rotateX(0);
}
.button:hover::after {
  -webkit-transform: rotateX(-180deg);
  transform: rotateX(-180deg);
}
</style>
