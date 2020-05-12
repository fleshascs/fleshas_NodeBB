require('dotenv').config();
const fs = require('fs');
const path = require('path');
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules');
const lessToJS = require('less-vars-to-js');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withLess = require('@zeit/next-less');
const withPlugins = require('next-compose-plugins');
const { getThemeVariables } = require('antd/dist/theme');
//const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './static/antd/antd-custom.less'), 'utf8')
);

const nextConfig = {
  // env: {
  //   spaceID: process.env.spaceID,
  //   accessTokenDelivery: process.env.accessTokenDelivery
  // }
};

const plugins = [
  [
    withBundleAnalyzer,
    {
      analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: 'static',
          reportFilename: '../bundles/server.html'
        },
        browser: {
          analyzerMode: 'static',
          reportFilename: '../bundles/client.html'
        }
      }
    }
  ],
  [
    withTM,
    {
      transpileModules: ['perfect-scrollbar']
    }
  ],
  [
    withLess,
    {
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables
      },
      // lessLoaderOptions: {
      //   javascriptEnabled: true,
      //   modifyVars: getThemeVariables({
      //     dark: true
      //     //compact: true
      //   })
      // },

      webpack: (config, { isServer }) => {
        const webpack = require('webpack');

        //remove unneeded locales github.com/moment/moment/issues/1435
        const contentReplacement = new webpack.ContextReplacementPlugin(
          /moment[\\\/]locale$/,
          /^\.\/(en-us|lt)$/
        );
        config.plugins.push(contentReplacement);

        // //live theme
        // const options = {
        //   antDir: path.join(__dirname, './../node_modules/antd'),
        //   stylesDir: path.join(__dirname, './../client/static/antd'),
        //   varFile: path.join(__dirname, './../client/static/antd/variables.less'),
        //   mainLessFile: path.join(__dirname, './../client/static/antd/index.less'),
        //   themeVariables: ['@primary-color'],
        //   indexFileName: 'index.html'
        // };
        // const themePlugin = new AntDesignThemePlugin(options);
        // config.plugins.push(themePlugin);

        // const originalEntry = config.entry;
        // config.entry = async () => {
        //   const entries = await originalEntry();

        //   if (entries['main.js'] && !entries['main.js'].includes('./_core/polyfills.js')) {
        //     entries['main.js'].unshift('./_core/polyfills.js');
        //   }

        //   return entries;
        // };

        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === 'function') {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === 'function' ? [] : origExternals)
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: 'null-loader'
          });
        }
        return config;
      }
    }
  ],
  withCSS
];

module.exports = withPlugins(plugins, nextConfig);
