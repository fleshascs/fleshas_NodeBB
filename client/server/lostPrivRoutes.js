const plugins = require('../../src/plugins');
const user = require('../../src/user');
const axios = require('axios');
const async = require('async');
const FormData = require('form-data');

const ROOT_URL = 'http://fleshas.lt';

function formUrlencoded(body) {
  const params = new FormData();
  for (var key in body) {
    params.append(key, body[key]);
  }
  return params;
}

const setupRoute = function (router, name, middleware, controller) {
  const middlewares = [
    middleware.maintenanceMode,
    middleware.registrationComplete,
    middleware.pageView,
    middleware.pluginHooks
  ];
  router.get(name, middleware.busyCheck, middleware.buildHeader, middlewares, controller);
};

module.exports.setupRoutes = function (app, router, middleware) {
  setupRoute(router, '/api/lost-priv', middleware, async (req, res) => {
    try {
      if (!req.loggedIn) {
        return res.status(401).json('not-authorized');
      }
      const url = ROOT_URL + '/php/api/lostPriv/requests_list.php?uid=' + req.uid;
      const response = await axios.get(url);
      res.send(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  setupRoute(router, '/api/lost-priv/:id', middleware, async (req, res) => {
    try {
      if (!req.loggedIn) {
        return res.status(401).json('not-authorized');
      }
      const url =
        ROOT_URL + '/php/api/lostPriv/request_info.php?id=' + req.params.id + '&uid=' + req.uid;
      const response = await axios.get(url);
      res.send(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  setupRoute(router, '/api/lost-priv/chat/:id', middleware, async (req, res) => {
    if (!req.loggedIn) {
      return res.status(401).json('not-authorized');
    }
    try {
      const url =
        ROOT_URL + '/php/api/lostPriv/request_messages.php?id=' + req.params.id + '&uid=' + req.uid;
      const response = await axios.get(url);

      if (Array.isArray(response.data)) {
        async.map(
          response.data,
          function (msg, next) {
            augmentMessage(msg, next);
          },
          function (error, testimonials) {
            if (error) {
              throw error;
            }
            res.send(response.data);
          }
        );
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  const middlewares = [middleware.applyCSRF, middleware.applyBlacklist];
  router.post('/api/lost-priv/chat/send', middlewares, async (req, res) => {
    if (!req.loggedIn) {
      return res.status(401).json('not-authorized');
    }
    try {
      const url = ROOT_URL + '/php/api/lostPriv/request_send_message.php';
      req.body.fromUid = req.uid;
      const form = formUrlencoded(req.body);
      const response = await axios.post(url, form, { headers: form.getHeaders() });
      res.send(response.data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  router.post('/api/lost-priv/create', middlewares, async (req, res) => {
    if (!req.loggedIn) {
      return res.status(401).json('not-authorized');
    }
    try {
      const url = ROOT_URL + '/amxbans/actions/lost_priv_templates/submit.php';
      req.body.g_user = req.uid;
      req.body.ip = req.ip;
      const form = formUrlencoded(req.body);
      const response = await axios.post(url, form, { headers: form.getHeaders() });
      res.send(response.data);
    } catch (error) {
      res.status(500).send();
    }
  });
};

function augmentMessage(msg, done) {
  async.parallel(
    {
      message: async.apply(plugins.fireHook, 'filter:parse.raw', msg.message),
      fromuser: async.apply(getUser, msg.from_id)
    },
    function (error, results) {
      if (error) {
        return done(error);
      }

      done(null, Object.assign(msg, results));
    }
  );
}

function getUser(uid, done) {
  user.getUserFields(uid, ['uid', 'picture', 'username', 'userslug'], done);
}
