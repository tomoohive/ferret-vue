<template lang="pug">
div.image-upload-area
  h3 あなたの服装
  div.image-area 
    label.image-area_label(v-if="!imageData")
      p(v-if="!imageData") 写真をアップロード
      input(type="file" ref="file" accept="image/*" @change="onFileChange($event)")
    img(:src="imageData" v-if="imageData")
  div.basicBox(@click="resetFile()") RESET
    svg(width="130" height="35" viewBox="0 0 130 65" xmlns="http://www.w3.org/2000/svg")
      rect(x='0' y='0' fill='none' width='130' height='65')
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ImageUpload",
  methods: {
    onFileChange(e) {
      const files = e.target.files;
      if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = e => {
          this.$store.dispatch("evaluation/onImageChanged", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    resetFile() {
      // const input = this.$refs.file;
      // input.type = "text";
      // input.type = "file";
      this.$store.dispatch("evaluation/onImageChanged", "");
    }
  },
  computed: mapGetters("evaluation", {
    imageData: "image"
  })
};
</script>

<style lang="scss" scoped>
.image-upload-area {
  margin: 10% 0px;
}

.image-area_label {
  overflow: hidden;
}
.image-area_label::before {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  content: "";
  width: 170%;
  height: 120%;
  background: #333;
  transform-origin: right top;
  transform: skewX(-30deg) scale(0, 1);
  transition: transform 0.5s;
}
.image-area_label:hover::before {
  transform-origin: left top;
  transform: skewX(-30deg) scale(1, 1);
}
.image-area_label:hover {
  p {
    color: white;
  }
}

label > input {
  display: none;
}

label::after {
  height: 300px;
  width: 300px;
}

.image-area {
  background-color: #eee;
  height: 300px;
  width: 300px;
  margin: auto;
  position: relative;
  label {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
  }
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 200px;
  }
}

img {
  max-height: 300px;
}

.basicBox,
.swiggleBox,
.checkBox {
  width: 130px;
  height: 35px;
  margin: 15px auto;
  color: #000;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  line-height: 35px;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  cursor: pointer;
}

svg {
  position: absolute;
  top: 0;
  left: 0;
}
svg rect,
svg path,
svg polyline {
  fill: none;
  stroke: #000;
  stroke-width: 5;
}

.basicBox:hover svg rect {
  stroke: #000;
}

/* Basic Box */
svg rect {
  stroke-dasharray: 400, 0;
  -webkit-transition: all 0.8s ease-in-out;
  -moz-transition: all 0.8s ease-in-out;
  -ms-transition: all 0.8s ease-in-out;
  -o-transition: all 0.8s ease-in-out;
}
.basicBox:hover svg rect {
  stroke-width: 5;
  stroke-dasharray: 35, 245;
  stroke-dashoffset: 38;
  -webkit-transition: all 0.8s ease-in-out;
  -moz-transition: all 0.8s ease-in-out;
  -ms-transition: all 0.8s ease-in-out;
  -o-transition: all 0.8s ease-in-out;
}

/* Swiggle Box */
svg path {
  stroke-dasharray: 265, 0;
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -ms-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
}
.swiggleBox:hover svg path {
  stroke-width: 3;
  stroke-dasharray: 0, 350;
  stroke-dashoffset: 20;
  -webkit-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -ms-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
}

/* Check Box */
.checkBox {
  /* Add Padding Left To Center Text */
}
.checkBox svg {
  /* Presentation Purposes */
  margin-left: -10px;
}
.checkBox svg rect,
.checkBox svg polyline {
  fill: none;
  stroke: #4274d3;
  stroke-width: 1;
  -webkit-transition: all 0.8s ease-in-out;
  -moz-transition: all 0.8s ease-in-out;
  -ms-transition: all 0.8s ease-in-out;
  -o-transition: all 0.8s ease-in-out;
}
.checkBox:hover svg rect {
  stroke-width: 2;
  -webkit-transition: all 0.8s ease-in-out;
  -moz-transition: all 0.8s ease-in-out;
  -ms-transition: all 0.8s ease-in-out;
  -o-transition: all 0.8s ease-in-out;
}
.checkBox:hover svg polyline {
  stroke-width: 2;
  -webkit-transition: all 0.8s ease-in-out;
  -moz-transition: all 0.8s ease-in-out;
  -ms-transition: all 0.8s ease-in-out;
  -o-transition: all 0.8s ease-in-out;
}
.checkBox svg .button {
  stroke-dasharray: 400px, 0;
}
.checkBox:hover svg .button {
  stroke-dasharray: 0, 400px;
  stroke-dashoffset: 33px;
}
/* Check Mark Effect */
.box,
.checkMark {
  opacity: 0;
}
.checkBox:hover .box {
  -webkit-animation: boxDisplay 0.2s forwards;
  -moz-animation: boxDisplay 0.2s forwards;
  -ms-animation: boxDisplay 0.2s forwards;
  -o-animation: boxDisplay 0.2s forwards;
  animation: boxDisplay 0.2s forwards;
  -webkit-animation-delay: 0.65s;
  -moz-animation-delay: 0.65s;
  -ms-animation-delay: 0.65s;
  -o-animation-delay: 0.65s;
  animation-delay: 0.65s;
}
.checkBox:hover .checkMark {
  -webkit-animation: checkDisplay 0.2s forwards;
  -moz-animation: checkDisplay 0.2s forwards;
  -ms-animation: checkDisplay 0.2s forwards;
  -o-animation: checkDisplay 0.2s forwards;
  animation: checkDisplay 0.2s forwards;
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  -ms-animation-delay: 1s;
  -o-animation-delay: 1s;
  animation-delay: 1s;
}
/* Check Box Display */
@-webkit-keyframes boxDisplay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes boxDisplay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-ms-keyframes boxDisplay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes boxDisplay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes boxDisplay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
/* Check Mark Display */
@-webkit-keyframes checkDisplay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes checkDisplay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-ms-keyframes checkDisplay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes checkDisplay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes checkDisplay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
