import * as OMIO from "three/examples/jsm/libs/OimoPhysics/";

// setup for three
import Scene from "./components/three/Scene";
import Renderer from "./components/three/Renderer";
import Camera from "./components/three/Camera";

// our shapes
import Block from "./components/objects/Block";
import Floor from "./components/objects/Floor";

class Sketch {
  constructor() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.scene = new Scene(this);
    this.renderer = new Renderer(this);
    this.camera = new Camera(this);

    this.world = new OIMO.World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
      worldscale: 1, // scale full world
      random: true, // randomize sample
      info: false, // calculate statistic or not
      gravity: [0, -9.8, 0],
    });

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }
  init() {
    /* 
    
    add your shapes here!
    
    */
    this.floor = new Floor(this);
    this.block = new Block(this);

    // kick off our animation!
    this.animate();
  }
  animate() {
    // line up our next frame
    requestAnimationFrame(this.animate.bind(this));

    /* 
    
      update your shapes here!

    */
    this.block.update();

    // render this frame of our animation
    this.renderer.update();
  }
  onWindowResize() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  }
}

export default Sketch;
