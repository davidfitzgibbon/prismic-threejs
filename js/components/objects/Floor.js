import * as THREE from "three";

export default class Floor {
  constructor(sketch) {
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const geo = new THREE.CylinderGeometry(5, 5, 0.1, 32);
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.y = -0.5;

    sketch.scene.add(this.mesh);

    return this;
  }
  update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}
