<template lang="pug">
div.select_mode
  router-link(to="/signup") Sign Up
  span  / 
  router-link(to="/") Log In
div.account_form
 router-view
</template>

<script>
import SignUp from "@/components/SignUp.vue";
import LogIn from "@/components/LogIn.vue";

export default {
  name: "Account",
  components: {
    SignUp,
    LogIn
  }
};
</script>

<style lang="scss" scoped>
.account_form {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.select_mode {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  a:link,
  a:visited,
  a:hover,
  a:active {
    color: #111;
    font-weight: bold;
  }
}
</style>
