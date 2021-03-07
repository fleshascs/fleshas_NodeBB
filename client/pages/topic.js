import React from 'react';
import axios from 'axios';
import Topic from 'areas/forum/components/Topic';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Router from 'next/router';
import { Pagination, Modal, Result } from 'antd';
import Head from 'next/head';
import { Breadcrumbs } from 'ui';
import * as actions from 'areas/forum/actions';
import { getCurrentPageTopic, getCurrentPagePosts } from 'areas/forum/selectors';
import { getIsLoggedIn } from 'areas/session/selectors';
import MarkdownEditor from 'ui/markdownEditor';
import { buildTopicUrl } from '_core/utils';
import socket from 'areas/socket/services';
import { enterRoom, leaveCurrentRoom } from 'areas/socket/services/room';
import ModeratorTools from 'areas/forum/components/Topic/ModeratorTools';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const TopicToolsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TopicPosts = styled.div`
  ${(props) =>
    props.deleted
      ? css`
          opacity: 0.3;
        `
      : ''}
`;

class TopicScreenPure extends React.Component {
  static async getInitialProps({ query, req, store }) {
    const isServer = !!req;
    let post_index;
    if (!isServer) {
      const url = '/api' + buildTopicUrl(null, query.slug).url;
      const response = await axios.get(url);
      query.screenData = response.data;
      query.browserTitle = response.data.title;
      post_index = query.screenData.postIndex;
    } else {
      post_index = req.params.post_index;
      query.browserTitle = query.header.browserTitle;
    }

    store.dispatch(actions.setCurrentPagePosts(query.screenData?.posts));
    store.dispatch(actions.setCurrentTopic(query.screenData));

    return {
      browserTitle: query.browserTitle,
      post_index: post_index,
      slug: query.slug,
      breadcrumbs: query.screenData?.breadcrumbs,
      pagination: query.screenData?.pagination,
      namespacesRequired: ['common']
    };
  }

  constructor(props) {
    super(props);
    this.markdownEditor = React.createRef();
    this.state = {
      toolsModal: false
    };
  }

  componentDidMount() {
    socket.on('event:topic_restored', this.topicDeleted);
    socket.on('event:topic_deleted', this.topicDeleted);
    socket.on('event:topic_locked', this.topicLocked);
    socket.on('event:topic_unlocked', this.topicLocked);
    socket.on('event:topic_pinned', this.topicPinned);
    socket.on('event:topic_unpinned', this.topicPinned);
    enterRoom('topic_' + this.props.topic.tid);
  }

  topicLocked = (data) => {
    data = { locked: data.isLocked };
    this.props.setCurrentTopic(data);
  };

  topicPinned = (data) => {
    data = { pinned: data.isPinned };
    console.log('data', data);
    this.props.setCurrentTopic(data);
  };

  topicDeleted = (data) => {
    data = { deleted: data.isDelete };
    this.props.setCurrentTopic(data);
  };

  componentWillUnmount() {
    socket.removeListener('event:topic_restored', this.topicDeleted);
    socket.removeListener('event:topic_deleted', this.topicDeleted);
    socket.removeListener('tevent:topic_locked', this.topicLocked);
    socket.removeListener('event:topic_unlocked', this.topicLocked);
    socket.removeListener('event:topic_pinned', this.topicPinned);
    socket.removeListener('event:topic_unpinned', this.topicPinned);
    leaveCurrentRoom();
  }

  onToolChoose = async (item) => {
    switch (item.index) {
      case 'pinTopic':
        this.props.pinTopic(this.props.topic);
        break;
      case 'deleteTopic':
        this.setState({ toolsModal: !this.state.toolsModal });
        break;
      case 'lockTopic':
        this.props.lockTopic(this.props.topic);
        break;
    }
  };

  onChange = (pageNumber) => {
    const page = buildTopicUrl(pageNumber, this.props.topic.slug);
    Router.push(page.path, page.url);
  };

  handleModalOk = (e) => {
    this.props.deleteTopic(this.props.topic);
    this.hideModal();
  };

  hideModal = (e) => {
    this.setState({
      toolsModal: false
    });
  };

  render() {
    const { topic, currentPagePosts, pagination, browserTitle, t } = this.props;
    if (!currentPagePosts) {
      return <Result status='404' title='404' subTitle='Topic does not exist' />;
    }
    return (
      <div className='container mt-3'>
        <Head>
          <title>{translateNodeBBTemplate(browserTitle, t)}</title>
        </Head>
        {this.props.breadcrumbs ? <Breadcrumbs breadcrumbs={this.props.breadcrumbs} /> : null}
        <TopicToolsContainer>
          <div>
            {topic.locked ? <span>Topic is locked 🔒</span> : null}
            {topic.pinned ? <span>📌</span> : null}
            {topic.deleted ? (
              <span>
                This topic has been deleted by{' '}
                <Username key={user.username} user={topic.deleter}>
                  {topic.deleter.username}
                </Username>
                . Only users with topic management privileges can see it.
              </span>
            ) : null}
          </div>
          <div>
            {topic.privileges && topic.privileges.view_thread_tools ? (
              <ModeratorTools topic={topic} onChoose={this.onToolChoose} />
            ) : null}
          </div>
        </TopicToolsContainer>
        <Modal
          title={'Delete'}
          visible={this.state.toolsModal}
          onOk={this.handleModalOk}
          onCancel={this.hideModal}
        >
          <h4>Delete this topic</h4>
        </Modal>
        {currentPagePosts ? (
          <TopicPosts deleted={topic.deleted}>
            <Topic topic={topic} posts={currentPagePosts} scrollTo={this.props.post_index - 1} />
          </TopicPosts>
        ) : null}
        <PaginationContainer>
          {pagination && pagination.pageCount > 1 ? (
            <Pagination
              defaultCurrent={pagination.currentPage}
              pageSize={20}
              total={pagination.pageCount * 20}
              onChange={this.onChange}
              showSizeChanger={false}
            />
          ) : null}
        </PaginationContainer>
        {!topic.locked && !topic.deleted && topic.privileges && topic.privileges['topics:reply'] ? (
          <MarkdownEditor
            ref={this.markdownEditor}
            onSave={this.onNewPost}
            loggedIn={this.props.loggedIn}
          />
        ) : null}
      </div>
    );
  }

  onNewPost = (content) => {
    this.props.reply(
      {
        tid: this.props.topic.tid,
        content
      },
      this.successCallback
    );
  };

  successCallback = () => {
    this.markdownEditor.current.setValue('');
  };
}

const actionsToProps = {
  reply: actions.reply,
  setCurrentTopic: actions.setCurrentTopic,
  pinTopic: actions.pinTopic,
  lockTopic: actions.lockTopic,
  deleteTopic: actions.deleteTopic
};

function mapStateToProps(state) {
  return {
    loggedIn: getIsLoggedIn(state),
    currentPagePosts: getCurrentPagePosts(state),
    topic: getCurrentPageTopic(state)
  };
}

export default connect(mapStateToProps, actionsToProps)(withTranslation('common')(TopicScreenPure));
