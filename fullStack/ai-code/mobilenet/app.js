import * as tf from '@tensorflow/tfjs'
import { IMAGENET_CLASSES } from './imagenet_classes'
import { file2img } from './utils'

const MOBILE_MODEL_PATH = 'http://127.0.0.1:8080/mobilenet/web_model/model.json';

window.onload = async () => {
  const model = await tf.loadLayersModel(MOBILE_MODEL_PATH);
  window.predict = async (file) => {
    const img = await file2img(file);
    document.body.appendChild(img);
    const pred = tf.tidy(() => {   // tidy 清除 webgl 内存
      const input = tf.browser.fromPixels(img)
        .toFloat()
        .sub(255 / 2)
        .div(255 / 2)
        .reshape([1, 224, 224, 3])
      return model.predict(input);
    });

    const index = pred.argMax(1).dataSync()[0];

    setTimeout(() => {
      console.log(IMAGENET_CLASSES[index])
    }, 0)
  }
}