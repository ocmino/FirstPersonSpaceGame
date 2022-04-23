import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {FlyControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/FlyControls.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
camera.position.set( 0, 0, 10 );
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
/* scene.add( light ); */




//ADD STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 32, 32);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 1000 ) );

  star.position.set(x, y, z);
  scene.add(star);
}
Array(100).fill().forEach(addStar) 

const spaceTexture = new THREE.TextureLoader().load('black.jpg');
scene.background = spaceTexture;

//LIGHT, LIGHTHELPER AND GRIDHELPER
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 50);

/* const ambientLight = new THREE.AmbientLight(0x404040); */
scene.add(pointLight);

const gridHelper = new THREE.GridHelper(2000, 100)
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)







const earthTexture = new THREE.TextureLoader().load('./textures/earth.jpeg')
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);
scene.add(earth);
earth.geometry.computeVertexNormals();




const moonTexture = new THREE.TextureLoader().load('./textures/mercury.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);
scene.add(moon);
moon.geometry.computeVertexNormals();

var t = 0;
function render() { 
    requestAnimationFrame(render); 
    t += 0.004;          

    moon.rotation.y += 0.001;

    //MOONS ORBIT AROUND EARTH
    moon.position.x = 15*Math.cos(t) + earth.position.x;
    moon.position.z = 15*Math.sin(t) + earth.position.z; 

    renderer.render(scene, camera); 
} 
render();




const controls = new FlyControls( camera, renderer.domElement );
controls.movementSpeed = 0.04; // 2 matchar musiken bra
controls.rollSpeed = 0.01;
controls.autoForward = false;
controls.dragToLook = false;



//controls.update() must be called after any manual changes to the camera's transform




function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );


    // 3. update controls with a small step value to "power its engines"
  controls.update(0.1)

  earth.rotation.y += 0.001;
 
}
animate();