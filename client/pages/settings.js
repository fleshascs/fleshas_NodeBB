import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Box, Breadcrumbs } from 'ui';
import * as userActions from 'areas/user/actions';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';
import { getUserData } from 'areas/settings/services';
import { PasswordChange } from 'areas/settings/components/PasswordChange';
import { EmailChange } from 'areas/settings/components/EmailChange';
import { GeneralChange } from 'areas/settings/components/GeneralChange';
import { ProfilePictureChange } from 'areas/settings/components/ProfilePictureChange';

class Settings extends Component {
  static async getInitialProps({ query, req }) {
    const isServer = !!req;
    if (!isServer) {
      query.screenData = await getUserData(query.userSlug);
      query.browserTitle = query.screenData.title;
    } else {
      query.browserTitle = query.header.browserTitle;
    }

    return {
      browserTitle: query.browserTitle,
      screenData: query.screenData,
      namespacesRequired: ['common']
    };
  }

  handleGeneralSave = (data) => {
    data.uid = this.props.screenData.uid;
    this.props.dispatch(userActions.updateUserData(data));
  };

  handleEmailSave = (data) => {
    data.uid = this.props.screenData.uid;
    this.props.dispatch(userActions.updateUserEmail(data));
  };

  handlePasswordSave = (data) => {
    data.uid = this.props.screenData.uid;
    this.props.dispatch(userActions.updateUserPassword(data));
  };

  handleProfilePictureSave = (data) => {
    data.uid = this.props.screenData.uid;
    this.props.dispatch(userActions.updateUserPicture(data));
  };

  render() {
    const { t, browserTitle } = this.props;
    console.log('browserTitle', browserTitle);

    return (
      <div className='container mt-2'>
        <Head>
          <title>{translateNodeBBTemplate(browserTitle, t)}</title>
        </Head>
        <Breadcrumbs breadcrumbs={this.props.screenData.breadcrumbs} />
        <div style={{ margin: '0 auto', maxWidth: '700px' }}>
          <ProfilePictureChange
            onSubmit={this.handleProfilePictureSave}
            src={this.props.screenData.picture}
          />
          <Box headerText={t('general-details-title')} className='mt-3'>
            <div className='p-2 clearfix'>
              <GeneralChange onSubmit={this.handleGeneralSave} userData={this.props.screenData} />
            </div>
          </Box>
          <Box headerText={t('password-change-title')} className='mt-3'>
            <div className='p-2 clearfix'>
              <PasswordChange onSubmit={this.handlePasswordSave} />
            </div>
          </Box>
          <Box headerText={t('email-change-title')} className='mt-3'>
            <div className='p-2 clearfix'>
              <EmailChange onSubmit={this.handleEmailSave} email={this.props.screenData.email} />
            </div>
          </Box>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn,
    user
  };
}
export default connect(mapStateToProps)(withTranslation('common')(Settings));
