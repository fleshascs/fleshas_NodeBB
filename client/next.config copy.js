const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
//const withAntd = require('./next-antd.config');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withLess = require('@zeit/next-less');

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './static/antd/antd-custom.less'), 'utf8')
);
// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {};
}

module.exports = withBundleAnalyzer(
  withCSS(
    //withAntd(
    withLess(
      withTM({
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
        },
        lessLoaderOptions: {
          //strictMath: true, //https://github.com/Hacker0x01/react-datepicker/issues/1049
          javascriptEnabled: true,
          modifyVars: themeVariables
        },
        transpileModules: ['perfect-scrollbar'],
        webpack: function (config, { isServer }) {
          const webpack = require('webpack');
          config.plugins.push(
            new FilterWarningsPlugin({
              // ignore ANTD chunk styles [mini-css-extract-plugin] warning
              exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
            })
          );
          //github.com/moment/moment/issues/1435
          https: config.plugins.push(
            new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-us|lt)$/)
          );

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
      })
    )
  )
);
