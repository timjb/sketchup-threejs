(function(win, doc) {
  var mouseX = 0;
  var mouseY = 0;
  
  function attachEvents() {
    var el = renderer.domElement; // canvas
    
    function savePosition(x, y) {
      var box = el.getBoundingClientRect();
      mouseX = x - box.left;
      mouseY = y - box.top;
    }
    
    function savePositionTouch(evt) {
      if (evt.touches.length == 1) {
        var touch = evt.touches[0];
        savePosition(touch.pageX, touch.pageY);
        evt.preventDefault();
      }
    }
    
    // Start and stop the rendering when the mouse enters respectively leaves the canvas
    el.addEventListener('mouseover', function() { start(); }, false);
    el.addEventListener('mouseout',  function() { stop(); },  false);
    
    el.addEventListener('mousemove',  function(evt) {
      savePosition(evt.clientX, evt.clientY);
    }, false);
    
    // iPhone
    el.addEventListener('touchstart', savePositionTouch, false);
    el.addEventListener('touchmove',  savePositionTouch, false);
  }
  
  //function loadBitmapMaterial(url) {
  //  texture = document.createElement('canvas');
  //  texture.width = 128;
  //  texture.height = 128;
  //  
  //  var material = new THREE.BitmapUVMappingMaterial(texture);
  //  
  //  var temp = new Image();
  //  temp.onload = function() {
  //    material.bitmap = this;
  //    renderer.render(scene, camera);
  //  };
  //  temp.src = url;
  //  
  //  return material;
  //}
  
  function loop() {
    mesh.rotation.x += (mouseY/height * Math.PI*0.3 - mesh.rotation.x)*0.1;
    mesh.rotation.y += (mouseX/width  * Math.PI*2   - mesh.rotation.y)*0.1;
    renderer.render(scene, camera);
  }
  
  var timer = null;
  var fps = 25;
  
  function start() {
    stop();
    timer = setInterval(loop, 1000/fps);
  }
  
  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  
  var container = doc.getElementById('container');
  var width  = 800;
  var height = 350;
  
  var camera = new THREE.Camera(75, width / height, 0.0001, 1e4);
  camera.position.z = -1000;
  var scene = new THREE.Scene();
  var renderer = new THREE.CanvasRenderer();
  renderer.setSize(width, height);
  
  var mesh = new THREE.Mesh(new (exportThreeJSModels[0])(), new THREE.MeshColorFillMaterial(0xff0000, 1));
  mesh.scale.x = mesh.scale.y = mesh.scale.z = 50;
  scene.add(mesh);
  
  container.appendChild(renderer.domElement);
  attachEvents();
  
  //var material;
  //var texturePath = '';
  //initBitmapMaterial(texturePath);
  
  //function initBitmapMaterial(url) {
  //  
  //  texture = doc.createElement( 'canvas' );
  //  texture.width = 128;
  //  texture.height = 128;
  //  
  //  material = new THREE.MeshBitmapUVMappingMaterial( texture );
  //  
  //  var temp = new Image();
  //  temp.onload = function () {
  //    material.bitmap = this;
  //    renderer.render(scene, camera);
  //  };
  //  temp.src = url;
  //}
})(window, document);
