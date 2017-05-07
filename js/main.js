// GLOBAL VARIABLES
var numCubes = 10;
var container, stats;
var camera, scene, renderer;
var textureLoader = new THREE.TextureLoader();
var cubeTexture = textureLoader.load('http://i.imgur.com/U1DnhNv.png');
var raycaster;
var mouse;
var isMouseDown = false,
    onMouseDownPosition,
    onMouseDownTheta = 45,
    onMouseDownPhi = 60,
    phi = 60,
    theta = 45,
    radius = 1600,
    count = 0;

// CREATE CUBES
function createGeometry() {
  var geometry = new THREE.BoxGeometry(100, 100, 100);
  var object = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    color: Math.random() * 0xffffff,
    opacity: 0.75,
    map: cubeTexture,
  }));
  object.position.x = Math.random() * 800 - 500;
  object.position.y = Math.random() * 800 - 600;
  object.position.z = Math.random() * 800 -700;
  object.scale.x = Math.random() * 2 + 1;
  object.scale.y = Math.random() * 2 + 1;
  object.scale.z = Math.random() * 2 + 1;
  object.rotation.x = Math.random() * 2 * Math.PI;
  object.rotation.y = Math.random() * 2 * Math.PI;
  object.rotation.z = Math.random() * 2 * Math.PI;

  return object;
};

function setHeader() {
  var info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '10px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  info.innerHTML = '<a href="http://jscrambler.com" target="_blank">Jscrambler</a> - Three.js cube example';
  container.appendChild(info);
};

function setScore() {
  var info = document.createElement('div');
  info.id = 'score';
  info.style.position = 'absolute';
  info.style.top = '30px';
  info.style.width = '100%';
  info.styletextAlign = 'center';
  info.innerHTML = `Score: ${count}`;
  container.appendChild(info);
};

function createScene() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.autoClear = true;
  renderer = new THREE.CanvasRenderer();
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  for (var i = 0; i < numCubes; i++) {
    var geometry = createGeometry();
    scene.add(geometry);
  };
};

// EVENT FUNCTIONS

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

function onDocumentMouseDown(event) {
  isMouseDown = true;
  onMouseDownTheta = theta;
  onMouseDownPhi = phi;
  onMouseDownPosition.x = event.clientX;
  onMouseDownPosition.y = event.clientY;
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children); // if mouse intersects a cube
  if (intersects.length > 0) {
    new TWEEN.Tween(intersects[0].object.position).to({
          x: Math.random() * 800 - 400,
          y: Math.random() * 800 - 432,
          z: Math.random() * 800 - 777,
        }, 2000)
        .easing(TWEEN.Easing.Elastic.Out).start(); // moves cube
    new TWEEN.Tween(intersects[0].object.rotation).to({
          x: Math.random() * 2 * Math.PI,
          y: Math.random() * 2 * Math.PI,
          z: Math.random() * 2 * Math.PI,
        }, 2000)
        .easing(TWEEN.Easing.Elastic.Out).start(); // rotates cube
    count += 1;
    document.getElementById('score').innerHTML = `Score: ${count}`;
  };
};

function onDocumentMouseMove(event) {
  if (isMouseDown) {
    theta = -((event.clientX - onMouseDownPosition.x) * 0.5) + onMouseDownTheta;
    phi = ((event.clintY - onMouseDownPosition.y) * 0.5) + onMouseDownPhi;

    phi = Math.min(180, Math.max(0, phi));

    camera.position.x = radius * Math.sin(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
    camera.position.y = radius * Math.sin(phi * Math.PI / 360);
    camera.position.z = radius * Math.cos(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
    camera.updateMatrix();
  };
};

function onDocumentMouseUp(event) {
  isMouseDown = false;
};

// BUILDING GAME

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);
  setHeader();
  setScore();
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.y = 360;
  camera.position.z = 555;
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  stats = new Stats();
  container.appendChild(stats.dom);

  createScene();
  onMouseDownPosition = new THREE.Vector2();
  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
  window.addEventListener('resize', onWindowResize, false);
};

function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
};

function render() {
  TWEEN.update();
  theta += 0.1;
  camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
  camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

init();
animate();
