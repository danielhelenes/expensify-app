//entry -> output
//entry = where does our application start (kick out)
//output = where do we put it and how it's its name
//important! when we set up the dev-server => if we delete bundle.js, the app still runs normally with dev-server. if we wqant to add bundle again we need to run yarn run build (that will build webpack again with the bundle file. ) to setup the dev-server we just needed to toss in the path to the public folder in this file.
const path = require('path');

module.exports = { //node.js thing to be able to export what's inside of this object
entry: './src/app.js',
  output:{
    path: path.join(__dirname,'public'), //where u want to put the output bundle.js - it has to be a unique path. /Users/danielferro/Desktop/tcaer/react-course-projects/indecision-app/public
    filename: 'bundle.js' //it can be any name
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: [ //allow us to set up an array of loaders
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  //devtool will allow us to easily debug
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname,'public'),
    historyApiFallback: true
  }
};

//loader

// terminal => yarn add babel-core@6.25.0 babel-loader@7.1.1 = same as babel-cli, but with core we can run babel through webpack, instead of with the command line only.


//







//
