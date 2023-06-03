import * as THREE from 'three';
import{GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

window.addEventListener('load', function () {
  init();
});

async function init() {

  const canvas = document.querySelector('#canvas');

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas,
  });


  renderer.setClearColor('#040616', 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  

  const scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0xf0f0f0, 0.1, 500);
  
  
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500,
  );

  const controls = new OrbitControls(camera, renderer. domElement);

  camera.position.set(8,70,150);

  controls.update();

  function animate() {

    requestAnimationFrame( animate );
  
    
    renderer.render( scene, camera );
    
    controls.update();
  
  
  
  }

  animate();

  const gltfLoader = new GLTFLoader();
  
  const gltf = await gltfLoader.loadAsync('./models/scene.gltf')
  
  const ship = gltf.scene;

  ship.rotation.y = Math.PI / 3.5;
  ship.position.y = 10;
  ship.position.x = 2;
  ship.position.z = 20;
  ship.scale.set(4,4,4);

  scene.add(ship);


  const pointLight = new THREE.PointLight(0xffff8e1,2);

  pointLight.position.set(15,15,15);

  scene.add(pointLight);

  const directionalLight = new THREE.DirectionalLight(0xffff8e1, 0.3);
  
  directionalLight.position.set(-15,15,15);

  scene.add(directionalLight);

  render();

  function render() {
    renderer.render(scene, camera);

    requestAnimationFrame(render);

  }

  function handleResize() {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    renderer.render(scene, camera);

  }
  
  window.addEventListener('resize',handleResize);

}
