import * as THREE from 'three'

export default class Floor {
  constructor(sketch) {
    // setup
    const width = sketch.blockWidth * sketch.count
    const height = sketch.blockWidth
    const depth = sketch.blockWidth * sketch.count

    // create Oimo body
    this.body = sketch.world.add({
      type: 'box',
      size: [width, height, depth],
      move: false,
      friction: 0.2,
      restitution: 0.2,
    })

    // create ThreeJS Mesh, and add to the scene
    this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    this.geometry = new THREE.BoxGeometry(width, height, depth)
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    sketch.scene.add(this.mesh)

    return this
  }
  update() {
    // make sure that the ThreeJS Mesh is updated, based on the Oimo body
    this.mesh.position.copy(this.body.getPosition())
    this.mesh.quaternion.copy(this.body.getQuaternion())
  }
}
