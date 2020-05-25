import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import axios from 'axios';
import { Box, Breadcrumbs } from 'ui';
import { withTranslation } from '_core/i18n';
import Link from 'next/link';
import { InGameDetails } from 'areas/lost_priv/components/InGameDetails';
import { PaymentDetails } from 'areas/lost_priv/components/PaymentDetails';
import { WhereToPut } from 'areas/lost_priv/components/WhereToPut';
import { Conditions } from 'areas/lost_priv/components/Conditions';

// const data = [
//   {
//     title: 'Lost xp',
//     date: '2020-05-14',
//     nickname: 'Apexor',
//     id: 212
//   },
//   {
//     title: 'Lost xp',
//     date: '2020-05-13',
//     nickname: 'Apexor',
//     id: 213
//   }
// ];

class Settings extends Component {
  static async getInitialProps({ query, req }) {
    return {
      namespacesRequired: ['common']
    };
  }

  state = {
    formStep: 1,
    formValues: {}
  };

  onConditionsSubmit = (values) => {
    console.log(`onConditionsSubmit`, values);
    this.setState({
      formStep: this.state.formStep + 1,
      formValues: { ...this.state.formValues, ...values }
    });
  };
  onInGameDetailsSubmit = (values) => {
    console.log(`onInGameDetailsSubmit`, values);
    this.setState({
      formStep: this.state.formStep + 1,
      formValues: { ...this.state.formValues, ...values }
    });
  };
  onPaymentDetailsSubmit = (values) => {
    console.log(`onPaymentDetailsSubmit`, values);
    this.setState({
      formStep: this.state.formStep + 1,
      formValues: { ...this.state.formValues, ...values }
    });
  };
  onWhereToPutSubmit = async (values) => {
    console.log(`onWhereToPutSubmit`, values);
    this.setState(
      {
        formValues: { ...this.state.formValues, ...values }
      },
      () => {
        const formValues = this.state.formValues;
        formValues.g_user = 1;
        if (formValues.g_date) {
          formValues.g_date = formValues.g_date.format('YYYY-MM-DD');
        }
        console.log('formValues', formValues);
        this.submit(formValues);
      }
    );
  };

  submit = async (formValues) => {
    const response = await axios.post(
      'http://fleshas.lt/amxbans/actions/lost_priv_templates/submit.php',
      {
        data: formValues
      }
    );
    console.log('response', response);
  };
  goBack = () => {
    this.setState({ formStep: this.state.formStep - 1 });
  };

  render() {
    const { t } = this.props;
    const { formStep, formValues } = this.state;

    return (
      <div className='container mt-2' style={{ maxWidth: '700px' }}>
        <Head>
          <title>Lost priv</title>
        </Head>
        {formStep === 1 ? (
          <Box headerTitle='lost xp' className='mt-3 p-2'>
            <div className='p-2'>
              <Conditions onSubmit={this.onConditionsSubmit} />
            </div>
          </Box>
        ) : null}
        {formStep === 2 ? (
          <Box headerText='In game details' className='mt-3'>
            <div className='p-2'>
              <InGameDetails
                showServerInput={formValues.g_privilegie === 'xp'}
                onSubmit={this.onInGameDetailsSubmit}
                onGoBack={this.goBack}
              />
            </div>
          </Box>
        ) : null}
        {formStep === 3 && formValues.condition === 1 ? (
          <Box headerText='Payment details' className='mt-3'>
            <div className='p-2'>
              <PaymentDetails
                showServerInput={formValues.g_privilegie === 'xp'}
                onSubmit={this.onPaymentDetailsSubmit}
                onGoBack={this.goBack}
              />
            </div>
          </Box>
        ) : null}
        {formStep === 4 || (formStep === 3 && formValues.condition !== 1) ? (
          <Box headerText='Where to put' className='mt-3'>
            <div className='p-2'>
              <WhereToPut onSubmit={this.onWhereToPutSubmit} onGoBack={this.goBack} />
            </div>
          </Box>
        ) : null}
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

{
  /* <Divider orientation='left'>Your requests</Divider> */
}
{
  /* <div style={{ backgroundColor: '#fff' }} className='mt-3'>
<List
  // header={<div>Your requests</div>}
  // footer={<div>Footer</div>}
  bordered
  dataSource={data}
  renderItem={(item) => (
    <List.Item>
      
      <List.Item.Meta
        avatar={<Avatar>XP</Avatar>}
        title={
          <Link href={'/lost-priv/' + item.id}>
            <a href='https://ant.design'>{item.title}</a>
          </Link>
        }
        description='Ant Design, a design language for background applications, is refined by Ant UED Team'
      />
    </List.Item>
  )}
/>
</div>  */
}
