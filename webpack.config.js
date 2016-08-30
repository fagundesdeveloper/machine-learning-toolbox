module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [
      {test: /\.js|\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
 
}
