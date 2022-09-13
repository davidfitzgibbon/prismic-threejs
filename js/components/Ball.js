import * as THREE from 'three'

export default class Ball {
  constructor(sketch) {
    // setup
    this.material = new THREE.MeshStandardMaterial({ color: 0x0000ff })
    this.geometry = new THREE.SphereGeometry(sketch.radius)
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    sketch.scene.add(this.mesh)

    return this
  }
  update() {
    // animation
  }
}
