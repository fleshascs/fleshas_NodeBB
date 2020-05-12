const dev = process.env.NODE_ENV !== 'production';
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['next/babel']],
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          style: true //'css' //https://lifesaver.codes/answer/errors-when-importing-antd-less-using-less-loader
        }
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            areas: './client/areas',
            _core: './client/_core',
            common: './client/components',
            ui: './client/components',
            _theme: './client/static/antd/theme'
          }
        }
      ],
      [
        'babel-plugin-styled-components',
        {
          ssr: true,
          displayName: dev,
          fileName: false,
          preprocess: !dev,
          minify: !dev,
          pure: !dev
        }
      ]
    ]
  };
};
