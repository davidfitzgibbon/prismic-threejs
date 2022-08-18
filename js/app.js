// setup for three
import Scene from "./components/three/Scene";
import Renderer from "./components/three/Renderer";
import Camera from "./components/three/Camera";

// our shapes
import Cube from "./components/objects/Cube";

class Sketch {
  constructor() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.scene = new Scene(this);
    this.renderer = new Renderer(this);
    this.camera = new Camera(this);
  }
  init() {
    // add your shapes here!
    this.cube = new Cube(this);

    document.body.appendChild(this.renderer.domElement);
    this.animate();
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.cube.update();

    this.renderer.update();
  }
}

export default Sketch;
