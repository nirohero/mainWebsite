import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//setup

const scene = new THREE.Scene();//container

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );//first arguement is field of view, second is aspect ratio, third is to control which objects are visible relative to the camera itself

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),  
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene,camera);

//Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);//the {x,y,z} points that makeup a shape
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} ) ;//the wrapping paper of the object
const torus = new THREE.Mesh(geometry,material);//geometry + material

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);//hexadecimal color value
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);//listens to dom events on the mouse, and updates camera position accordingly

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const[x,y,z]= Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
  star.position.set(x,y,z);
  scene.add(star);
  
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('main page leaf.png');
scene.background = spaceTexture;

//Avatar
const NiroTexture = new THREE.TextureLoader().load('selfie.jpg');

const Niro = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: NiroTexture})
);

scene.add(Niro);

//Sun
/* const sunTexture = new THREE.TextureLoader().load('');

const Sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial()
) */

function moveCamera(){

  const t =  document.body.getBoundingClientRect().top;

  Niro.rotation.x += 0.01;
  Niro.rotation.z += 0.01; 

  // camera.position.z = t * -0.01;
  // camera.position.x = t * -0.0002;
   camera.position.y = t * -0.0002;

}
document.body.onscroll = moveCamera;

function animate() { //recursive function that give infinite loop that calls the render method automatically
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();


  renderer.render(scene, camera);

}
animate();