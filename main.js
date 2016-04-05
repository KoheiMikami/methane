Methane = function() {
  //this.size = 100;
};

Methane.prototype.createConvex = function() {

};

Methane.prototype.createSphere = function(pos) {
  var sphereGeometry = new THREE.SphereGeometry(10, 10, 10);
  var sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000
  });
  var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.position.set(pos.x,pos.y,pos.z);
  return sphereMesh;
};

Methane.prototype.addMesh = function() {
  var group = new THREE.Object3D();
  var size = 100;

  //cube
  var cubeGeometry = new THREE.CubeGeometry(size, size, size);
  var cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    wireframe: true
  });
  var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  group.add(cubeMesh);

  var half = size / 2;
  var convexMaterial = new THREE.MeshPhongMaterial({
    color: 0xe6cf03,
    transparent: true,
    opacity: 0.3
  });
  var vertices = [
    new THREE.Vector3(-half, half, -half),
    new THREE.Vector3(-half, -half, half),
    new THREE.Vector3(half, -half, -half)
  ];
  var convex = new THREE.Mesh(
    new THREE.ConvexGeometry(vertices),
    convexMaterial
  );
  group.add(convex);

  var vertices2 = [
    new THREE.Vector3(half, half, half),
    new THREE.Vector3(-half, -half, half),
    new THREE.Vector3(half, -half, -half)
  ];
  var convex2 = new THREE.Mesh(
    new THREE.ConvexGeometry(vertices2),
    convexMaterial
  );
  group.add(convex2);

  var vertices3 = [
    new THREE.Vector3(half, half, half),
    new THREE.Vector3(-half, half, -half),
    new THREE.Vector3(-half, -half, half),
  ];
  var convex3 = new THREE.Mesh(
    new THREE.ConvexGeometry(vertices3),
    convexMaterial
  );
  group.add(convex3);

  var vertices4 = [
    new THREE.Vector3(-half, half, -half),
    new THREE.Vector3(half, half, half),
    new THREE.Vector3(half, -half, -half),
  ];
  var convex4 = new THREE.Mesh(
    new THREE.ConvexGeometry(vertices4),
    convexMaterial
  );
  group.add(convex4);

  //球
  //中心
  group.add(this.createSphere(new THREE.Vector3(0,0,0)));

  //他
  group.add(this.createSphere(new THREE.Vector3(-half,half,-half)));
  group.add(this.createSphere(new THREE.Vector3(half,half,half)));
  group.add(this.createSphere(new THREE.Vector3(-half,-half,half)));
  group.add(this.createSphere(new THREE.Vector3(half,-half,-half)));

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

  var axisHelper = new THREE.AxisHelper(300);
  scene.add(axisHelper);

  var methane = new Methane();
  scene.add(methane.addMesh());

  (function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  })();

};
