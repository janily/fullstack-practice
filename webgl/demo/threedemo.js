const width = 400
const height = 400

const canvas = document.getElementById('three-canvas')

// 渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

// scene 

const scene = new THREE.Scene()

// 上、下、左、右、前、后
const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, - height / 2, -1000, 1000)

renderer.setClearColor(new THREE.Color(0x000000, 1.0))
renderer.setSize(400, 400)

let triangleShape = new THREE.Shape()
triangleShape.moveTo(0, 100)
triangleShape.lineTo(-100, -100)
triangleShape.lineTo(100, -100)
triangleShape.lineTo(0, 100)

const geometry = new THREE.ShapeGeometry(triangleShape)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide
})

const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 0
mesh.position.y = 0
mesh.position.z = 1
scene.add(mesh)

camera.position.x = 0
camera.position.y = 0
camera.position.z = 0
camera.lookAt(new THREE.Vector3(0, 0, 1))

let currentAngle = 0
let lastTimestamp = 2000

let animate = function () {
  const now = Date.now()
  const duration = now - lastTimestamp
  lastTimestamp = now
  currentAngle = currentAngle + duration / 100 * Math.PI
}

let render = function name() {
  animate()
  mesh.rotation.set(0, currentAngle, 0)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

