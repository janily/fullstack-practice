import * as tf from '@tensorflow/tfjs'

// 传统循环

const input = [1, 2, 3, 4]
const w = [[1, 2, 3, 4], [4, 5, 6, 7], [6, 7, 8, 9]];
const output = [0, 0, 0, 0];

for (let i = 0; i < w.length; i++) {
  for (let j = 0; j < input.length; j++) {
    output[i] += input[j] * w[i][j];
  }
}

console.log(output)

tf.tensor(w).dot(tf.tensor(input)).print();