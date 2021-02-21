import * as tf from '@tensorflow/tfjs'
import { input, mod } from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis'

window.onload = async () => {
  const xs = [1, 2, 3, 4];
  const ys = [1, 3, 5, 7];

  tfvis.render.scatterplot(
    { name: '线性回归数据训练' },
    { values: xs.map((x, i) => ({ x, y: ys[i] })) },
    { xAxisDomain: [0, 5], yAxisDomain: [0, 8] }
  );

  const model = tf.sequential(); // 定义模型
  model.add(tf.layers.dense({ units: 1, inputShape: [1] })); // 神经网络模型
  model.compile({ loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.1) }); // 损失函数，随机梯度下降，学习率

  // 转换 tensor
  const inputs = tf.tensor(xs);
  const labels = tf.tensor(ys);

  // 拟合
  await model.fit(inputs, labels, {
    batchSize: 4, // 小批量
    epochs: 200,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练过程' },
      ['loss']
    )
  });

  // 预测

  const output = model.predict(tf.tensor([5]));

  // output.print();
  console.log(output.dataSync()[0]); // 输出结果，转为普通数据 dataSync() 方法



}