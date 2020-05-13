import App from 'next/app';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import moment from 'moment';
import { Layout } from 'ui';
import socket from 'areas/socket/services';
import * as csrfActions from '_core/actions/csrf';
import { withReduxSaga } from '_core/store';
import { appWithTranslation, translateNodeBBTemplate } from '_core/i18n';
import { updateUnreadCount } from 'areas/chat/actions';
import { loginSuccess } from 'areas/session/actions';
import { setConfig, setTheme } from 'areas/general/actions';
import { getTheme } from 'areas/general/selectors';
import '../static/antd/styles.less';
import '../static/antd/bootstrap.less';
import '../static/antd/react-mde.less';
import '../static/antd/antd-input.less';
import { newPosts } from 'areas/forum/notifications';
import {
  setConnectionRecconecting,
  setConnectionFailed,
  setConnectionConnected
} from '_core/actions/socket';
import { defaultTheme } from '_theme';
import { renderMetaTag, renderLinkTag } from '_core/utils';

class MyAppPure extends App {
  static async getInitialProps({ Component, router, ctx, req }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    const isServer = ctx.req;
    let llang = 'en-us';
    if (isServer && ctx.query && ctx.query.header) {
      const { user, unreadCount, config } = ctx.query.header;
      ctx.store.dispatch(loginSuccess(user));
      ctx.store.dispatch(updateUnreadCount(unreadCount.chat));
      ctx.store.dispatch(csrfActions.setCSRF(config.csrf_token)); //usless dublicate of general config
      ctx.store.dispatch(setConfig(config));
      ctx.store.dispatch(setTheme(ctx.req.cookies.theme || defaultTheme));
      llang = ctx.req.cookies['next-i18next'] || llang;
    }

    return { pageProps, llang, tags: ctx.query.tags };
  }

  constructor(props) {
    super(props);
    moment.locale(props.llang);
  }

  componentDidMount() {
    //public/src/client/users
    //socket.removeListener('event:user_status_change', onUserStatusChange);
    //socket.on('event:user_status_change', onUserStatusChange);
    //public/src/client/recent
    //socket.on('event:new_topic', onNewTopic);
    //socket.on('event:new_post', onNewPost);
    //('event:user_status_change', { uid: socket.uid, status: 'offline' });
    socket.on('connect', (...args) => {
      console.log('connect', args);
      this.props.store.dispatch(setConnectionConnected());
    });
    socket.on('reconnecting', (...args) => {
      console.log('reconnecting', args);
      this.props.store.dispatch(setConnectionRecconecting());
    });
    socket.on('disconnect', (...args) => {
      console.log('disconnect', args);
    });
    socket.on('reconnect_failed', (...args) => {
      this.props.store.dispatch(setConnectionFailed());
      console.log('reconnect_failed', args);
    });
    socket.on('checkSession', (...args) => {
      console.log('checkSession', args);
      //if(!isLogedIn){
      //
      //}
    });
    socket.on('setHostname', (...args) => {
      console.log('hostname' + args);
    });
    socket.on('event:banned', (...args) => {
      console.log('banned', args);
    });
    socket.on('event:event:new_topic', (...args) => {
      console.log('event:event:new_topic', args);
    });
    socket.on('event:user_status_change', (...args) => {
      console.log('event:user_status_change', args);
    });
    socket.on('event:alert', (...args) => {
      console.log('event:alert', args);
    });
    socket.on('event:new_notification', function (notifData) {
      //public/src/modules/notifications.js
      console.log('event:new_notification', notifData);
    });
    socket.emit('notifications.getCount', function (err, count) {
      if (err) {
        console.log('error notifications.getCount', err);
        return;
      }
      console.log('notifications.getCount', count);
    });
    socket.on('event:notifications.updateCount', function (count) {
      console.log('event:notifications.updateCount', count);
    });
    socket.on('event:unread.updateCount', (messages) => {
      console.log('event:unread.updateCount', messages);
    });
    socket.on('event:nodebb.ready', function (data) {
      console.log('event:nodebb.ready', data);
    });
    //socket.removeListener('event:new_post', newPosts);
    socket.on('event:new_post', newPosts);
    socket.on('event:post_edited', (response) => {
      console.log('post edited!', response);
    });
    socket.on('event:post_deleted', (response) => {
      console.log('post deleted!', response);
    });
  }

  translateMetaTag = (content) => translateNodeBBTemplate(content, (text) => text);
  renderMetaTag = (tag) => renderMetaTag(tag, this.translateMetaTag);

  render() {
    const { Component, pageProps, store, tags } = this.props;
    return (
      <>
        <Head>
          {tags && tags.meta.map(this.renderMetaTag)}
          <meta name='theme-color' content='#1e2327'></meta>
          <meta name='verify-paysera' content='26362ca8db03c45c75e3ea24bb5b8329' />
          {tags && tags.link.map(renderLinkTag)}
          <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
        </Head>
        <Provider store={store}>
          <Theme>
            <Layout>
              <Component pageContext={this.pageContext} {...pageProps} />
            </Layout>
          </Theme>
        </Provider>
      </>
    );
  }
}
const MyApp = withReduxSaga(appWithTranslation(MyAppPure));
export default MyApp;

function Theme({ children }) {
  const theme = useSelector(getTheme);
  return <ThemeProvider theme={{ mode: theme }}>{children}</ThemeProvider>;
}
