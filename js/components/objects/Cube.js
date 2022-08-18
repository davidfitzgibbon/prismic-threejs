import * as THREE from "three";

export default class Cube {
  constructor(sketch) {
    const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const geo = new THREE.BoxGeometry();
    this.cube = new THREE.Mesh(geo, mat);

    sketch.scene.add(this.cube);

    return this.mesh;
  }
  update() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }
}
