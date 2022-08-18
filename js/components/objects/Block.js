import * as THREE from "three";

export default class Block {
  constructor(sketch) {
    const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const geo = new THREE.BoxGeometry();
    this.mesh = new THREE.Mesh(geo, mat);

    sketch.scene.add(this.mesh);

    return this;
  }
  update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}
