<template lang="pug">
form
  h1 Account Settings
  div.image-area 
    label.image-area_label(v-if="!imageFace")
      p(v-if="!imageFace") 顔写真をアップロード
      input(type="file" ref="file" accept="image/*" @change="onFileChange($event)")
    img(:src="imageFace" v-if="imageFace")
  div.basicBox(@click="resetFile()") RESET
    svg(width="130" height="35" viewBox="0 0 130 65" xmlns="http://www.w3.org/2000/svg")
      rect(x='0' y='0' fill='none' width='130' height='65')
  //- div
  //-   label.photo_button +顔写真をアップロード
  //-     input(type="file" name="icon" accept=".png, .jpg, .jpeg" style="display: none;" required)
  span.input
  input(type="text" v-model="username" name="username" placeholder="Username" required)
  span.input
  input(type="number" v-model="age" name="age" placeholder="Age" required)
  span.input
  input(type="number" v-model="height" name="height" placeholder="Height" required)
  span.input
  input(type="number" v-model="weight" name="weight" placeholder="Weight" required)
  span.input
  label(for="sex") 性別:
  select(name="sex" v-model="sex")
    option(value="M") 男性
    option(value="F") 女性
    option(value="O") その他
  p
  span
  textarea(name="description" v-model="description" placeholder="Description" rows="5" cols="40")
  button(type="submit" value="Sign Up" title="Submit form" @click="registerAccount")
    div(style="padding-right: 30px")
      span(style="color: #111;") → 
      span Register Account
</template>

<script>
import { mapGetters } from "vuex";
import Firebase from "../firebase";

export default {
  name: "InitialAccount",
  data() {
    return {
      imageFace: "",
      username: "",
      age: "",
      height: "",
      weight: "",
      sex: "M",
      description: "",
      image_url: "",
      fileLoading: ""
    };
  },
  compputed: {
    ...mapGetters("firebase", {
      email: "email",
      user_doc: "user_doc"
    })
  },
  methods: {
    uploadImageFile(file) {
      const storageRef = Firebase.storage().ref("/posts");
      const uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.fileLoading = percentage;
        },
        err => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.fileLoading = 0;
            this.image_url = downloadURL;
          });
        }
      );
    },
    registerAccount() {
      this.uploadImageFile(this.imageFace);
      const account = {
        age: this.age,
        username: this.username,
        description: this.description,
        height: this.height,
        weight: this.weight,
        sex: this.sex,
        image_url: this.image_url
      };
      this.$store.dispatch('firebase/initializeAccount', account);
    },
    onFileChange(e) {
      const files = e.target.files;
      if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = e => {
          this.imageFace = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    resetFile() {
      this.imageFace = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

[class*="icon-"] {
  font-family: "form";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// mixin for animations
@mixin animation {
  -webkit-transition: color 0.2s;
  -moz-transition: color 0.2s;
  -o-transition: color 0.2s;
  transition: color 0.2s;
}

// mixin for placeholders
@mixin placeholder {
  color: #999;
  @include animation;
}

// font declarations
body,
input {
  font-family: "Avenir Next", Avenir, "Segoe UI", Roboto, "Helvetica Neue",
    sans-serif;
}

body {
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  background: #fff;
  color: #111;
}

a {
  color: #e74c3c;
  text-decoration: none;
  @include animation;
}

a:hover {
  text-decoration: underline;
  color: #111;
}

// positions the form and adds subtle animation
form {
  margin: 12% auto;
  width: 19em;
  text-align: center;
  position: relative;
  -webkit-animation: moveDown 0.3s;
  -moz-animation: moveDown 0.3s;
  animation: moveDown 0.3s;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

// animates to come down
@-webkit-keyframes moveDown {
  0% {
    -webkit-transform: translate(0, -10%);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate(0, 0);
    opacity: 1;
  }
}

@-moz-keyframes moveDown {
  0% {
    -moz-transform: translate(0, -10%);
    opacity: 0;
  }
  100% {
    -moz-transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes moveDown {
  0% {
    transform: translate(0, -10%);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

// removes default autocomplete yellow bg
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}

// styles the input field. Strip from default styling and add borders
input {
  color: #444;
  font-size: 1.5em;
  outline: none; // Chrome outline
  box-shadow: none; // Firefox outline
  -webkit-appearance: none; // mobile Safari
  border-radius: 0; // mobile Safari
  border-top: none;
  border-left: solid 1px;
  border-right: solid 1px;
  border-bottom: solid 1px;
  border-color: #bbb;
  background: transparent;
  display: block;
  height: 2em;
  width: 12em;
  margin-bottom: 5%;
  padding: 0 3%;
  position: relative;
  z-index: 0;
  -webkit-transition: border 0.25s; // slightly slower than placeholder colour
  -moz-transition: border 0.25s;
  -o-transition: border 0.25s;
  transition: border 0.25s;
}

textarea {
  color: #444;
  font-size: 1.5em;
  outline: none; // Chrome outline
  box-shadow: none; // Firefox outline
  -webkit-appearance: none; // mobile Safari
  border-radius: 0; // mobile Safari
  border-top: solid 1px;
  border-left: solid 1px;
  border-right: solid 1px;
  border-bottom: solid 1px;
  border-color: #bbb;
  background: transparent;
  display: block;
  height: 6em;
  width: 15em;
  margin-bottom: 5%;
  padding: 0 3%;
  position: relative;
  z-index: 0;
  -webkit-transition: border 0.25s; // slightly slower than placeholder colour
  -moz-transition: border 0.25s;
  -o-transition: border 0.25s;
  transition: border 0.25s;
}

// on focus change styling of borders
input:focus,
textarea:focus {
  color: #111;
  border-color: #444;
}

// width of user typed input must not go over submit button on the right (adds padding)
#password {
  width: 10.5em;
  padding-right: 1.85em;
}

// left rectangle that hides left border line
.input,
#passwordMeter {
  speak: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: block;
  position: relative;
  width: 0.25em;
  height: 3em;
  background: #fff;
  margin: 0% 0 -2em;
  z-index: 1;
}

// right rectangle that hides right border line
.input:after,
#passwordMeter:after {
  content: "";
  width: 1em;
  height: 100%;
  position: absolute;
  right: -19.5em; // eyeball the number
  background: #fff;
}

// styles placeholder colour
.placeholder {
  @include placeholder;
}

::-webkit-input-placeholder {
  @include placeholder;
}

:-moz-placeholder {
  @include placeholder;
}

:-ms-input-placeholder {
  @include placeholder;
}

// on focus change colour of placeholder
.placeholder:focus {
  color: #ddd;
}

input:focus::-webkit-input-placeholder {
  color: #ddd;
}

input:focus::-moz-input-placeholder {
  color: #ddd;
}

input:focus::-ms-input-placeholder {
  color: #ddd;
}

// error fields for Safari and other unsupportive browsers
.error {
  border-color: #e35f5f;
  color: #e35f5f;
}

// moves down because of the errors
.error + button {
  margin-bottom: 2em;
}

// right rectangle that hides right border line
#passwordMeter:before {
  content: "";
  height: 1px;
  position: absolute;
  // bottom: -1.1em; // eyeball the number
  bottom: -17px; // eyeball the number
  left: 0;
  -webkit-transition: width 0.3s;
  -moz-transition: width 0.3s;
  -o-transition: width 0.3s;
  transition: width 0.3s;
}

// on blur reduce width of passwordMeter
#passwordMeter.blur:before {
  width: 0 !important;
}

// red colour
.weak:focus {
  border-left-color: #e35f5f;
}

#passwordMeter.weak:before {
  background: #e35f5f;
  width: 3.8em;
}

.good:focus {
  border-left-color: #87e696;
}

#passwordMeter.good:before {
  background: #87e696;
  width: 7.6em;
}

.better:focus {
  border-left-color: #55d969;
}

#passwordMeter.better:before {
  background: #55d969;
  width: 11.4em;
}

.strong:focus {
  border-left-color: #3ec753;
}

#passwordMeter.strong:before {
  background: #3ec753;
  width: 15.2em;
}

.military:focus {
  border-color: #10ad27;
}

#passwordMeter.military:before {
  background: #10ad27;
  width: 19em;
}

// positions submit button and strips from default styling
button {
  outline: none;
  -webkit-appearance: none; // mobile Safari
  border: none;
  background: transparent;
  color: #bbb;
  font-size: 1.8em;
  cursor: pointer;
  @include animation;
}

select {
  outline: none;
  -webkit-appearance: none; // mobile Safari
  border: none;
  background: transparent;
  color: #bbb;
  font-size: 1.8em;
  cursor: pointer;
  @include animation;
}

label {
  font-size: 1.5em;
}

// on submit hover changes the colour
button:hover,
button:focus {
  color: #111;
}

.photo_button {
  color: white;
  background-color: #111;
  padding: 6px;
  border-radius: 20px;
}

div {
  margin: auto 0;
  max-width: 32em;
  -webkit-animation: moveDown 0.3s;
  -moz-animation: moveDown 0.3s;
  animation: moveDown 0.3s;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

p {
  margin-bottom: 0.8em;
}

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
  height: 100px;
  width: 100px;
  margin: auto;
  position: relative;
  label {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
  }
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100px;
    font-size: 10px;
  }
}

img {
  max-height: 100px;
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
