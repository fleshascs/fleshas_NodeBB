const gravatar = require('gravatar');
const controllers = require('../../src/controllers');
const recent = require('../../src/controllers/recent');
const user = require('../../src/user');
const utils = require('./utils');
// const headerMiddleware = async (req, res, next) => {
//   res.headerData = await generateHeaderAsync(req, res, res.screenData ?? {});
//   next();
// }
const getRecentPosts = utils.promisify(recent.getData);
const setupPageRoute = function (router, name, middleware, middlewares, controller) {
  middlewares = [
    middleware.maintenanceMode,
    middleware.registrationComplete,
    middleware.pageView,
    middleware.pluginHooks,
  ].concat(middlewares);
  router.get(name, middleware.busyCheck, middleware.buildHeader, middlewares, controller);
};
module.exports.setupHomePageRoute = (app) =>
  async function handleHomePageRoute(params) {
    console.log('params', Object.keys(params) );
    
   // const generateHeaderAsync = utils.promisify(params.middleware.generateHeader);
    // const [recent, header] = await Promise.all([
    //   getRecentPosts(params.req, 'recent', 'recent'),
    //   generateHeaderAsync(params.req, params.res, params.res.screenData)
    // ]);
    app.render(params.req, params.res, '/index', {
      recent: await getRecentPosts(params.req, 'recent', 'recent'),
      header: {}
    });
  };
module.exports.setupRoutes = function (app, server, middleware) {
  const generateHeaderAsync = utils.promisify(middleware.generateHeader);
  setupPageRoute(server, '/', middleware, [], async (req, res) => {
    const [recent, header] = await Promise.all([
      getRecentPosts(req, 'recent', 'recent'),
      generateHeaderAsync(req, res, {}) //res.screenData
    ]);
    app.render(req, res, '/index', {
      recent,
      header
    });
  });
  const profileMiddleware =[ middleware.exposeUid, middleware.canViewUsers, middleware.checkAccountPermissions,
    overrideResRender,
    controllers.accounts.profile.get
  ];
  setupPageRoute(server, '/user/:userslug', middleware, profileMiddleware, async (req, res) => {
    app.render(req, res, '/user', {
      id: req.params.userslug,
      header:  await generateHeaderAsync(req, res, res.screenData),
      screenData: res.screenData
    });
  });

  const accountMiddlewares = [middleware.exposeUid, middleware.canViewUsers, middleware.checkAccountPermissions, overrideResRender,
    controllers.accounts.edit.get];
  setupPageRoute(
    server,
    '/user/:userslug/edit',
    middleware,
    accountMiddlewares,
    async (req, res) => {
      app.render(req, res, '/settings', {
        userSlug: req.params.userslug,
        header: await generateHeaderAsync(req, res, res.screenData),
        screenData: res.screenData
      });
    }
  );
 const categoriesMiddleware = [overrideResRender, controllers.categories.list];
  setupPageRoute(server, '/categories', middleware, categoriesMiddleware, async (req, res) => {
    app.render(req, res, '/categories', {
      header: await generateHeaderAsync(req, res, res.screenData),
      screenData: res.screenData
    });
  });
  const categoryMiddleware = [overrideResRender, controllers.category.get];
  setupPageRoute(
    server,
    '/category/:category_id/:slug',
    middleware,
    categoryMiddleware,
    async (req, res) => {
      app.render(req, res, '/category', {
        header: await generateHeaderAsync(req, res, res.screenData),
        screenData: res.screenData
      });
    }
  );
  const topicMiddleware = [overrideResRender, controllers.topics.get];
  setupPageRoute(
    server,
    '/topic/:topic_id/:slug/:post_index?',
    middleware,
    topicMiddleware,
    async (req, res) => {
      app.render(req, res, '/topic', {
        header: await generateHeaderAsync(req, res, res.screenData),
        screenData: res.screenData
      });
    }
  );
  setupPageRoute(
    server,
    '/topic/:topic_id/:slug?',
    middleware,
    topicMiddleware,
    async (req, res) => {
      app.render(req, res, '/topic', {
        header: await generateHeaderAsync(req, res, res.screenData),
        screenData: res.screenData
      });
    }
  );
  setupPageRoute(server, '/new-topic/:cid', middleware, [], async (req, res) => {
    app.render(req, res, '/new_topic', {
      cid: req.params.cid,
      header: await generateHeaderAsync(req, res, res.screenData),
    });
  });
  const registerMiddleware = [
    middleware.redirectToAccountIfLoggedIn,
    overrideResRender,
    controllers.register
  ];
  setupPageRoute(server, '/register', middleware, registerMiddleware, async (req, res) => {
    app.render(req, res, '/register', {
      header: await generateHeaderAsync(req, res, res.screenData),
      screenData: res.screenData
    });
  });
  const loginMiddleware = [
    middleware.redirectToAccountIfLoggedIn,
    overrideResRender,
    controllers.login
  ];
  setupPageRoute(server, '/login', middleware, loginMiddleware, async (req, res) => {
    app.render(req, res, '/login', {
      header: await generateHeaderAsync(req, res, res.screenData),
      screenData: res.screenData
    });
  });
  const resetMiddleware = [middleware.delayLoading, overrideResRender, controllers.reset];
  setupPageRoute(server, '/reset/:code?', middleware, resetMiddleware, async (req, res) => {
    app.render(req, res, '/reset', {
      header: await generateHeaderAsync(req, res, res.screenData),
      screenData: res.screenData
    });
  });
  const registerCompleteMiddleware = [overrideResRender, controllers.registerInterstitial];
  setupPageRoute(
    server,
    '/register/complete',
    middleware,
    registerCompleteMiddleware,
    async (req, res) => {
      //res.send('test');
      app.render(req, res, '/register_complete', {
        header: await generateHeaderAsync(req, res, res.screenData),
        screenData: res.screenData
      });
    }
  );
  setupPageRoute(server, '/csdownloads.php', middleware, [], async (req, res) => {
    app.render(req, res, '/csdownload', {
      header: await generateHeaderAsync(req, res, res.screenData),
    });
  });
  server.get('/api/search/users/:username', (req, res) => {
    user.search({ query: req.params.username }, (err, results) => {
      res.json({ search: req.params, results });
    });
  });
  const registerHandllerMiddleware = (req, res, next) => {
    const settings = { s: '100', r: 'x', d: 'retro' };
    req.body.picture = gravatar.url(req.body.email, settings, false);
    next();
  };
  server.post(
    '/register',
    middleware.applyCSRF,
    middleware.applyBlacklist,
    registerHandllerMiddleware,
    controllers.authentication.register
  );
};

function overrideResRender(req, res, next) {
  res.render = (template, data) => {
    res.screenData = data;
    next();
  };
  next();
}
