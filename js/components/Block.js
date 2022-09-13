import * as THREE from 'three'

export default class Block {
  constructor(sketch, settings) {
    // setup
    const width = sketch.blockWidth
    const height = sketch.blockWidth * 0.5
    const depth = sketch.blockWidth * 0.5

    this.material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    this.geometry = new THREE.BoxGeometry(width, height, depth)
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    sketch.scene.add(this.mesh)

    this.body = sketch.world.add({
      type: 'box',
      size: [width, height, depth],
      pos: [0, 20, 0],
      rot: [0, 0, 0],
      move: true,
      friction: 1,
      restitution: 0.1,
    })

    return this
  }
  update() {
    this.mesh.position.copy(this.body.getPosition())
    this.mesh.quaternion.copy(this.body.getQuaternion())
  }
}
