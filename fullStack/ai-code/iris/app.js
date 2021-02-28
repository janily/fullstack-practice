import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import { getIrisData, IRIS_CLASSES } from './data'

window.onload = async () => {
  const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15);

  // 初始化神经网络模型
  const model = tf.sequential();

  // 添加两个层，神经元个数，inputShape、激活函数
  model.add(tf.layers.dense({
    units: 10,
    inputShape: [xTrain.shape[1]],
    activation: 'sigmoid'
  }));
  //第二层网络
  model.add(tf.layers.dense({
    units: 3,
    activation: 'softmax'
  }));

  //损失函数
  model.compile({
    loss: 'categoricalCrossentropy',
    optimizer: tf.train.adam(0.1),
    metrics: ['accuracy'] //准确度
  });

  //训练

  await model.fit(xTrain, yTrain, {
    epochs: 100,
    validationData: [xTest, yTest],
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练效果' },
      ['loss', 'val_loss', 'acc', 'val_acc'],
      { callbacks: ['onEpochEnd'] }
    )
  })
}