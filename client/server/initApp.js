const next = require('next');
const express = require('express');
const routes = require('./routes');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18next = require('../_core/i18n');
const addSocketListeners = require('./socket');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './client' });
const handle = app.getRequestHandler();

function initApp(params) {
  const { router, middleware } = params;
  router.use('/_next', express.static('client/.next'));
  router.use('/static', express.static('client/static'));
  router.use('/client/static', express.static('client/static')); //fix for localePath
  router.use(nextI18NextMiddleware(nextI18next));

  app.prepare().then(() => {

    // router.get('*', function (req, res, next) {
    //  console.log('****GOT request', req.url);
      
    //   const IS_HANDLED_BY_NODEBB = new RegExp(NODEBB_ROUTES.join('|'), 'i');
    //   if (IS_HANDLED_BY_NODEBB.test(req.url)) return next();
    //   console.log('****nexjs handle', req.url);
    //   handle(req, res);
    // });
  }).catch((ex) => {
    console.log('NEXTJS ****** error', ex.stack);
    process.exit(1);
  });
  routes.setupRoutes(app, router, middleware);
  addSocketListeners();
}

module.exports = {
  initApp,
  app
};
