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

