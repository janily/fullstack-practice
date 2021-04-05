const container = document.querySelector('.container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let audioSource;
let analyser;

const btn1 = document.getElementById('btn-1');
const btn2 = document.getElementById('btn-2');
const btn3 = document.getElementById('btn-3');

btn1.addEventListener('click', function () {
  const audio1 = document.getElementById('audio1');
  audio1.src = './Syn Cole - Feel Good [NCS Release].m4a';
  const audioContext = new AudioContext();
  audio1.play();
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 256;
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
});
btn2.addEventListener('click', function () {
  const audio1 = document.getElementById('audio1');
  audio1.src = './Syn Cole - Feel Good [NCS Release].m4a';
  const audioContext = new AudioContext();
  audio1.play();
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 256;
  const bufferlength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferlength);

  const barWidth = (canvas.width / 2) / bufferlength;
  let barheight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);

    drawVisualRect(bufferlength, x, barWidth, barheight, dataArray)

    requestAnimationFrame(animate)
  }

  animate()
});
btn3.addEventListener('click', function () {
  const audio1 = document.getElementById('audio1');
  audio1.src = './Syn Cole - Feel Good [NCS Release].m4a';
  const audioContext = new AudioContext();
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

    drawDots(bufferlength, x, barWidth, barheight, dataArray)

    requestAnimationFrame(animate)
  }

  animate()
});

// container.addEventListener('click', function (clickType) {
//   // let audio1 = new Audio('data:audio/mpeg;base64,/+MYxAAAAANIAAAAAExBTUUzLjk4LjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
//   const audio1 = document.getElementById('audio1');
//   audio1.src = './Syn Cole - Feel Good [NCS Release].m4a';
//   const audioContext = new AudioContext();
//   audio1.play();
//   audioSource = audioContext.createMediaElementSource(audio1);
//   analyser = audioContext.createAnalyser();
//   audioSource.connect(analyser);
//   analyser.connect(audioContext.destination);
//   analyser.fftSize = 256;
//   const bufferlength = analyser.frequencyBinCount;
//   const dataArray = new Uint8Array(bufferlength);

//   const barWidth = (canvas.width / 2) / bufferlength;
//   let barheight;
//   let x;

//   function animate() {
//     x = 0;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     analyser.getByteFrequencyData(dataArray);

//     if (clickType === 'drawVisualCircle') {
//       drawVisualCircle(bufferlength, x, barWidth, barheight, dataArray)
//     } else if (clickType === 'drawVisualRect') {
//       drawVisualRect(bufferlength, x, barWidth, barheight, dataArray)
//     } else {
//       drawDots(bufferlength, x, barWidth, barheight, dataArray)
//     }


//     requestAnimationFrame(animate)
//   }

//   animate()
// })

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

function drawDots(bufferLength, x, barWidth, barHeight, dataArray) {
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 5;
  ctx.shadowColor = 'rgba(0,0,0,1)';
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 1.5;

    const red = i * barHeight / 20 + barHeight / 4;
    const green = 0;
    const blue = 70 + barHeight;
    //ctx.fillStyle = 'white';
    //ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight - 15, barWidth, 5);
    ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
    //ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
    ctx.shadowColor = 'rgba(0,0,0,1)';
    ctx.beginPath();
    ctx.arc(canvas.width / 2 - x, canvas.height - barHeight - 30, barWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath();
    ctx.arc(canvas.width / 2 - x - 5, canvas.height - barHeight - 35, barWidth / 7, 0, Math.PI * 2);
    ctx.fill();
    x += barWidth;
  }
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 1.5;

    const red = i * barHeight / 20 + barHeight / 4;
    const green = 0;
    const blue = 70 + barHeight;
    //ctx.fillStyle = 'white';
    //ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight - 15, barWidth, 5);
    ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
    //ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
    ctx.shadowColor = 'rgba(0,0,0,1)';
    ctx.beginPath();
    ctx.arc(x, canvas.height - barHeight - 30, barWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath();
    ctx.arc(x - 5, canvas.height - barHeight - 35, barWidth / 7, 0, Math.PI * 2);
    ctx.fill();
    x += barWidth;
  }
}

function visual(clickType) {
  const audio1 = document.getElementById('audio1');
  audio1.src = './Syn Cole - Feel Good [NCS Release].m4a';
  const audioContext = new AudioContext();
  audio1.play();
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 256;
  const bufferlength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferlength);

  const barWidth = (canvas.width / 2) / bufferlength;
  let barheight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);

    if (clickType === 'drawVisualCircle') {
      console.log('aaa')
      drawVisualCircle(bufferlength, x, barWidth, barheight, dataArray)
    } else if (clickType === 'drawVisualRect') {
      console.log('bbb')
      drawVisualRect(bufferlength, x, barWidth, barheight, dataArray)
    } else {
      console.log('ccc')
      drawDots(bufferlength, x, barWidth, barheight, dataArray)
    }


    requestAnimationFrame(animate)
  }

  animate()
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

