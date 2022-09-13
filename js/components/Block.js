import * as THREE from 'three'

export default class Block {
  constructor(sketch, settings) {
    // setup
    const width = sketch.blockWidth
    const height = sketch.blockWidth * 0.5
    const depth = sketch.blockWidth * 0.5

    const x = settings.x
    const y = settings.y * height + height
    const z = settings.z

    this.material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    this.geometry = new THREE.BoxGeometry(width, height, depth)
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.mesh.position.set(x, y, z)
    this.mesh.lookAt(0, y, 0)

    sketch.scene.add(this.mesh)

    this.body = sketch.world.add({
      type: 'box',
      size: [width, height, depth],
      pos: [x, y, z],
      rot: [
        this.radToDeg(this.mesh.rotation.x),
        this.radToDeg(this.mesh.rotation.y),
        this.radToDeg(this.mesh.rotation.z),
      ],
      move: true,
      friction: 1,
      restitution: 0.1,
    })

    return this
  }
  radToDeg(num) {
    return (num * 180) / Math.PI
  }
  update() {
    this.mesh.position.copy(this.body.getPosition())
    this.mesh.quaternion.copy(this.body.getQuaternion())
  }
}
