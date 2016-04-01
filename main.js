window.onload = function() {
  var scene = new THREE.Scene();
  var width = window.innerWidth;
  var height = window.innerHeight;

  var camera =  new THREE.PerspectiveCamera(70, width / height, 1, 40 * 1000);
  camera.position.set( 0, 50, 300 );
  var controls = new THREE.OrbitControls(camera);

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000,0);
  renderer.setSize( width, height );
  document.body.appendChild( renderer.domElement );

  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 0, 0.7, 0.7 );
  scene.add( directionalLight );
  var ambientLight = new THREE.AmbientLight(0xffffff,0.5);
  scene.add(ambientLight);

  var geometry = new THREE.CubeGeometry( 30, 30, 30 );
  var material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );


  (function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render( scene, camera );
  })();

};
