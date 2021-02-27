import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { getData } from './data'

window.onload = async () => {
  const data = getData(400);

  tfvis.render.scatterplot(
    { name: 'XOR 训练数据' },
    {
      values: [
        data.filter(p => p.label === 1),
        data.filter(p => p.label === 0),
      ]
    }
  );

  // 初始化神经网络模型

  const model = tf.sequential();

  // 为神经网络模型添加两个层（隐藏层），设计层神经元个数、inputshape、激活函数
  model.add(tf.layers.dense({
    units: 4, // 神经元个数
    inputShape: [2],
    activation: 'relu'
  }));
  // 输出层，设计层神经元个数、inputshape、激活函数
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  }));

  // 损失函数
  model.compile({
    loss: tf.losses.logLoss,
    optimizer: tf.train.adam(0.1)
  })

  // 转换为 tensor

  const inputs = tf.tensor(data.map(p => [p.x, p.y]));
  const labels = tf.tensor(data.map(p => p.label));

  await model.fit(inputs, labels, {
    epochs: 10,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练效果' },
      ['loss']
    )
  });

  window.predict = async (form) => {
    const pred = await model.predict(tf.tensor([[form.x.value * 1, form.y.value * 1]]));
    alert(`预测结果: ${pred.dataSync()[0]}`);
  }
};