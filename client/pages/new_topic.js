import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Head from 'next/head';
import * as actions from 'areas/forum/actions';
import MarkdownEditor from 'ui/markdownEditor';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';
import { getIsLoggedIn } from 'areas/session/selectors';
import { Box } from 'ui';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

class NewTopic extends React.Component {
  static async getInitialProps({ query }) {
    return {
      cid: query.cid,
      namespacesRequired: ['common']
    };
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.editor = React.createRef();
  }

  onFinish = (values) => {
    const data = {
      title: values.title,
      content: this.editor.current.getValue(),
      cid: this.props.cid
    };
    this.props.dispatch(actions.createTopic(data));
  };

  render() {
    if (!this.props.loggedIn) {
      return (
        <div className='container mt-3 text-center'>
          <h4>{this.props.t('you-are-not-logged-in')}</h4>
        </div>
      );
    }
    const { t } = this.props;
    const title = translateNodeBBTemplate('[[pages-new-topic]]', t);
    return (
      <div className='container mt-3'>
        <Head>
          <title>{title}</title>
        </Head>
        <Box headerText={title} className='mt-3'>
          <div className='p-2'>
            <Form name='register' {...formItemLayout} ref={this.formRef} onFinish={this.onFinish}>
              <Form.Item
                label={
                  <span>
                    {this.props.t('topic-name')}&nbsp;
                    <Tooltip title={t('topic-name-tooltip')}>
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name='title'
                rules={[
                  {
                    required: true,
                    message: t('topic-name-required'),
                    whitespace: true
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <MarkdownEditor className='mt-3' ref={this.editor} onSave={this.onNewPost} />
              <div className='d-flex'>
                <Button
                  htmlType='submit'
                  type='primary'
                  //disabled={!this.state.value}
                  className='ml-auto mt-2'
                >
                  {this.props.t('topic-create')}
                </Button>
              </div>
            </Form>
          </div>
        </Box>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: getIsLoggedIn(state)
  };
}

export default connect(mapStateToProps)(withTranslation('common')(NewTopic));
