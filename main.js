Methane = function() {

};

Methane.prototype.equilateralTriangle = function () {

};

Methane.prototype.addMesh = function() {
  var group = new THREE.Object3D();

  //球
  var sphereGeometry = new THREE.SphereGeometry(30, 30, 30);
  var sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  var cubeMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
  group.add(cubeMesh);

  //三角形
  var material = new THREE.MeshBasicMaterial({
    color: 0xeeee00,
     side: THREE.DoubleSide
  });
  var shape = new THREE.Shape();
  shape.moveTo(0, 100);
  shape.lineTo(100, -50);
  shape.lineTo(-100, -50);
  shape.lineTo(0, 100);
  var geometry = new THREE.ShapeGeometry(shape);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI/2;

  group.add(mesh);
  return group;
};

window.onload = function() {
  var scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  var camera = new THREE.PerspectiveCamera(70, width / height, 1, 40 * 1000);
  camera.position.set(0, 50, 300);
  var controls = new THREE.OrbitControls(camera);

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 0.7, 0.7);
  scene.add(directionalLight);
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  //円
  var geometry = new THREE.CubeGeometry(30, 30, 30);
  var material = new THREE.MeshPhongMaterial({
    color: 0xff0000
  });
  var mesh = new THREE.Mesh(geometry, material);
  //scene.add( mesh );

  var axisHelper = new THREE.AxisHelper(300);
  scene.add(axisHelper);

  var methane = new Methane();
  var methaneMesh = methane.addMesh();

  scene.add(methaneMesh);

  (function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  })();

};
