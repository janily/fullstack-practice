import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

window.onload = async() => {
    const heights = [150,160,170];
    const weights = [40,50,60];

    tfvis.render.scatterplot(
        { name: '身高体重训练'},
        {values: heights.map((x,i) => ({x,y: weights[i]}))},
        {
            xAxisDomain: [140,180],
            yAxisDomain: [30,70]
        }
    );

    // 归一化，数据压缩
    const inputs = tf.tensor(heights).sub(150).div(20);
    const labels = tf.tensor(weights).sub(40).div(20);

    const model = tf.sequential(); // 定义模型
    model.add(tf.layers.dense({ units: 1, inputShape: [1] })); // 神经网络模型
    model.compile({ loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.1) }); // 损失函数，随机梯度下降，学习率
  
    // 拟合
    await model.fit(inputs, labels, {
      batchSize: 3, // 小批量
      epochs: 200,
      callbacks: tfvis.show.fitCallbacks(
        { name: '训练过程' },
        ['loss']
      )
    });
  
    // 预测
  
    const output = model.predict(tf.tensor([180]).sub(150).div(20));
  
    // output.print();
    console.log(output.dataSync()[0]); // 输出结果，转为普通数据 dataSync() 方法
    alert(`如果身高为 180 体重为 ${output.mul(20).add(40).dataSync()[0]}`)  // 预测也要反归一化

}