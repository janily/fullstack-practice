import React from 'react';
import styles from './hero.less';
import { connect, HeroModelState, ConnectProps } from 'umi';
import { Row, Col, Radio, Card } from 'antd';
import FreeHeroItem from '@/components/FreeHeroItem';
// 这里的 @ 标示 src目录，这是umi中自带的别名。

interface PageProps extends ConnectProps {
  hero: HeroModelState;
}

function Hero({ hero, dispatch }) {
  console.log(hero);
  const { heros = [], filterKey = 0, freeheros = [], itemHover = 0 } = hero;
  const onChange = e => {
    console.log(e.target.value);
    dispatch({
      type: 'hero/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };
  const RadioGroup = Radio.Group;
  const heroType = [
    { key: 0, value: '全部' },
    { key: 1, value: '战士' },
    { key: 2, value: '法师' },
    { key: 3, value: '坦克' },
    { key: 4, value: '刺客' },
    { key: 5, value: '射手' },
    { key: 6, value: '辅助' },
  ];

  const onItemHover = e => {
    dispatch({
      type: 'hero/save',
      payload: {
        itemHover: e,
      },
    });
  };

  return (
    <div>
      {/* <h1 className={styles.title}>Page hero</h1>
      <h2>This is {JSON.stringify(props.hero)}</h2> */}
      <div className={styles.normal}>
        <div className={styles.info}>
          <Row className={styles.freehero}>
            <Col span={24}>
              <p>周免英雄</p>
              <div>
                {freeheros.map((data, index) => (
                  <FreeHeroItem
                    data={data}
                    itemHover={itemHover}
                    onItemHover={onItemHover}
                    thisIndex={index}
                    key={index}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </div>
        <Card className={styles.radioPanel}>
          <RadioGroup onChange={onChange} value={filterKey}>
            {heroType.map(data => (
              <Radio value={data.key} key={`hero-radio-${data.key}`}>
                {data.value}
              </Radio>
            ))}
          </RadioGroup>
        </Card>
      </div>
      <Row>
        {heros
          .filter(item => filterKey === 0 || item.hero_type === filterKey)
          .reverse()
          .map(item => (
            <Col key={item.ename} span={3} className={styles.heroitem}>
              <img
                src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`}
              />
              <p>{item.cname}</p>
            </Col>
          ))}
      </Row>
    </div>
  );
}
export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(
  Hero,
);
