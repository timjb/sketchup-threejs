class ThreeJSExporter
  def initialize(filepath)
    @filepath = filepath
    @model = Sketchup.active_model
    @entities = @model.active_entities
  end
  
  def export
    explode
    html = to_html
    File.open(@filepath, "w") {|file| file.write html }
    implode
  end
  
  private
  def title
    if @model.title.empty?
      "Untitled"
    else
      @model.title
    end
  end
  
  def explode
    @explosions = 0
    @model.definitions.each do |definition|
      definition.instances.each do |instance|
        @explosions += 1
        instance.explode
      end
    end
  end
  
  def implode
    @explosions.times do
      Sketchup.undo
    end
  end
  
  def faces
    faces = @entities.select {|entity| entity.is_a? Sketchup::Face }
    faces
  end
  
  def meshes
    faces.map {|face| face.mesh }
  end
  
  def polygons
    if not @polygons_cache
      @polygons_cache = meshes.inject([]) do |polygons, mesh|
        mesh.polygons.each do |polygon|
          polygons.push polygon.map {|point_nr| mesh.point_at(point_nr.abs) }
        end
        polygons
      end
    end
    @polygons_cache
  end
  
  def points
    if not @points_cache
      @points_cache = polygons.inject([]) do |points, polygon|
        points.concat polygon
      end.uniq
    end
    @points_cache
  end
  
  def triangles
    polygons.map do |polygon|
      polygon.map {|point| points.index point }
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
    <title>#{title}</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <style>
      #{load_asset "style.css"}
    </style>
  </head>
  <body>
    <div id="overlay">
      <h1>#{title}</h1>
    </div>
    #{to_html_snippet}
  </body>
</html>
EOF
  end
  
  def to_html_snippet
    return <<EOF
<div id="container"></div>
<script>
  #{load_asset "three.js"}
  #{load_asset "scene.js"}
  render(#{to_js});
</script>
EOF
  end
  
  def to_js
    return <<EOF
(function() {
  function Model() {
    THREE.Geometry.call(this);
    var self = this;
    
    function each(arr, fn) {
      for(var i = 0, l = arr.length; i < l; i++) {
        fn(arr[i], i);
      }
    }
    
    each([#{points.map {|p| "[" + [p.x, p.y, p.z].map {|l| "%.6f" % l.to_f }.join(",") + "]" }.join(',')}], function(point) {
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
  Model.bounds = { width: #{@model.bounds.width.to_f}, height: #{@model.bounds.height.to_f}, depth: #{@model.bounds.depth.to_f} };
  
  window["#{title.gsub("\\", "\\\\").gsub('"', '\"').gsub(/\s/, "_").gsub(/[^A-Za-z1-9-_]/, '')}"] = Model;
  return Model;
})()
EOF
  end
end

UI.menu("File").add_item "Export to three.js" do
  title = Sketchup.active_model.title
  title = "Unnamed" if title.empty?
  filepath = UI.savepanel("Filename", nil, title + ".html")
  if not filepath.nil?
    exporter = ThreeJSExporter.new filepath
    exporter.export
  end
end
