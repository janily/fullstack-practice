import * as tf from '@tensorflow/tfjs'
import { IMAGENET_CLASSES } from './imagenet_classes'
import { file2img } from './utils'

const U2NET_MODEL_PATH = 'http://127.0.0.1:8080/u2net/model.json';

window.onload = async () => {
  const model = await tf.loadLayersModel(U2NET_MODEL_PATH);
  console.log(model)
  window.predict = async (file) => {
    const img = await file2img(file);
    const pred = tf.tidy(() => {
      const ori_tf = tf.browser.fromPixels(img);
      let resizedImage = ori_tf.resizeNearestNeighbor([320, 320]).toFloat().div(tf.scalar(255));
      let adj = resizedImage.div(input.max()).sub(tf.scalar(0.485)).div(tf.scalar(0.229));
      let finalInput = adj.transpose([2, 0, 1]).expandDims(0);
      // console.log('input', input.shape)
      return model.predict(finalInput);
    })

    console.log('pred', pred)
  }
}