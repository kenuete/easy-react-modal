const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

//require("babel-polyfill");

//const envapp = require('./envapp.config');


module.exports = (env) => {
  let pluginArray = [
    new CleanWebpackPlugin(['dist']),
   // new ExtractTextPlugin({ filename: env.prod ? [env.app]+'.css': [env.app]+'.css' }),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html'
    })  
  ];
  
  if (env.prod){
    console.log('building prod version')
   pluginArray.push(
    new UglifyJSPlugin(
      {
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            warnings: false,
            drop_debugger: true
          }
        }
      }
    ),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production')})    
  );
  }

  else if (env.local) {
    pluginArray.push(
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('local')}),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    );
}
else if (env.development) {
  pluginArray.push(
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development')}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
}
else if (env.staging) {
  pluginArray.push(
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('staging')}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
}

  return {

//    entry: ['babel-polyfill', envapp[env.app].path+'index.js'],
//entry: [envapp[env.app].path+'App.js'],
//entry: ['./App.js'],
    entry: env.app,
    devtool: env.prod? 'source-map' : 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: env.prod ? [env.app]+'': [env.app]+'',
      libraryTarget: 'commonjs2'
    },
    devServer: {
      hot: true,
     //contentBase: "./dist",
    // publicPath: './BackInStock/data/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.json?$/,
          use: {
            loader: 'json-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.(s*)css$/,
          use:['style-loader','css-loader', 'sass-loader']
        }
      ]
    },
    plugins: pluginArray,
    externals: {      
      // Don't bundle react or react-dom      
      react: {          
          commonjs: "react",          
          commonjs2: "react",          
          amd: "React",          
          root: "React"      
      },      
      "react-dom": {          
          commonjs: "react-dom",          
          commonjs2: "react-dom",          
          amd: "ReactDOM",          
          root: "ReactDOM"      
      }  
  } 
  }
  
};



//npm pack
//tar -xvzf easy-react-modal-1.0.42.tgz
