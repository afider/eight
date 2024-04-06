module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "last 2 versions", // https://github.com/browserslist/browserslist#packagejson
        "> 1%",
        "not dead"
      ]
    }
  }
}