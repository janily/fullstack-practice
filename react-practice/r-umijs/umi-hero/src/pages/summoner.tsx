import React from 'react';
import styles from './summoner.less';
import { connect, SummonerModelState, ConnectProps } from 'umi';

import { Row, Col, Radio, Card } from 'antd';

interface PageProps extends ConnectProps {
  hero: SummonerModelState;
}

const Summoner: FC<PageProps> = props => {
  console.log(props.summoner);
  return (
    <div>
      <h1 className={styles.title}>Page summoner</h1>
      <h2>This is {JSON.stringify(props.summoner)}</h2>
    </div>
  );
};
export default connect(({ summoner }: { summoner: SummonerModelState }) => ({
  summoner,
}))(Summoner);
