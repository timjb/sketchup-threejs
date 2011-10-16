function render(Model) {
  var iPhone = navigator.userAgent.indexOf('iPhone') != -1;
  
  var width  = window.innerWidth;
  var height = window.innerHeight;
  
  var camera, scene, renderer, mesh;
  
  function attachEvents() {
    // Drag to rotate
    var down = null;
    function rotate(x, y) {
      var newDown = { x: x, y: y };
      var rotZ   = (down.x - newDown.x)*(4*Math.PI/width);
      // TODO: make this relative to the bounds of the model:
      var deltaZ = down.y - newDown.y;
      down = newDown;
      
      // There *must* be a better way to rotate the camera around a given point
      // but I don't know it *yet*.
      var p = new THREE.Vector3().sub(camera.position, Model.camera.targetPosition);
      var p2 = new THREE.Vector3();
      p2.x = p.x * Math.cos(rotZ) - p.y * Math.sin(rotZ);
      p2.y = p.x * Math.sin(rotZ) + p.y * Math.cos(rotZ);
      p2.z = p.z - deltaZ;
      camera.position = new THREE.Vector3().add(Model.camera.targetPosition, p2);
      camera.updateProjectionMatrix();
      camera.update();
      
      render();
    }
    if (!iPhone) {
      document.body.addEventListener('mousedown', function(evt) {
        down = { x: evt.clientX, y: evt.clientY };
        delete document.body.style.cursor;
      }, false);
      document.body.addEventListener('mousemove', function(evt) {
        if (down) {
          rotate(evt.clientX, evt.clientY);
        }
      }, false);
      function mouseUp() {
        down = null;
        document.body.style.cursor = 'move';
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
      camera = new THREE.PerspectiveCamera(50, width/height, 1/1e6, 1e9);
      camera.position = oldCamera.position;
      //camera.target   = oldCamera.target;
      
      renderer.setSize(width, height);
      render();
    }
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 25);
    }, false);
  }
  
  function render() {
    renderer.render(scene, camera);
  }
  
  function init() {
    var container = document.getElementById('container');
    
    camera = new THREE.PerspectiveCamera(50, width/height, 1, 10000);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.position = Model.camera.position;
    //camera.target.position = Model.camera.targetPosition;
    scene = new THREE.Scene();
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(width, height);
    
    mesh = new THREE.Mesh(new Model(), new THREE.MeshFaceMaterial());
    scene.add(mesh);
    
    container.appendChild(renderer.domElement);
    attachEvents();
    
    render();
  }
  
  init();
}
