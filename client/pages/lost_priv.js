import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import axios from 'axios';
import { Box, Breadcrumbs } from 'ui';
import { withTranslation } from '_core/i18n';
import { error } from '_core/utils';
import Router from 'next/router';
import { InGameDetails } from 'areas/lost_priv/components/InGameDetails';
import { PaymentDetails } from 'areas/lost_priv/components/PaymentDetails';
import { WhereToPut } from 'areas/lost_priv/components/WhereToPut';
import { Conditions } from 'areas/lost_priv/components/Conditions';
import { ListOfRequests } from 'areas/lost_priv/components/ListOfRequests';
import { getCSRF } from 'areas/general/selectors';
import moment from 'moment';

class Settings extends Component {
  static async getInitialProps({ query, req }) {
    return {
      namespacesRequired: ['common']
    };
  }

  state = {
    formStep: 1,
    formValues: {},
    requestsList: [],
    requestsListLoading: true,
    requestsListFailed: false
  };

  onStepSubmit = (values) => {
    this.setState({
      ['stepData' + this.state.formStep]: values,
      formStep: this.state.formStep + 1,
      formValues: { ...this.state.formValues, ...values }
    });
  };

  onWhereToPutSubmit = (values) => {
    return new Promise((resolve, reject) => {
      this.setState(
        {
          ['stepData' + this.state.formStep]: values,
          formValues: { ...this.state.formValues, ...values }
        },
        async () => {
          const formValues = this.state.formValues;
          if (formValues.g_date) {
            formValues.g_date = moment(formValues.g_date).format('YYYY-MM-DD');
          }
          for (const key in formValues) {
            if (formValues[key] === undefined || formValues[key] === null) {
              delete formValues[key];
            }
          }
          await this.submit(formValues);
          resolve();
        }
      );
    });
  };

  submit = async (formValues) => {
    try {
      const response = await axios.post('/api/lost-priv/create', formValues, {
        headers: { 'x-csrf-token': this.props.csrf }
      });
      const requestId = response.data.requestId;
      if (!requestId) throw new Error('requestId not received');
      const path = {
        pathname: '/lost_priv_request',
        query: { id: requestId }
      };
      Router.push(path, '/lost-priv/' + requestId);
    } catch (e) {
      error.showError(e);
    }
  };

  goBack = (values) => {
    this.setState({
      ['stepData' + this.state.formStep]: values,
      formStep: this.state.formStep - 1
    });
  };

  async componentDidMount() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      try {
        const result = await axios.get('/api/lost-priv');
        if (!Array.isArray(result.data)) throw new Error(result.data);
        this.setState({
          requestsList: result.data,
          requestsListLoading: false,
          requestsListFailed: false
        });
      } catch (error) {
        this.setState({ requestsList: [], requestsListLoading: false, requestsListFailed: true });
      }
    }
  }

  render() {
    const { t, loggedIn } = this.props;
    const {
      formStep,
      formValues,
      requestsList,
      requestsListLoading,
      requestsListFailed
    } = this.state;
    if (!loggedIn) {
      return (
        <div className='container mt-3' style={{ maxWidth: '700px' }}>
          <Head>
            <title>Lost priv</title>
          </Head>
          <Breadcrumbs
            breadcrumbs={[
              {
                text: '[[global:home]]',
                url: '/'
              },
              { url: '/lost-priv', text: 'Lost priv' }
            ]}
          />
          <Box>
            <div className='p-2'>Only Logged in users can fill this form</div>
          </Box>
        </div>
      );
    }

    const isPayment =
      formValues.g_privilegie !== 'xp' ||
      (formValues.g_privilegie === 'xp' && formValues.condition == '1');

    return (
      <div className='container mt-3' style={{ maxWidth: '700px' }}>
        <Head>
          <title>Lost priv</title>
        </Head>
        <Breadcrumbs
          breadcrumbs={[
            {
              text: '[[global:home]]',
              url: '/'
            },
            { url: '/lost-priv', text: 'Lost priv' }
          ]}
        />
        {formStep === 1 ? (
          <Box headerText='New request' className='mt-3 p-2'>
            <div className='p-2'>
              <Conditions onSubmit={this.onStepSubmit} {...this.state['stepData' + formStep]} />
            </div>
          </Box>
        ) : null}
        {formStep === 2 ? (
          <Box headerText='In game details' className='mt-3'>
            <div className='p-2'>
              <InGameDetails
                showServerInput={formValues.g_privilegie === 'xp'}
                onSubmit={this.onStepSubmit}
                onGoBack={this.goBack}
                {...this.state['stepData' + formStep]}
              />
            </div>
          </Box>
        ) : null}
        {formStep === 3 && isPayment ? (
          <Box headerText='Payment details' className='mt-3'>
            <div className='p-2'>
              <PaymentDetails
                showServerInput={formValues.g_privilegie === 'xp'}
                onSubmit={this.onStepSubmit}
                onGoBack={this.goBack}
                {...this.state['stepData' + formStep]}
              />
            </div>
          </Box>
        ) : null}
        {formStep === 4 || (formStep === 3 && !isPayment) ? (
          <Box headerText='Where to put' className='mt-3'>
            <div className='p-2'>
              <WhereToPut
                onSubmit={this.onWhereToPutSubmit}
                onGoBack={this.goBack}
                {...this.state['stepData' + formStep]}
              />
            </div>
          </Box>
        ) : null}
        <ListOfRequests
          requests={requestsList}
          loading={requestsListLoading}
          failed={requestsListFailed}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn,
    user,
    csrf: getCSRF(state)
  };
}
export default connect(mapStateToProps)(withTranslation('common')(Settings));
