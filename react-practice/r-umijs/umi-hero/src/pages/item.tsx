import React from 'react';
import styles from './item.less';
import { connect, ItemModelState, ConnectProps } from 'umi';

import { Row, Col, Radio, Card } from 'antd';

interface PageProps extends ConnectProps {
  item: ItemModelState;
}

const Item: FC<PageProps> = props => {
  console.log(props.item);
  const { items = [] } = props.item;
  return (
    <div>
      {/* <h1 className={styles.title}>Page item</h1>
      <h2>This is {JSON.stringify(props.item)}</h2> */}
      <Row>
        {items.reverse().map(item => (
          <Col key={item.item_id} span={3} className={styles.heroitem}>
            <img
              src={`https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.item_id}.jpg`}
            />
            <p>{item.item_name}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default connect(({ item }: { item: ItemModelState }) => ({ item }))(
  Item,
);
