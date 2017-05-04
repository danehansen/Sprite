module.exports = {
  entry: {
    app: './src/Sprite.js',
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
      },
    ],
  },
  output: {
    filename: 'danehansen-Sprite.min.js',
    library: ['danehansen', 'Sprite'],
    libraryTarget: 'umd',
    umdNamedDefine: false,
  },
  externals: [
    {
      '@danehansen/math': {
        amd: '@danehansen/math',
        commonjs: '@danehansen/math',
        commonjs2: '@danehansen/math',
        root: ['danehansen', 'math'],
      },
    },
    {
      '@danehansen/event-dispatcher': {
        amd: '@danehansen/event-dispatcher',
        commonjs: '@danehansen/event-dispatcher',
        commonjs2: '@danehansen/event-dispatcher',
        root: ['danehansen', 'EventDispatcher'],
      },
    },
    {
      'gsap/TweenLite': {
        amd: 'gsap/TweenLite',
        commonjs: 'gsap/TweenLite',
        commonjs2: 'gsap/TweenLite',
        root: ['TweenLite'],
      },
    },
  ],
}
