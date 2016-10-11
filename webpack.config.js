module.exports = {
  entry: './src/main.js',
  output: {
    libraryTarget: 'var',
    library: 'App',
    path: './dist',
    filename: 'bundle.js'
  },
  'babel': {
    'presets': [
      'es2015'
    ]
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }

}
