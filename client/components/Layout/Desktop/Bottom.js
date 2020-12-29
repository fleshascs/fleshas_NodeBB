import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { withTranslation } from '_core/i18n';
import { footerBGColor } from '_theme';

// background: url(https://strapi.io/assets/images/bg_pattern.png),
// 		linear-gradient(315deg, #424c58 0, #161d29 100%);
const Trololo = styled.div`
  margin-top: 100px;
  background: ${footerBGColor};
  color: #909ebb;
  padding-bottom: 50px;
  background: linear-gradient(315deg, #424c58 0, #161d29 100%);
  background-size: contain;
  color: #fff;

  & a {
    color: #909ebb;
  }
`;

const LinkContainer = styled.ul`
  padding: 0px;
  list-style-type: none;
  color: #807676;
`;

const ColHeader = styled.h5`
  color: rgb(255, 92, 92);
`;

class Footer extends Component {
  static async getInitialProps() {
    return { namespacesRequired: ['common'] };
  }
  render() {
    const { t } = this.props;
    return (
      <Trololo className='pt-3'>
        <div className='container'>
          <Row gutter={24}>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <img
                src='/static/images/sticker260.png'
                style={{ width: '100%', maxWidth: '260px' }}
                alt='fleshas-sticker'
              />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <ColHeader>{t('links')}</ColHeader>
              <LinkContainer>
                <li>
                  <a
                    title='CS 1.6 download'
                    href='https://www.cybersports.lt/ '
                    target='_blank'
                    rel='noopener'
                  >
                    CS 1.6 download cybersports.lt
                  </a>
                </li>
                <li>
                  <a
                    href='http://counter-strike-download.procs.lt'
                    target='_blank'
                    title='cs 1.6 download '
                    alt='counter-strike 1.6 download , cs 1.6 download , cs 1.6 siustis , download cs 1.6'
                    rel='noopener'
                  >
                    cs 1.6 download
                  </a>
                </li>
              </LinkContainer>
            </Col>

            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <ColHeader> {t('contacts')}</ColHeader>
              <LinkContainer>
                <li>Skype: fleshas.lt</li>
                <li>Facebook: fleshas.lt</li>
                <li>Mail: cs.fleshas.lt@gmail.com</li>
              </LinkContainer>
            </Col>
          </Row>
        </div>
      </Trololo>
    );
  }
}

export default withTranslation('common')(Footer);
