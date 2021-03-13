const container = document.querySelector('.container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let audioSource;
let analyser;

container.addEventListener('click', function () {
  // let audio1 = new Audio('data:audio/mpeg;base64,/+MYxAAAAANIAAAAAExBTUUzLjk4LjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  const audio1 = document.getElementById('audio1');
  audio1.src = './testwav.wav';
  const audioContext = new AudioContext();
  audio1.play();
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 128;
  const bufferlength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferlength);

  const barWidth = (canvas.width / 2) / bufferlength;
  let barheight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualCircle(bufferlength, x, barWidth, barheight, dataArray)

    requestAnimationFrame(animate)
  }

  animate()
})

file.addEventListener('change', function () {
  console.log(this.files);
  const files = this.files;
  const audio1 = document.getElementById('audio1');
  audio1.src = URL.createObjectURL(files[0]);
  audio1.onload();
  audio1.play();

  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 64;
  const bufferlength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferlength);

  const barWidth = (canvas.width / 2) / bufferlength;
  let barheight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualCircle(bufferlength, x, barWidth, barheight, dataArray)

    requestAnimationFrame(animate)
  }

  animate()
})

function drawVisualRect(bufferlength, x, barWidth, barheight, dataArray) {
  for (let i = 0; i < bufferlength; i++) {
    barheight = dataArray[i] * 2;
    const red = i * barheight / 20;
    const green = i * 40;
    const blue = barheight / 2;
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width / 2 - x, canvas.height - barheight - 30, barWidth, 15);
    ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    ctx.fillRect(canvas.width / 2 - x, canvas.height - barheight, barWidth, barheight);
    x += barWidth;
  }

  for (let i = 0; i < bufferlength; i++) {
    barheight = dataArray[i] * 2;
    const red = i * barheight / 20;
    const green = i * 40;
    const blue = barheight / 2;
    ctx.fillStyle = 'white';
    ctx.fillRect(x, canvas.height - barheight - 30, barWidth, 15);
    ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    ctx.fillRect(x, canvas.height - barheight, barWidth, barheight);
    x += barWidth;
  }
}

function drawVisualCircle(bufferlength, x, barWidth, barheight, dataArray) {
  for (let i = 0; i < bufferlength; i++) {
    barheight = dataArray[i] * 1.5;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * Math.PI * 8 / bufferlength);
    // const red = i * barheight / 20;
    // const green = i * 40;
    // const blue = barheight / 2;
    const hue = i * 15;
    ctx.fillStyle = 'white';
    // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    ctx.fillRect(0, 0, barWidth, barheight);
    x += barWidth;
    ctx.restore();
  }
}

// const btn2 = document.getElementById('btn2');

// btn2.addEventListener('click', playSound);

// function playSound() {
//   const oscillator = audioCtx.createOscillator();
//   oscillator.connect(audioCtx.destination);
//   oscillator.type = 'triangle'; // sine square
//   oscillator.start();
//   setTimeout(function () {
//     oscillator.stop();
//   }, 500)
// }

