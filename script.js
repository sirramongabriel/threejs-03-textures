import * as THREE from 'three';

// 1. Create Scene
const scene = new THREE.Scene();
// scene.background({ color: '#FAF9F6' });

// 2. Create Camera
const camera = new THREE.PerspectiveCamera(
  45, // FOV
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // camera view near plane
  1000 // camera view far plane
);
camera.position.z = 5;
scene.add(camera);

// 3. Create Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const texturePath = './assets/brick-texture.jpg';
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  texturePath,
  function (texture) {
    material.map = texture;
    // Tell Three.js the materials props have changed and needs to update
    material.needsUpdate = true;
    console.log('Texture load success!');
    // Re-render the scene after texture is applied
    renderer.render(scene, camera);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error('An error happened loading the texture:', error);
  }
);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // bright green
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// 4. Create Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Add canvas to the HTML
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
