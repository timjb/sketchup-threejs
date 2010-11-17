module ExportThreeJS
  TMP_DIR = File.join(File.dirname(__FILE__), 'tmp')
  DEBUG = false
  
  class Sketchup::Texture
    def to_data_url
      type = case File.extname(self.filename).downcase
        when ".png"; "image/png"
        when ".jpg", ".jpeg"; "image/jpeg"
        when ".tiff"; "image/tiff"
        when ".gif"; "image/gif"
      end
      content = [File.open(File.join(TMP_DIR, self.filename), "rb").read].pack("m").gsub("\n", '')
      "data:#{type};base64,#{content}"
    end
  end
  
  class Sketchup::Color
    def to_hex
      self.to_a[0..2].map {|n| "%02x" % n}.join
    end
  end
  
  class Sketchup::Material
    def to_js
      props = {}
      if self.materialType == 0 or self.materialType == 2
        props[:color] = "0x" + self.color.to_hex
      end
      if self.materialType == 1 or self.materialType == 2
        props[:map] = 'new THREE.Texture((function() { var img = new Image(); img.src="' + self.texture.to_data_url + '"; return img; })(), THREE.UVMapping)'
      end
      #if self.use_alpha?
        props[:opacity] = self.alpha
      #end
      "new THREE.MeshBasicMaterial({" + props.to_a.map {|kv_pair| kv_pair.join ": " }.join(", ") + "})"
    end
  end
  
  module PointToJS
    def to_js
      "[" + [self.x, self.y, self.z].map {|l| "%.6f" % l.to_f }.join(",") + "]"
    end
  end
  
  class Geom::Point3d
    include PointToJS
  end
  
  class Geom::Vector3d
    include PointToJS
  end
  
  class ThreeJSExporter
    def initialize(filepath)
      @filepath = filepath
      @model = Sketchup.active_model
      @entities = @model.active_entities
    end
    
    def export
      explode
      make_tmp_dir
      html = to_html
      File.open(@filepath, "w") {|file| file.write html }
      #uvs
    ensure
      rm_tmp_dir
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
    
    def make_tmp_dir
      unless File.directory?(TMP_DIR)
        Dir.mkdir(TMP_DIR)
      end
    end
    
    def rm_tmp_dir
      files = Dir.glob(TMP_DIR + "/*")
      files.each do |file|
        File.delete file
      end
      Dir.rmdir(TMP_DIR)
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
      @entities.select {|entity| entity.is_a? Sketchup::Face }.map {|face| { :face => face} }
    end
    
    def meshes
      unless @mashes_cache
        @mashes_cache = faces.each {|dict| dict[:mesh] = dict[:face].mesh 7 }
      end
      @mashes_cache
    end
    
    def points
      unless @points_cache
        @points_cache = meshes.inject([]) do |points, dict|
          points.concat dict[:mesh].points
        end.uniq
      end
      @points_cache
    end
    
    def triangles
      meshes.inject([]) do |triangles, dict|
        mesh = dict[:mesh]
        material_nr = materials.index dict[:face].material
        triangles.concat(mesh.polygons.map do |poly|
          poly.map {|point_nr| points.index mesh.point_at(point_nr) } + [material_nr]
        end)
      end
    end
    
    def materials
      meshes.inject([]) do |mats, dict|
        face = dict[:face]
        material = face.material
        unless material.nil? or mats.include?(material)
          if material.texture
            tw = Sketchup.create_texture_writer
            tw.load face, true
            tw.write face, true, File.join(TMP_DIR, material.texture.filename)
          end
          mats << material
        end
        mats
      end
    end
    
    def uvs
      all_faces = meshes.inject([]) do |all, dict|
        all.concat dict[:mesh].polygons
      end
      result = []
      meshes.each do |dict|
        face = dict[:face]
        mesh = dict[:mesh]
        if face.material and face.material.texture
          mesh.polygons.each do |poly|
            result.push(poly.map do |p_nr|
              p = mesh.uv_at(p_nr, true)
              Geom::Point3d.new([0, [1, p.x].min].max, [0, [1, 1-p.y].min].max, p.z) # Some p.x and p.y values are <0 or >1 for any reason. The texture is flipped vertically in three.js.
            end)
          end
        else
          result.concat([nil] * mesh.count_polygons)
        end
      end
      result
    end
    
    def center
      @model.bounds.center
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
  #{load_asset(DEBUG ? "three_debug.js" : "three.js")}
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
    
    each([#{points.map {|p| (p - center).to_js }.join(',')}], function(point) {
      self.vertices.push(new THREE.Vertex(new THREE.Vector3(point[0], point[1], point[2])));
    });
    
    var materials = [#{materials.map {|m| m.to_js }.join(",")}];
    
    each([#{triangles.map {|t|"[#{t.join ','}]"}.join(',')}], function(triangle) {
      self.faces.push(new THREE.Face3(triangle[0], triangle[1], triangle[2], undefined, materials[triangle[3]]));
    });
    
    each([#{uvs.map do |uvs2|
      if uvs2.nil?
        "null"
      else
        "[" + uvs2.map do |p|
          "[" + [p.x, p.y].map {|l| "%.6f" % l }.join(",") + "]"
        end.join(",") + "]"
      end
    end.join(",")}], function(uvs) {
      self.uvs.push(uvs == null ? uvs : [
        new THREE.UV(uvs[0][0], uvs[0][1]),
        new THREE.UV(uvs[1][0], uvs[1][1]),
        new THREE.UV(uvs[2][0], uvs[2][1])
      ]);
    });
    
    this.computeCentroids();
    this.computeNormals();
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
end
