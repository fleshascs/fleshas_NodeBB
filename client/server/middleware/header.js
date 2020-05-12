'use strict';
var async = require('async');
var nconf = require('nconf');
var jsesc = require('jsesc');
var db = require('../../../src/database');
var user = require('../../../src/user');
var topics = require('../../../src/topics');
var messaging = require('../../../src/messaging');
var meta = require('../../../src/meta');
var plugins = require('../../../src/plugins');
var navigation = require('../../../src/navigation');
var translator = require('../../../src/translator');
var privileges = require('../../../src/privileges');
var controllers = {
  api: require('../../../src/controllers/api'),
  helpers: require('../../../src/controllers/helpers')
};

module.exports = function renderHeader(req, res, data, callback) {
  if (!data) {
    //console.log('NO DATA data = {};');
    //this one is needed only for homepage because ./routes overrideResRender is not called.
    data = {};
  }
  var registrationType = meta.config.registrationType || 'normal';
  res.locals.config = res.locals.config || {};
  var templateValues = {
    title: meta.config.title || '',
    'title:url': meta.config['title:url'] || '',
    description: meta.config.description || '',
    'cache-buster': meta.config['cache-buster'] || '',
    'brand:logo': meta.config['brand:logo'] || '',
    'brand:logo:url': meta.config['brand:logo:url'] || '',
    'brand:logo:alt': meta.config['brand:logo:alt'] || '',
    'brand:logo:display': meta.config['brand:logo'] ? '' : 'hide',
    allowRegistration:
      registrationType === 'normal' ||
      registrationType === 'admin-approval' ||
      registrationType === 'admin-approval-ip',
    searchEnabled: plugins.hasListeners('filter:search.query'),
    config: res.locals.config,
    relative_path: nconf.get('relative_path'),
    bodyClass: data.bodyClass
  };

  templateValues.configJSON = jsesc(JSON.stringify(res.locals.config), {
    isScriptContext: true
  });

  async.waterfall(
    [
      function (next) {
        async.parallel(
          {
            isAdmin: function (next) {
              user.isAdministrator(req.uid, next);
            },
            isGlobalMod: function (next) {
              user.isGlobalModerator(req.uid, next);
            },
            isModerator: function (next) {
              user.isModeratorOfAnyCategory(req.uid, next);
            },
            privileges: function (next) {
              privileges.global.get(req.uid, next);
            },
            user: function (next) {
              var userData = {
                uid: req.uid,
                username: '[[global:guest]]',
                userslug: '',
                fullname: '[[global:guest]]',
                email: '',
                picture: user.getDefaultAvatar(),
                status: 'offline',
                reputation: 0,
                'email:confirmed': 0
              };

              if (req.loggedIn) {
                user.getUserFields(req.uid, Object.keys(userData), next);
              } else {
                next(null, userData);
              }
            },
            isEmailConfirmSent: function (next) {
              if (!meta.config.requireEmailConfirmation || !req.uid) {
                return next(null, false);
              }
              db.get('uid:' + req.uid + ':confirm:email:sent', next);
            },
            languageDirection: function (next) {
              translator.translate('[[language:dir]]', res.locals.config.userLang, function (
                translated
              ) {
                next(null, translated);
              });
            },
            browserTitle: function (next) {
              translator.translate(
                controllers.helpers.buildTitle(translator.unescape(data.title)),
                function (translated) {
                  //console.log('translated', translated);

                  next(null, translated);
                }
              );
            },
            navigation: navigation.get,
            tags: async.apply(meta.tags.parse, req, data, res.locals.metaTags, res.locals.linkTags),
            banned: async.apply(user.isBanned, req.uid),
            banReason: async.apply(user.getBannedReason, req.uid),

            unreadCounts: async.apply(topics.getUnreadTids, {
              uid: req.uid,
              count: true
            }),
            unreadChatCount: async.apply(messaging.getUnreadCount, req.uid),
            unreadNotificationCount: async.apply(user.notifications.getUnreadCount, req.uid)
          },
          next
        );
      },
      function (results, next) {
        if (results.banned) {
          req.logout();
          return res.redirect('/');
        }

        results.user.isAdmin = results.isAdmin;
        results.user.isGlobalMod = results.isGlobalMod;
        results.user.isMod = !!results.isModerator;
        results.user.privileges = results.privileges;
        results.user[results.user.status] = true;

        results.user.uid = parseInt(results.user.uid, 10);
        results.user.email = String(results.user.email);
        results.user['email:confirmed'] = parseInt(results.user['email:confirmed'], 10) === 1;
        results.user.isEmailConfirmSent = !!results.isEmailConfirmSent;

        setBootswatchCSS(templateValues, res.locals.config);

        var unreadCount = {
          topic: results.unreadCounts[''] || 0,
          newTopic: results.unreadCounts.new || 0,
          watchedTopic: results.unreadCounts.watched || 0,
          unrepliedTopic: results.unreadCounts.unreplied || 0,
          chat: results.unreadChatCount || 0,
          notification: results.unreadNotificationCount || 0
        };

        Object.keys(unreadCount).forEach(function (key) {
          if (unreadCount[key] > 99) {
            unreadCount[key] = '99+';
          }
        });

        results.navigation = results.navigation.map(function (item) {
          function modifyNavItem(item, route, count, content) {
            if (item && item.originalRoute === route) {
              item.content = content;
              if (count > 0) {
                item.iconClass += ' unread-count';
              }
            }
          }
          modifyNavItem(item, '/unread', results.unreadCounts[''], unreadCount.topic);
          modifyNavItem(item, '/unread?filter=new', results.unreadCounts.new, unreadCount.newTopic);
          modifyNavItem(
            item,
            '/unread?filter=watched',
            results.unreadCounts.watched,
            unreadCount.watchedTopic
          );
          modifyNavItem(
            item,
            '/unread?filter=unreplied',
            results.unreadCounts.unreplied,
            unreadCount.unrepliedTopic
          );
          return item;
        });

        templateValues.browserTitle = results.browserTitle;
        templateValues.navigation = results.navigation;
        templateValues.unreadCount = unreadCount;
        templateValues.metaTags = results.tags.meta;
        templateValues.linkTags = results.tags.link;
        templateValues.isAdmin = results.user.isAdmin;
        templateValues.isGlobalMod = results.user.isGlobalMod;
        templateValues.showModMenu =
          results.user.isAdmin || results.user.isGlobalMod || results.user.isMod;
        templateValues.canChat = results.canChat && parseInt(meta.config.disableChat, 10) !== 1;
        templateValues.user = results.user;
        templateValues.userJSON = jsesc(JSON.stringify(results.user), {
          isScriptContext: true
        });
        templateValues.useCustomCSS =
          parseInt(meta.config.useCustomCSS, 10) === 1 && meta.config.customCSS;
        templateValues.customCSS = templateValues.useCustomCSS
          ? meta.config.renderedCustomCSS || ''
          : '';
        templateValues.useCustomHTML = parseInt(meta.config.useCustomHTML, 10) === 1;
        templateValues.customHTML = templateValues.useCustomHTML ? meta.config.customHTML : '';
        templateValues.maintenanceHeader =
          parseInt(meta.config.maintenanceMode, 10) === 1 && !results.isAdmin;
        templateValues.defaultLang = meta.config.defaultLang || 'en-GB';
        templateValues.userLang = res.locals.config.userLang;
        templateValues.languageDirection = results.languageDirection;
        templateValues.privateUserInfo = parseInt(meta.config.privateUserInfo, 10) === 1;
        templateValues.privateTagListing = parseInt(meta.config.privateTagListing, 10) === 1;

        templateValues.template = { name: res.locals.template };
        templateValues.template[res.locals.template] = true;

        if (req.route && req.route.path === '/') {
          modifyTitle(templateValues);
        }

        next(null, templateValues);
        // plugins.fireHook(
        //     'filter:middleware.renderHeader',
        //     {
        //         req: req,
        //         res: res,
        //         templateValues: templateValues,
        //     },
        //     next
        // );
      }
      //uzkomnetuota tam kad grazintu header data, o ne header html
      // function (data, next) {
      //     req.app.render('header', data.templateValues, next);
      // },
    ],
    callback
  );
};

function modifyTitle(obj) {
  var title = controllers.helpers.buildTitle(meta.config.homePageTitle || '[[pages:home]]');
  obj.browserTitle = title;

  if (obj.metaTags) {
    obj.metaTags.forEach(function (tag, i) {
      if (tag.property === 'og:title') {
        obj.metaTags[i].content = title;
      }
    });
  }

  return title;
}

function setBootswatchCSS(obj, config) {
  if (config && config.bootswatchSkin !== 'noskin') {
    var skinToUse = '';

    if (parseInt(meta.config.disableCustomUserSkins, 10) !== 1) {
      skinToUse = config.bootswatchSkin;
    } else if (meta.config.bootswatchSkin) {
      skinToUse = meta.config.bootswatchSkin;
    }

    if (skinToUse) {
      obj.bootswatchCSS =
        '//maxcdn.bootstrapcdn.com/bootswatch/3.3.7/' + skinToUse + '/bootstrap.min.css';
    }
  }
}
