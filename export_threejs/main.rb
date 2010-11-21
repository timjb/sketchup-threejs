module ExportThreeJS
  TMP_DIR = File.join(File.dirname(__FILE__), 'tmp')
  DEBUG = true
  
  class ::Array
    def to_js
      '[' + self.map do |item|
        if item.respond_to? :to_js
          item.to_js
        else
          item
        end
      end.join(',') + ']'
    end
  end
  
  class ::NilClass
    def to_js
      "null"
    end
  end
  
  class ::Float
    def to_js
      "%.6f" % self
    end
  end
  
  class ::Length
    def to_js
       to_f.to_js
    end
  end
  
  class Sketchup::Model
    def title_or_untitled
      if title.empty?
        "Untitled"
      else
        title
      end
    end
  end
  
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
      props[:opacity] = self.alpha
      "new THREE.MeshBasicMaterial({" + props.to_a.map {|kv_pair| kv_pair.join ": " }.join(", ") + "})"
    end
  end
  
  module PointToJS
    def to_js
      to_a.to_js
    end
  end
  
  class Geom::Point3d
    include PointToJS
  end
  
  class Geom::Vector3d
    include PointToJS
  end
  
  class ThreeJSModel
    def initialize identifier, bounds
      @identifier = identifier
      @bounds = bounds
      @points = []
      @faces = []
      @materials = []
      @uvs = []
    end
    
    def add_face face
      mesh = face.mesh 7
      
      # Handle points
      point_indices = mesh.points.map do |point|
        index = @points.index(point)
        unless index.nil?
          index
        else
          @points.push point
          @points.size - 1
        end
      end
      
      # Handle material
      material = face.material
      material_index = @materials.index material
      if material_index.nil?
        if !material.nil? and material.texture
          tw = Sketchup.create_texture_writer
          tw.load face, true
          tw.write face, true, File.join(TMP_DIR, material.texture.filename)
        end
        @materials.push material
        material_index = @materials.size - 1
      end
      
      # Handle faces
      mesh.polygons.each do |poly|
        @faces.push(poly.map {|point_nr| point_indices[point_nr.abs-1] } + [material_index])
        
        # Handle UV
        if !material.nil? and material.texture
          @uvs.push(poly.map do |p_nr|
            p = mesh.uv_at(p_nr, true)
            [[0, [1, p.x].min].max, [0, [1, 1-p.y].min].max] # Some p.x and p.y values are <0 or >1 for any reason. The texture is flipped vertically in three.js.
          end)
        else
          @uvs.push nil
        end
      end
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
    
    each(#{@points.map {|p| p - @bounds.center }.to_js}, function(point) {
      self.vertices.push(new THREE.Vertex(new THREE.Vector3(point[0], point[1], point[2])));
    });
    
    var materials = #{@materials.to_js};
    
    each(#{@faces.to_js}, function(triangle) {
      self.faces.push(new THREE.Face3(triangle[0], triangle[1], triangle[2], undefined, materials[triangle[3]]));
    });
    
    each(#{@uvs.to_js}, function(uvs) {
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
  Model.bounds = { width: #{@bounds.width.to_f}, height: #{@bounds.height.to_f}, depth: #{@bounds.depth.to_f} };
  
  window["#{@identifier}"] = Model;
  return Model;
})()
EOF
    end
  end
  
  class ThreeJSExporter
    def initialize(filepath, only_selection)
      @filepath = filepath
      @only_selection = only_selection
      @model = Sketchup.active_model
      @entities = if @only_selection
        @model.selection
      else
        @model.active_entities
      end
    end
    
    def export
      explode
      make_tmp_dir
      
      @three_js_model = ThreeJSModel.new(@model.title_or_untitled.gsub("\\", "\\\\").gsub('"', '\"').gsub(/\s/, "_").gsub(/[^A-Za-z1-9-_]/, ''), @model.bounds)
      add_faces
      html = to_html
      File.open(@filepath, "w") {|file| file.write html }
    ensure
      rm_tmp_dir
      implode
    end
    
    private
    
    def make_tmp_dir
      unless File.directory?(TMP_DIR)
        Dir.mkdir(TMP_DIR)
      end
    end
    
    def rm_tmp_dir
      if File.directory?(TMP_DIR)
        files = Dir.glob(TMP_DIR + "/*")
        files.each do |file|
          File.delete file
        end
        Dir.rmdir(TMP_DIR)
      end
    end
    
    def explode
      @explosions = 0
      
      exploded = true
      while exploded
        exploded = false
        @entities.each do |entity|
          if entity.respond_to? :explode
            ents = entity.explode
            @explosions += 1
            exploded = true
            if @only_selection
              ents.each do |ent|
                begin
                  @entities.add ent
                rescue TypeError
                end
              end
            end
          end
        end
      end
    end
    
    def implode
      @explosions.times do
        Sketchup.undo
      end
    end
    
    def add_faces
      @entities.each do |entity|
        if entity.is_a? Sketchup::Face
          @three_js_model.add_face entity
        end
      end
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
    <title>#{@model.title_or_untitled}</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <style>
      #{load_asset "style.css"}
    </style>
  </head>
  <body>
    <div id="overlay">
      <h1>#{@model.title_or_untitled}</h1>
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
  render(#{@three_js_model.to_js});
</script>
EOF
    end
  end
  
  UI.menu("File").add_item "Export to three.js" do
    filepath = UI.savepanel("Filename", nil, Sketchup.active_model.title_or_untitled + ".html")
    if not filepath.nil?
      exporter = ThreeJSExporter.new filepath, false
      exporter.export
    end
  end
end
