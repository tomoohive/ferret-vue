module.exports = {
  devServer: {
    proxy: {
      "/calc/": {
        target: "https://fashion-param.herokuapp.com/"
      },
      "/calccolorful/": {
        target: "https://hack-aichi-colorful.herokuapp.com/"
      }
    }
  }
};
