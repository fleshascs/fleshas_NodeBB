const next = require('next');
const express = require('express');
const routes = require('./routes');
const lostPrivRoues = require('./lostPrivRoutes');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18next = require('../_core/i18n');
const addSocketListeners = require('./socket');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './client' });
//const handle = app.getRequestHandler();

function initApp(params) {
  const { router, middleware } = params;
  router.use('/_next', express.static('client/.next', { maxAge: 31536000000 })); // 365days
  router.use('/static', express.static('client/static', { maxAge: 31536000000 }));
  router.use('/client/static', express.static('client/static', { maxAge: 31536000000 })); //fix for localePath
  router.use(nextI18NextMiddleware(nextI18next));

  app.prepare().catch((ex) => {
    console.log('NEXTJS ****** error', ex.stack);
  });
  lostPrivRoues.setupRoutes(app, router, middleware);
  routes.setupRoutes(app, router, middleware);
  addSocketListeners();
}

module.exports = {
  initApp,
  app
};
