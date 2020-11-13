module.exports = {
  devServer: {
    proxy: {
      "/calc/": {
        target: "https://fashion-6z2jvt47ya-uc.a.run.app/"
      },
      "/calccolorful/": {
        target: "https://colorfulcalc-ntym3e3kka-de.a.run.app/"
      }
    }
  }
};
