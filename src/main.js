import * as THREE from 'three';

window.addEventListener('load', function () {
  init();
});

function init() {
  const canvas = document.querySelector('#canvas');

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas,
  });


  renderer.setClearColor('#040616', 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  

  const scene = new THREE.Scene();

  scene.fog = nwe THREE.Fog();
  
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500,
  );

  camera.position.set(0,25,150);

  const waveGeometry = new THREE.PlaneGeometry(1500,1500,150,150);
  const waveMaterial = new THREE.MeshStandardMaterial({
    //wireframe:true,
    color:'#9ccc65',
  });

  const wave = new THREE.Mesh(waveGeometry, waveMaterial);
  wave.rotation.x = -Math.PI / 2;



  for (let i = 0; i <waveGeometry.attributes.position.array.length; i += 3) {
    waveGeometry.attributes.position.array[i + 2] += (Math.random() - 0.5) * 3;
  }

  scene.add(wave);

  const pointLight = new THREE.PointLight(0xffffff,1);
  
  pointLight.position.set(15,15,15);

  scene.add(pointLight);

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