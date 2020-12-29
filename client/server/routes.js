const gravatar = require('gravatar');
const controllers = require('../../src/controllers');
const recent = require('../../src/controllers/recent');
const user = require('../../src/user');
const { promisify, asyncUtil } = require('./utils');
const meta = require('../../src/meta');
const getRecentPosts = promisify(recent.getData);
const setupPageRoute = function (router, name, middleware, middlewares, controller) {
  middlewares = [
    middleware.maintenanceMode,
    middleware.registrationComplete,
    middleware.pageView,
    middleware.pluginHooks
  ].concat(middlewares);
  router.get(name, middleware.busyCheck, middleware.buildHeader, middlewares, controller);
};
module.exports.setupHomePageRoute = (app) =>
  async function handleHomePageRoute(params) {
    console.log('params', Object.keys(params));
  };
module.exports.setupRoutes = function (app, server, middleware) {
  const generateHeaderAsync = promisify(middleware.generateHeader);
  setupPageRoute(
    server,
    '/',
    middleware,
    [],
    asyncUtil(async (req, res) => {
      const [recent, tags, header] = await Promise.all([
        getRecentPosts(req, 'recent', 'recent'),
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, {})
      ]);
      app.render(req, res, '/index', {
        recent,
        tags,
        header
      });
    })
  );
  const profileMiddleware = [
    middleware.exposeUid,
    middleware.canViewUsers,
    overrideResRender,
    controllers.accounts.profile.get
  ];
  setupPageRoute(
    server,
    '/user/:userslug',
    middleware,
    profileMiddleware,
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, res.screenData)
      ]);
      app.render(req, res, '/user', {
        id: req.params.userslug,
        header,
        tags,
        screenData: res.screenData
      });
    })
  );
  setupPageRoute(
    server,
    '/user/:userslug/reputation',
    middleware,
    profileMiddleware,
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, res.screenData)
      ]);
      app.render(req, res, '/reputation', {
        id: req.params.userslug,
        header,
        tags,
        screenData: res.screenData
      });
    })
  );

  const accountMiddlewares = [
    middleware.exposeUid,
    middleware.canViewUsers,
    middleware.checkAccountPermissions,
    overrideResRender,
    controllers.accounts.edit.get
  ];
  setupPageRoute(
    server,
    '/user/:userslug/edit',
    middleware,
    accountMiddlewares,
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, res.screenData)
      ]);
      app.render(req, res, '/settings', {
        userSlug: req.params.userslug,
        header,
        tags,
        screenData: res.screenData
      });
    })
  );
  const categoriesMiddleware = [overrideResRender, controllers.categories.list];
  setupPageRoute(
    server,
    '/categories',
    middleware,
    categoriesMiddleware,
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, res.screenData)
      ]);
      app.render(req, res, '/categories', {
        header,
        tags,
        screenData: res.screenData
      });
    })
  );
  const categoryMiddleware = [overrideResRender, controllers.category.get];
  setupPageRoute(
    server,
    '/category/:category_id/:slug',
    middleware,
    categoryMiddleware,
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, res.screenData)
      ]);
      app.render(req, res, '/category', {
        header,
        tags,
        screenData: res.screenData
      });
    })
  );
  const topicMiddleware = [overrideResRender, controllers.topics.get];
  setupPageRoute(
    server,
    '/topic/:topic_id/:slug/:post_index?',
    middleware,
    topicMiddleware,
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, res.screenData)
      ]);
      app.render(req, res, '/topic', {
        header,
        tags,
        screenData: res.screenData
      });
    })
  );
  setupPageRoute(
    server,
    '/topic/:topic_id/:slug?',
    middleware,
    topicMiddleware,
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, res.screenData)
      ]);
      app.render(req, res, '/topic', {
        header,
        tags,
        screenData: res.screenData
      });
    })
  );
  setupPageRoute(
    server,
    '/new-topic/:cid',
    middleware,
    [],
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, {})
      ]);
      app.render(req, res, '/new_topic', {
        cid: req.params.cid,
        header,
        tags
      });
    })
  );
  const registerMiddleware = [
    middleware.redirectToAccountIfLoggedIn,
    overrideResRender,
    controllers.register
  ];
  setupPageRoute(
    server,
    '/register',
    middleware,
    registerMiddleware,
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, res.screenData)
      ]);
      app.render(req, res, '/register', {
        header,
        tags,
        screenData: res.screenData
      });
    })
  );
  const loginMiddleware = [
    middleware.redirectToAccountIfLoggedIn,
    overrideResRender,
    controllers.login
  ];
  setupPageRoute(
    server,
    '/login',
    middleware,
    loginMiddleware,
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, res.screenData)
      ]);
      app.render(req, res, '/login', {
        header,
        tags,
        screenData: res.screenData
      });
    })
  );
  const resetMiddleware = [middleware.delayLoading, overrideResRender, controllers.reset];
  setupPageRoute(
    server,
    '/reset/:code?',
    middleware,
    resetMiddleware,
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, res.screenData)
      ]);
      app.render(req, res, '/reset', {
        header,
        tags,
        code: req.params.code,
        screenData: res.screenData
      });
    })
  );
  const registerCompleteMiddleware = [overrideResRender, controllers.registerInterstitial];
  setupPageRoute(
    server,
    '/register/complete',
    middleware,
    registerCompleteMiddleware,
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, res.screenData)
      ]);
      app.render(req, res, '/register_complete', {
        header,
        tags,
        screenData: res.screenData
      });
    })
  );
  setupPageRoute(
    server,
    '/lost-priv/:id',
    middleware,
    [],
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, {})
      ]);
      app.render(req, res, '/lost_priv_request', {
        header,
        tags,
        id: req.params.id
      });
    })
  );
  setupPageRoute(
    server,
    '/lost-priv',
    middleware,
    [],
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, {})
      ]);
      app.render(req, res, '/lost_priv', {
        header,
        tags
      });
    })
  );
  setupPageRoute(
    server,
    '/csdownloads.php',
    middleware,
    [],
    asyncUtil(async (req, res) => {
      const [tags, header] = await Promise.all([
        meta.tags.parse(req, {}, res.locals.metaTags, res.locals.linkTags),
        generateHeaderAsync(req, res, {})
      ]);
      app.render(req, res, '/csdownload', {
        header,
        tags
      });
    })
  );
  server.get('/api/search/users/:username', (req, res) => {
    user.search({ query: req.params.username }, (err, results) => {
      res.json({ search: req.params, results });
    });
  });
  const registerHandllerMiddleware = (req, res, next) => {
    const settings = { s: '100', r: 'x', d: 'retro' };
    req.body.picture = gravatar.url(req.body.email, settings, true);
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
