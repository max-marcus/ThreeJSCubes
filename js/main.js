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

