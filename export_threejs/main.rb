class ThreeJSExporter
  def initialize(filepath)
    @filepath = filepath
    @model = Sketchup.active_model
    @entities = @model.active_entities
  end
  
  def export
    File.open(@filepath, "w") do |file|
      file.write to_html
    end
  end

  private
  def faces
    faces = []
    @entities.each do |entity|
      faces.push entity if entity.is_a? Sketchup::Face
    end
    @model.definitions.each do |definition|
      definition.entities.each do |entity|
        faces.push entity if entity.is_a? Sketchup::Face
      end
    end
    faces
  end
  
  def vertices
    faces.inject([]) do |vertices, face|
      vertices.concat face.vertices
    end.uniq
  end
  
  def points
    vertices.map {|vertex| vertex.position }
  end
  
  def triangles
    vs = vertices
    faces.map do |face|
      # TODO: split faces with many vertices into triangles
      face.vertices.map {|v| vs.index v }
    end
  end
  
  def load_asset asset
    File.open(File.dirname(__FILE__) + "/" + asset, "r").read
  end
  
  def to_html
    return <<EOF
<!DOCTYPE html>
<html>
  <head>
    <title>#{@model.title}</title>
    <meta charset="utf-8">
    <style>
      #{load_asset "style.css"}
    </style>
  </head>
  <body>
    <h1>#{@model.title}</h1>
    <div id="container"></div>
    <script>
      #{load_asset "three.js"}
      #{to_js}
      #{load_asset "scene.js"}
    </script>
  </body>
EOF
  end
  
  def to_js
    return <<EOF
var exportThreeJSModels = window.exportThreeJSModels || [];
exportThreeJSModels.push((function() {
  function Model() {
    THREE.Geometry.call(this);
    var self = this;
    
    function each(arr, fn) {
      for(var i = 0, l = arr.length; i < l; i++) {
        fn(arr[i], i);
      }
    }
    
    each([#{points.map {|p| "[#{p.x.to_f},#{p.y.to_f},#{p.z.to_f}]"}.join(',')}], function(point) {
      self.vertices.push(new THREE.Vertex(new THREE.Vector3(point[0], point[1], point[2])));
    });
    
    each([#{triangles.map {|t| "[#{t.join ','}]"}.join(',')}], function(triangle) {
      self.faces.push(new THREE.Face3(triangle[0], triangle[1], triangle[2]));
    });
    
    //function f3n( a, b, c, nx, ny, nz ) {
    //  scope.faces.push( new THREE.Face3( a, b, c, new THREE.Vector3( nx, ny, nz ) ) );
    //}
    //function uv(u1, v1, u2, v2, u3, v3) {
    //  scope.uvs.push( [ 
    //    new THREE.Vector2( u1, v1 ), 
    //    new THREE.Vector2( u2, v2 ), 
    //    new THREE.Vector2( u3, v3 ) 
    //  ]);
    //}
  }
  Model.prototype = new THREE.Geometry();
  Model.prototype.constructor = Model;
  return Model;
})());
EOF
  end
end

puts 'hallo'

UI.menu("File").add_item "Export to three.js" do
  filepath = UI.savepanel("Filename", nil, "#{Sketchup.active_model.title}.html")
  exporter = ThreeJSExporter.new filepath
  exporter.export
end
