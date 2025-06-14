module.exports = {
  entry: './main.js', // Adjust based on your project structure
  mode: 'development', // Change to 'production' for production builds
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  }
};

