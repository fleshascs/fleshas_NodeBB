import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Head from 'next/head';

const Paragraph = styled.p`
  text-align: justify;
`;

class Index extends React.Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    };
  }

  render() {
    return (
      <div className='container ' style={{ paddingTop: '10px' }}>
        <Head>
          <title>CS 1.6 Download</title>
        </Head>
        <h1>FLESHAS.LT - CS 1.6 Download</h1>
        <Row gutter={24}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <iframe
              style={{ border: 'none' }}
              height='345'
              className='w-100'
              src='https://www.youtube.com/embed/lIOAIttydFI'
            />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Paragraph>
              Yes! You are in the Right place. <b>Counterstrike 1.6</b> is the most famous game now
              a day. <b>Counter Strike1.6</b> Game introduced in 1999 was the first person shooter
              game. They developed by valve corporation. Initially, they developed and most famous
              day by day. <b>Counterstrike 1.6 downloads</b> also called as half-life modification.
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Paragraph>
              The fundamental point in this game they are Multiplayer. <b>Counter-Strike 1.6</b>{' '}
              modes are multiplayer. If you are distressed of the busy working days. You can play
              the games with your Friend, Family Member and Relatives etc. the advantage of{' '}
              <b>Counterstrike game 1.6</b> playing the friends development of mind and skills.
              Because games play a crucial in our Life. They are Two Teams in{' '}
              <b>Counter-Strike 1.6 game</b>
            </Paragraph>
            <ul>
              <li>Terrorist</li>
              <li>Counter Terrorist</li>
            </ul>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Paragraph>
              You can play the game as a terrorist or as a counter Terrorist whose team are Selected
              depend on you. They have different map depended on your objective like bomb defused,
              hostage rescue, Assassination etc. They are eight players playing the games{' '}
              <b>Counter-Strike 1.6</b> Condition Zero added the two-player total of ten
            </Paragraph>
            <Paragraph>
              They are many rewards to download our game <b>Counterstrike 1.6 download</b> First you
              increase many things to play our game dynamic the approach too. You download our game{' '}
              <b>counter strike 1.6</b> and a lot of value and Entertain. Everybody know games are
              some drawback But benefit also, Some People pass up the games and think that games are
              worn out the time No it’s not true those people try to our game{' '}
              <b>Counter Strike 1.6 download</b> and playing the game I assure they do not waste of
              time however the use of time and learn many things. Those people not attracted in
              games but want to play <b>Counterstrike 1.6 download</b> don’t worry those people
              follow some easy pace. First, they seek out <b>Counter-Strike 1.6</b> full training
              and then follow guidance on how to Play <b>Counter Strike 1.6</b> and learn the game.
              Then download the game our website our present page:
            </Paragraph>
            <Paragraph>
              Then install the game and get pleasure from too much. <b>Counter-Strike 1.6 Setup</b>{' '}
              in your Mobiles, Laptop and playing in every place. people are earning playing the
              game <b>Counterstrike 1.6</b>. Amazing it mean you playing the game and earning the
              money. So, you download the game and Entertain also.
            </Paragraph>
            <Paragraph>
              In old competition Life are very boring People go to computer Club to pay a lot of
              money then play the games. It’s wasted money. So, why you shattered of money you can
              free download <b>Counter Strike 1.6 2018</b> in any place like home, Offices etc. you
              have free downloads <b>C.S 1.6 games</b>. It’s downloaded in MB and not changes the
              description Again and Again. Its virus-free game. You download the game offline and
              enjoy the playing game at any time you free and extra time. I promise and sure you
              enjoy too much <b>C.S 1.6 2018 download</b>.
            </Paragraph>
            <Paragraph>
              In 2018 many People Download our game <b>Counter-Strike 1.6 2018</b>. And many people
              impress this game. if you concerned in the War or secure the fanatic in your country
              you play the <b>Counter-Strike 2018</b> I know its not Real but it's your curiosity
              the game So, download our <b>C.S1.6</b> game and enjoy very much one of the most vital
              steps we take free download <b>Counter Strike 1.6 Setup</b> on your Mobile PC in the
              desktop. Because the main purpose is our customer keep pleased and happy. So you free
              download our game. Download if you download our Game Counter Strike 1.6 I promise you
              to like too much I hope you download <b>C.S 1.6</b>.Good Luck….
            </Paragraph>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Index;
