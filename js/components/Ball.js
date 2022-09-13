import * as THREE from 'three'

export default class Ball {
  constructor(sketch) {
    // setup
    this.material = new THREE.MeshStandardMaterial({ color: 0x0000ff })
    this.geometry = new THREE.SphereGeometry(sketch.radius)
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    sketch.scene.add(this.mesh)

    const y = sketch.levels * sketch.blockWidth * 2
    this.body = sketch.world.add({
      type: 'sphere',
      size: [sketch.radius],
      pos: [0, y, 0],
      move: true,
      friction: 0.5,
      restitution: 0.5,
    })

    return this
  }
  update() {
    // animation
    this.mesh.position.copy(this.body.getPosition())
    this.mesh.quaternion.copy(this.body.getQuaternion())
  }
}
