//Import
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//////////////////////////////////////
//NOTE Creating renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//////////////////////////////////////

//////////////////////////////////////
//NOTE Creating scene
const scene = new THREE.Scene();
//////////////////////////////////////

//////////////////////////////////////
//NOTE Perspective Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);
////////////////////////////////////

//////////////////////////////////////
//NOTE Percpective controll
const orbit = new OrbitControls(camera, renderer.domElement);
//////////////////////////////////////

//////////////////////////////////////
//NOTE uniform to send time
const uniforms = {
  u_time: { type: "f", value: 0.0 },
};
//////////////////////////////////////

//////////////////////////////////////
//NOTE Creating Shader Material
const patternGeometry = new THREE.PlaneGeometry(10, 10, 70, 70);
const patternMaterial = new THREE.ShaderMaterial({
  vertexShader: document.getElementById("vertexShader").textContent,
  fragmentShader: document.getElementById("fragmentShader").textContent,
  wireframe: true,
  uniforms,
});
const pattern = new THREE.Mesh(patternGeometry, patternMaterial);
scene.add(pattern);
pattern.position.set(0, 0, 0);
//////////////////////////////////////

//////////////////////////////////////
//NOTE - clock
const clock = new THREE.Clock();
//////////////////////////////////////

//////////////////////////////////////
//NOTE - animate function
let i = 0;
function animate(time) {
  uniforms.u_time.value = clock.getElapsedTime() * 2;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
//////////////////////////////////////

//////////////////////////////////////
//NOTE - resize camera view
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
//////////////////////////////////////
