import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Result, Form } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import * as sessionActions from 'areas/session/actions';
import * as commonSelectors from 'areas/general/selectors';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';
import { Box } from 'ui';

const Container = styled.div`
  width: 750px;
  margin: 0 auto;

  @media (max-width: 750px) {
    width: 100%;
  }

  & .ant-result-extra {
    text-align: left;
  }
`;

class RegistrationCompletePure extends React.Component {
  static async getInitialProps({ query, req }) {
    const isServer = !!req;
    if (!isServer) {
      const response = await axios.get('/api/register/complete');
      query.screenData = response.data;
      query.browserTitle = response.data.title;
    } else {
      query.browserTitle = query.header.browserTitle;
    }

    return {
      browserTitle: query.browserTitle,
      screenData: query.screenData,
      namespacesRequired: ['common']
    };
  }

  // fillContent(template) {
  //   const { t } = this.props;
  //   const map = {
  //     'user:consent.lead': 'user-consent-lead',
  //     'user:consent.intro': 'user-consent-intro',
  //     'register:gdpr_agree_data': 'register-gdpr_agree_data',
  //     'register:gdpr_agree_email': 'register-gdpr_agree_email',
  //     'user:consent.email_intro': 'consent-email_intro',
  //     'user:consent.digest_off': 'consent-digest_off'
  //   };

  //   const reg = /\[\[.*?\]\]/g;
  //   let result;
  //   while ((result = reg.exec(template)) !== null) {
  //     const match = result[0].replace(/(^.*\[|\].*$)/g, '').split(',');
  //     let text = [];
  //     for (let index = 0; index < match.length; index++) {
  //       const key = match[index];
  //       const translation = t(map[key]);
  //       text.push(translation);
  //       template = template.replace(result, text.join(''));
  //     }
  //   }
  //   return template;
  // }

  renderSection = (template, index) => {
    console.log('***************');
    console.log('template', template);

    const content = translateNodeBBTemplate(template, this.props.t); //this.fillContent(template);
    return (
      <div key={'section' + index} dangerouslySetInnerHTML={{ __html: content }} className='p-2' />
    );
  };

  abort = () => {
    this.props.registerAbort();
  };

  render() {
    const { t, screenData, csrf, browserTitle } = this.props;
    return (
      <div className='container mt-2'>
        <Head>
          <title>{translateNodeBBTemplate(browserTitle, t)}</title>
        </Head>
        <Container>
          <Box className='mt-3'>
            <form method='POST' action={'/register/complete/?_csrf=' + csrf}>
              <input type='hidden' value={csrf} name='_csrf' />
              <Result
                status='success'
                title={t('pages-registration-complete')}
                extra={[
                  <div className='mb-3'>{screenData.sections.map(this.renderSection)}</div>,
                  <Button onClick={this.abort}>{t('cancel_registration')}</Button>,
                  <Button type='primary' htmlType='submit' key='console'>
                    {t('login')}
                  </Button>
                ]}
              />
            </form>
          </Box>
        </Container>
      </div>
    );
  }
}

const actionCreators = {
  registerComplete: sessionActions.registerComplete,
  registerAbort: sessionActions.registerAbort
};

function mapStateToProps(state) {
  return {
    csrf: commonSelectors.getCSRF(state)
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(withTranslation('common')(RegistrationCompletePure));
