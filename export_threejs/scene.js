function render(Model) {
  var iPhone = navigator.userAgent.indexOf('iPhone') != -1;
  
  var width     = window.innerWidth;
  var height    = window.innerHeight;
  var rotationY = 0;
  var rotationZ = 0;
  
  var camera, scene, renderer, mesh;
  
  function attachEvents() {
    // Start and stop the rendering when the mouse enters respectively leaves the canvas
    document.body.addEventListener('mouseover', function() { start(); }, false);
    document.body.addEventListener('mouseout',  function() { stop();  }, false);
    
    // Drag to rotate
    var down = null;
    function rotate(x, y) {
      var newDown = { x: x, y: y };
      rotationZ -= (down.x - newDown.x)*(4*Math.PI/width);
      rotationY -= (down.y - newDown.y)*(2*Math.PI/height);
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
    /*document.addEventListener('mousewheel', function(evt) {
      cameraY *= 1 - evt.wheelDelta/2400;
    }, false);
    // Firefox
    window.addEventListener('DOMMouseScroll', function(evt) {
      cameraY *= 1 + evt.detail/20;
    }, false);*/
    
    // Window resize
    var resizeTimeout = null;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      
      var oldCamera = camera;
      camera = new THREE.Camera(75, width/height, 1/1e6, 1e9);
      camera.position = oldCamera.position;
      camera.target   = oldCamera.target;
      
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
    mesh.rotation.y = (2*mesh.rotation.x + rotationY) / 3;
    mesh.rotation.z = (2*mesh.rotation.z + rotationZ) / 3;
    renderer.render(scene, camera);
  }
  
  function start() {
    stop();
    timer = setInterval(loop, 1000/fps);
  }
  
  function stop() {
    clearInterval(timer);
    timer = null;
  }
  
  //
  
  function init() {
    var container = document.getElementById('container');
    
    camera = new THREE.Camera(50, width/height, 1, 10000);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.position = Model.camera.position;
    camera.target.position = Model.camera.targetPosition;
    scene = new THREE.Scene();
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(width, height);
    
    mesh = new THREE.Mesh(new Model(), new THREE.MeshFaceMaterial());
    scene.addObject(mesh);
    
    container.appendChild(renderer.domElement);
    attachEvents();
    loop();
  }
  
  init();
}
