import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Categories from 'areas/forum/components/Categories';
import { Breadcrumbs } from 'ui';
import { getCSRF } from 'areas/general/selectors';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';

class Index extends React.Component {
  static async getInitialProps({ query, store, req }) {
    const isServer = !!req;

    if (!isServer) {
      query.csrfToken = getCSRF(store.getState());
      const url = '/api/categories?_=' + query.csrfToken;
      const response = await axios.get(url);
      query.screenData = response.data;
      query.browserTitle = response.data.title;
    } else {
      query.browserTitle = query.header.browserTitle;
    }

    return {
      browserTitle: query.browserTitle,
      categories: query.screenData.categories,
      breadcrumbs: query.screenData.breadcrumbs,
      namespacesRequired: ['common']
    };
  }

  render() {
    const { t, browserTitle } = this.props;
    return (
      <div className='container mt-3'>
        <Head>
          <title>{translateNodeBBTemplate(browserTitle, t)}</title>
        </Head>
        <Breadcrumbs breadcrumbs={this.props.breadcrumbs} />
        <Categories categories={this.props.categories} />
      </div>
    );
  }
}

export default withTranslation('common')(Index);
