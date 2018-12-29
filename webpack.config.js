const path = require("path")

module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|build)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-transform-react-jsx",
              "@babel/plugin-proposal-object-rest-spread"
            ]
          }
        }
      }
    ]
  },
  externals: {
    "react": "commonjs react"
  }
}
