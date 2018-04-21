//entry -> output
//entry = where does our application start (kick out)
//output = where do we put it and how it's its name
//important! when we set up the dev-server => if we delete bundle.js, the app still runs normally with dev-server. if we wqant to add bundle again we need to run yarn run build (that will build webpack again with the bundle file. ) to setup the dev-server we just needed to toss in the path to the public folder in this file.
// source maps = just to show it correctly on the console. we set up for the js that is compiled into bundle.js, and now for the css that it's being compiled to the styles.css
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config( { path: '.env.test'});
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config( { path: '.env.development'});
}

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  console.log('env', env);
  return { //node.js thing to be able to export what's inside of this object
  entry: ['babel-polyfill', './src/app.js'],
    output:{
      path: path.join(__dirname,'public', 'dist'), //where u want to put the output bundle.js - it has to be a unique path. /Users/danielferro/Desktop/tcaer/react-course-projects/indecision-app/public
      filename: 'bundle.js' //it can be any name
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      })
    ],
    //devtool will allow us to easily debug
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
}

//loader

// terminal => yarn add babel-core@6.25.0 babel-loader@7.1.1 = same as babel-cli, but with core we can run babel through webpack, instead of with the command line only.


//







//
