import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { Pagination, Result } from 'antd';
import Router from 'next/router';
import { Button, Breadcrumbs } from 'ui';
import Topics from 'areas/forum/components/Topics';
import { getCSRF } from 'areas/general/selectors';
import { buildCategoryUrl, buildNewTopicUrl, buildSlugFromLocation } from '_core/utils';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';
import { boxBGColor, rowBorderColor } from '_theme';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const PanelHeader = styled.div`
  background: ${boxBGColor};
  border-bottom: 1px solid ${rowBorderColor};
  align-items: center;
`;

const ButtonsContainer = styled.div`
  flex: 1;
  justify-content: flex-end;
`;

class Category extends React.Component {
  static async getInitialProps({ query, store, req }) {
    const isServer = !!req;

    if (!isServer) {
      query.csrfToken = getCSRF(store.getState());
      if (!query.slug) {
        query.slug = buildSlugFromLocation();
      }
      const page = buildCategoryUrl(query.page, query.slug);
      const url = '/api' + page.url;
      const response = await axios.get(url);
      query.screenData = response.data;
      query.browserTitle = response.data.title;
    } else {
      query.browserTitle = query.header.browserTitle;
    }

    return {
      browserTitle: query.browserTitle,
      screenData: query.screenData,
      topics: query.screenData?.topics,
      pagination: query.screenData?.pagination,
      tratata: query.screenData,
      breadcrumbs: query.screenData?.breadcrumbs,
      csrfToken: query.csrfToken,
      namespacesRequired: ['common']
    };
  }

  onChange = (pageNumber) => {
    const { screenData } = this.props;
    const page = buildCategoryUrl(pageNumber, screenData.slug);
    Router.push(page.path, page.url);
  };

  render() {
    const { screenData, topics, pagination, breadcrumbs, browserTitle, t } = this.props;
    if (!topics) {
      return <Result status='404' title='404' subTitle='Category does not exist' />;
    }
    const newTopicPage = buildNewTopicUrl(screenData.cid);
    return (
      <div className='container mt-3'>
        <Head>
          <title>{translateNodeBBTemplate(browserTitle, t)}</title>
        </Head>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <PanelHeader className='d-flex mt-3 px-2'>
          <ButtonsContainer className='my-2 d-flex'>
            <Link href={newTopicPage.path} as={newTopicPage.url}>
              <Button className='blue'>{t('topic-create')}</Button>
            </Link>
          </ButtonsContainer>
        </PanelHeader>
        <Topics topics={topics} />
        <PaginationContainer>
          <Pagination
            defaultCurrent={screenData.pagination.currentPage}
            pageSize={20}
            total={pagination.pageCount * 20}
            onChange={this.onChange}
            showSizeChanger={false}
          />
        </PaginationContainer>
      </div>
    );
  }
}
export default withTranslation('common')(Category);
