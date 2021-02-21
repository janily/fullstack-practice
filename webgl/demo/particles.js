let scene, camera, renderer;
let countX = 100, countY = 100, space = 120;
let w = window.innerWidth, h = window.innerHeight;

function init() {

  scene = new THREE.Scene();
  camera = camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

  camera.position.z = 1000;

  let nums = countX * countY; // 粒子数量

  let positions = new Float32Array(nums * 3); // 记录粒子的位置
  let scales = new Float32Array(nums); //记录粒子的缩放

  let i = 0, j = 0;

  for (let x = 0; x < countX; x++) {
    for (let y = 0; y < countY; y++) {
      positions[i] = x * space - (countX * space) / 2;
      positions[i + 1] = 0;
      positions[i + 2] = y * space - (countY * space) / 2;
      // 每个粒子都有 3 个坐标（x,y,z)，每三个值是一个粒子的坐标，所以 position 中的个数是粒子数量的3倍，
      scales[j] = 30;
      i += 3;
      j++
    }
  }

  let geometry = new THREE.BufferGeoMentry();
  geometry.addAttribute('positon', new THREE.BufferAttribute(positions, 3))
  geometry.addAttribute('scale', new THREE.BufferAttribute(scales, 1));

  let material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0x00ff00), type: 'c' }
    },
    vertexShader: '',
    fragmentShader: ''
  })
}