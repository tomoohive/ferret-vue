<template lang="pug">
form(:lazy-validation="lazy")
  h1 Sign Up
  span.input
  input(type="email" placeholder="Email address" v-model="email" required)
  span#passwordMeter
  input(type="password" id="password" placeholder="Password" title="Password min 8 characters. At least one UPPERCASE and one lowercase letter" required pattern="(?=^.{8,}$)(?=.*[a-z])(?!.*\s).*$" v-model="password")
  button(value="Sign Up" title="Submit form" @click="signUp")
    div(style="padding-right: 30px")
      span(style="color: #111;") → 
      span Sign Up
</template>

<script>
import { mapGetters } from "vuex";
import Firebase from "../firebase";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      lazy: false
    };
  },
  computed: {
    ...mapGetters({
      isSignedIn: "firebase/isSignedIn"
    }),
    userStatus() {
      return this.isSignedIn;
    }
  },
  methods: {
    signUp() {
      Firebase.signUpWithEmailAndPassword(this.email, this.password);
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

// on focus change styling of borders
input:focus {
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

// on submit hover changes the colour
button:hover,
button:focus {
  color: #111;
}

div {
  margin: 15% auto 0;
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
</style>
