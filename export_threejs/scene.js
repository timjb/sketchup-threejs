function render(Model) {
  var iPhone = navigator.userAgent.indexOf('iPhone') != -1;
  
  var width     = window.innerWidth;
  var height    = window.innerHeight;
  var rotationX = 0;
  var rotationY = 0;
  var cameraZ   = -1e3;
  
  var camera, scene, renderer, mesh;
  
  function attachEvents() {
    // Start and stop the rendering when the mouse enters respectively leaves the canvas
    document.body.addEventListener('mouseover', function() { start(); }, false);
    document.body.addEventListener('mouseout',  function() { stop(); },  false);
    
    // Drag to rotate
    var down = false;
    function rotate(x, y) {
      var newDown = { x: x, y: y };
      rotationY -= (down.x - newDown.x)*(4*Math.PI/width);
      rotationX += (down.y - newDown.y)*(2*Math.PI/width);
      down = newDown;
    }
    if (!iPhone) {
      document.body.addEventListener('mousedown', function(evt) {
        down = { x: evt.clientX, y: evt.clientY };
        document.body.className += ' mousedown';
      }, false);
      document.body.addEventListener('mousemove', function(evt) {
        if (down) {
          rotate(evt.clientX, evt.clientY);
        }
      }, false);
      function mouseUp() {
        down = false;
        document.body.className = document.body.className.replace(/(^|\s)mousedown(\s|$)/, '');
      }
      document.addEventListener('mouseup', mouseUp, false);
      document.addEventListener('mouseout', mouseUp, false);
    } else { // iPhone
      document.body.addEventListener('touchstart', function(evt) {
        if (evt.touches.length == 1) {
          var touch = evt.touches[0];
          down = { x: touch.pageX, y: touch.pageY };
          evt.preventDefault();
        }
      }, false);
      document.body.addEventListener('touchmove', function(evt) {
        if (evt.touches.length == 1) {
          var touch = evt.touches[0];
          rotate(touch.pageX, touch.pageY);
          loop();
        }
      }, false);
    }
    
    // Mouse wheel: Zoom 5%
    // IE, Webkit, Opera
    document.addEventListener('mousewheel', function(evt) {
      cameraZ *= 1 - evt.wheelDelta/2400;
    }, false);
    // Firefox
    window.addEventListener('DOMMouseScroll', function(evt) {
      cameraZ *= 1 + evt.detail/20;
    }, false);
    
    // Window resize
    var resizeTimeout = null;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      
      var oldCamera = camera;
      camera = new THREE.Camera(75, width/height, 1/1e6, 1e9);
      camera.position.z = oldCamera.position.z;
      
      renderer.setSize(width, height);
      loop();
    }
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 25);
    }, false);
  }
  
  //
  
  var timer = null;
  var fps = 25;
  
  function loop() {
    mesh.rotation.x = (2*mesh.rotation.x + rotationX) / 3;
    mesh.rotation.y = (2*mesh.rotation.y + rotationY) / 3;
    camera.position.z = (2*camera.position.z + cameraZ) / 3;
    renderer.render(scene, camera);
  }
  
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
  
  //
  
  function init() {
    var container = document.getElementById('container');
    
    camera = new THREE.Camera(75, width/height, 1/1e6, 1e9);
    camera.position.z = cameraZ;
    scene = new THREE.Scene();
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(width, height);
    
    mesh = new THREE.Mesh(new Model(), new THREE.MeshColorFillMaterial(0xff0000, 1));
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 2e3/Math.max(Model.bounds.width, Model.bounds.height, Model.bounds.depth);
    scene.add(mesh);
    
    container.appendChild(renderer.domElement);
    attachEvents();
    loop();
  }
  
  init();
  
  //var material;
  //var texturePath = '';
  //initBitmapMaterial(texturePath);
  
  //function initBitmapMaterial(url) {
  //  
  //  texture = document.createElement( 'canvas' );
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
}
