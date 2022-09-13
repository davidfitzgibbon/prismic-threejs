import * as THREE from 'three'
import * as OIMO from 'oimo'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// our meshes
import Block from './components/Block'
import Floor from './components/Floor'
import Ball from './components/Ball'

class Sketch {
  constructor() {
    // do all the boilerplate setup for ThreeJS
    this.setup()

    // SKETCH VARIABLES
    // the width of one of our blocks
    this.blockWidth = 20
    // how many blocks we want around each level of the tower
    this.count = 6
    // how many levels we want in the tower
    this.levels = 6
    // the size of the gap we want between each block
    this.mitreGap = 1.2
    // the circumference of the tower
    this.circumference = this.blockWidth * this.count * this.mitreGap
    // the radius of the tower
    this.radius = this.circumference / (Math.PI * 2)

    // instantiate components
    this.floor = new Floor(this)
    this.ball = new Ball(this)

    this.blocks = []
    const angleSize = (Math.PI * 2) / this.count
    for (let i = 0; i < this.count; i++) {
      let angle = angleSize * i

      const x = Math.sin(angle) * this.radius
      const z = Math.cos(angle) * this.radius

      this.blocks.push(new Block(this, { x, z }))
    }

    // kick off our animation!
    this.animate()
  }
  // ANIMATION
  animate() {
    // your code here!
    this.floor.update()
    this.ball.update()

    this.blocks.forEach((block) => block.update())

    this.completeFrame()
  }
  completeFrame() {
    // update world
    this.world.step()
    // render this frame of our animation
    this.renderer.render(this.scene, this.camera)
    // line up our next frame
    requestAnimationFrame(this.animate.bind(this))
  }
  // SETUP
  setup() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    this.setupScene()
    this.setupRenderer()
    this.setupCamera()
    this.setupLights()
    new OrbitControls(this.camera, this.renderer.domElement)

    this.world = new OIMO.World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
      worldscale: 1, // scale full world
      random: true, // randomize sample
      info: false, // calculate statistic or not
      gravity: [0, -98, 0],
    })

    document.body.appendChild(this.renderer.domElement)
    window.addEventListener('resize', this.onWindowResize.bind(this), false)
  }
  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      1,
      1000
    )
    this.camera.position.x = 0
    this.camera.position.y = 100
    this.camera.position.z = 100

    this.scene.add(this.camera)
  }
  setupLights() {
    let ambLight = new THREE.AmbientLight(0xffffff, 0.7, 100)
    this.scene.add(ambLight)

    let dirLight = new THREE.DirectionalLight(0xffffff, 1, 100)
    dirLight.position.set(-3, 5, -3)
    this.scene.add(dirLight)
  }
  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
  }
  setupScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xffffff)
  }
  onWindowResize() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
  }
}

export default Sketch
