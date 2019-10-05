module.exports = {
	mode: 'none',
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  watch: false,
  devtool: '#sourcemap',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['@babel/react', '@babel/env']
        }
      }
    ]
  }
};