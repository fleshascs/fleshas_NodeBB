import React, { Component } from 'react';
import Link from 'next/link';
import { messageDate, buildUserUrl } from '_core/utils';
import { Modal, Tag } from 'antd';
import { connect } from 'react-redux';
import { Avatar, Username } from 'ui';
import MarkdownEditor from 'ui/markdownEditor';
import {
  ContainerWrapper,
  Container,
  CommentTitle,
  CommnetMessage,
  PostFooterText,
  AvatarContainer,
  Tools,
  SignatureSeparator,
  SignatureContainer
} from './Post.css.js';
import { editPost, deletePost, restorePost } from '../../actions';
import { getMarkdownString } from '../../services';
import { withTranslation } from '_core/i18n';
import ActionsMenu from './TopicTools';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorMode: false,
      deleteModal: false,
      restoreModal: false
    };
    this.container = React.createRef();
  }

  componentDidMount() {
    if (this.props.scrollTo === this.props.post.index) {
      setTimeout(() => {
        const middleContainer = document.querySelector('.middle-container');
        const postContainer = this.container.current;
        const postPosition = postContainer.offsetTop;
        middleContainer.scrollTo({ top: postPosition - 50 });
      }, 0); //poor solution to wait for middle/images to be loaded.
    }
  }

  handleDelete = (e) => {
    this.props.deletePost(this.props.post);
    this.setState({
      deleteModal: false
    });
  };

  handleCancelDelete = (e) => {
    this.setState({
      deleteModal: false
    });
  };

  handleRestore = (e) => {
    this.props.restorePost(this.props.post);
    this.setState({
      restoreModal: false
    });
  };

  handleCancelRestore = (e) => {
    this.setState({
      restoreModal: false
    });
  };

  render() {
    const { post, deleted, t } = this.props;
    return (
      <ContainerWrapper ref={this.container}>
        <AvatarContainer className={deleted ? 'deleted' : ''}>
          <Avatar user={post.user} imgUrl={post.user.picture} size={60} showIndicator={true} />
        </AvatarContainer>
        <Container classname='clearfix'>
          <CommentTitle>
            <span className={`${deleted ? 'deleted' : ''} my-2`}>
              <Username user={post.user}>{post.user.username}</Username>
              {post.user.selectedGroups
                ? post.user.selectedGroups.map((group) => (
                    <Tag
                      color={group.labelColor}
                      style={{ color: group.textColor }}
                      key={group.name}
                      className='ml-1 mr-1'
                    >
                      {group.name}
                    </Tag>
                  ))
                : null}{' '}
              {t('post-commented')} {messageDate(post.timestamp)}
            </span>

            <Tools className='ml-auto post-tools my-1 mr-1'>
              {post.display_edit_tools ? (
                <ActionsMenu post={this.props.post} onChoose={this.onToolChoose} />
              ) : null}
            </Tools>
          </CommentTitle>
          {this.state.editorMode ? (
            <MarkdownEditor
              className='mx-3 my-3'
              onSave={this.onSave}
              onCancel={this.closeEditor}
              defaultValue={this.source}
            />
          ) : (
            <CommnetMessage className={deleted ? 'deleted' : ''}>
              {post.deleted ? (
                <div>{t('post-deleted')}</div>
              ) : (
                <>
                  <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
                  {this.renderUserSignature()}
                </>
              )}
              {post.edited ? this.editedPostFooter() : null}
            </CommnetMessage>
          )}
          <Modal
            title={t('delete')}
            visible={this.state.deleteModal}
            onOk={this.handleDelete}
            onCancel={this.handleCancelDelete}
          >
            <h4>{t('delete-post-question')}</h4>
          </Modal>
          <Modal
            title={t('restore')}
            visible={this.state.restoreModal}
            onOk={this.handleRestore}
            onCancel={this.handleCancelRestore}
          >
            <h4>{t('restore-post-question')}</h4>
          </Modal>
        </Container>
      </ContainerWrapper>
    );
  }

  renderUserSignature() {
    const { post } = this.props;
    if (post.user?.signature) {
      return (
        <>
          <SignatureSeparator />
          <SignatureContainer dangerouslySetInnerHTML={{ __html: post.user.signature }} />
        </>
      );
    }
    return null;
  }

  editedPostFooter = () => {
    const { post, t } = this.props;
    const route = buildUserUrl(post.editor.userslug);
    return (
      <PostFooterText>
        {t('edited-on-by', { date: messageDate(post.edited) })}{' '}
        <Link href={route.path} as={route.url}>
          <a>{post.editor.username}</a>
        </Link>
      </PostFooterText>
    );
  };

  onSave = (content) => {
    this.props.editPost({ pid: this.props.post.pid, content }, this.successCallback);
  };

  successCallback = () => {
    this.closeEditor();
  };

  onToolChoose = async (item) => {
    switch (item.index) {
      case 'canEdit':
        this.openEditor();
        break;
      case 'canDelete':
        this.setState({ deleteModal: true });
        break;
      case 'canRestore':
        this.setState({ restoreModal: true });
        break;
    }
  };

  openEditor = async () => {
    const post = await getMarkdownString(this.props.post.pid);
    this.source = post.body;
    this.setState({ editorMode: !this.state.editorMode });
  };

  closeEditor = () => {
    this.setState({ editorMode: false });
  };

  createMarkup() {
    return { __html: this.props.post.content };
  }
}

const actionsToProps = {
  editPost,
  deletePost,
  restorePost
};

export default connect(null, actionsToProps)(withTranslation('common')(Post));
