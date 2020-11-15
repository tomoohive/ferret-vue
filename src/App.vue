<template lang="pug">
div#app
  .product_name Fit to You.
  router-view
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html:before,
html:after,
body:before,
body:after {
  content: "";
  background: #000000;
  position: fixed;
  display: block;
  z-index: 999;
}

/* 上 */
html:before {
  height: 10px;
  width: 100vw;
  left: 0;
  top: 0;
}

/* 右 */
html:after {
  width: 10px;
  height: 100vh;
  right: 0;
  top: 0;
}

/* 下 */
body:before {
  height: 10px;
  width: 100vw;
  bottom: 0;
  left: 0;
}

/* 左 */
body:after {
  width: 10px;
  height: 100vh;
  top: 0;
  left: 0;
}

.product_name {
  font-family: Helvetica;
  font-weight: bold;
  position: fixed;
  bottom: 2%;
  left: 2%;
  font-size: 50px;
  z-index: 999;
}
</style>
