import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

import { MnistData } from './data'

window.onload = async () => {

  const data = new MnistData();
  await data.load();
  const examples = data.nextTestBatch(20);
  const surface = tfvis.visor().surface({ name: '输入示例' })

  for (let i = 0; i < 20; i += 1) {
    const imageTensor = tf.tidy(() => {
      return examples.xs.slice([i, 0], [1, 784]).reshape([28, 28, 1]);
    });

    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    canvas.style = 'margin: 4px'
    await tf.browser.toPixels(imageTensor, canvas);
    surface.drawArea.appendChild(canvas);
  }

  const model = tf.sequential();
  model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1],
    kernelSize: 3,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));

  // 池化层
  model.add(tf.layers.maxPool2d({
    poolSize: [2, 2],
    strides: [2, 2]
  }));

  //特征组合
  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));

  model.add(tf.layers.maxPool2d({
    poolSize: [2, 2],
    strides: [2, 2]
  }));

  model.add(tf.layers.flatten()); // 高维数据转换一维数据
  model.add(tf.layers.dense({
    units: 10,
    activation: 'softmax', // 多分类激活函数
    kernelInitializer: 'varianceScaling'
  }));

  model.compile({
    loss: 'categoricalCrossentropy',
    optimizer: tf.train.adam(),
    metrics: 'accuracy'
  });

  // 训练集
  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(1000);
    return [
      d.xs.reshape([1000, 28, 28, 1]),
      d.labels
    ];
  })

  // 验证集
  const [testXs, testYs] = tf.tidy(() => {
    const d = data.nextTestBatch(200);
    return [
      d.xs.reshape([200, 28, 28, 1]),
      d.labels,
    ];
  })

  // 训练数据
  await model.fit(trainXs, trainYs, {
    validationData: [testXs, testYs],
    batchSize: 500,
    epochs: 20,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练效果' },
      ['loss', 'val_loss', 'acc', 'val_acc'],
      { callbacks: ['onEpochEnd'] }
    )
  });

  //预测

  const canvas = document.querySelector('canvas');

  canvas.addEventListener('mousemove', (e) => {
    if (e.buttons === 1) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(e.offsetX, e.offsetY, 25, 25);
    }
  });

  window.clear = () => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, 300, 300);
  };

  clear();

  window.predict = () => {
    const input = tf.tidy(() => {
      return tf.image.resizeBilinear(
        tf.browser.fromPixels(canvas),
        [28, 28],
        true
      ).slice([0, 0, 0], [28, 28, 1])
        .toFloat()
        .div(255)
        .reshape([1, 28, 28, 1]);
    });
    const pred = model.predict(input).argMax(1);
    alert(`预测结果为 ${pred.dataSync()[0]}`);
  };
}