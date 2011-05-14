module ExportThreeJS
  TMP_DIR = File.join(File.dirname(__FILE__), 'tmp')

  class Sketchup::Model
    def title_or_untitled
      if title.empty?
        "Untitled"
      else
        title
      end
    end
  end

  # to_3js -- Convert Ruby objects into strings of JavaScript code

  class ::Object;   def to_3js; self.to_s;     end; end
  class ::NilClass; def to_3js; 'null';        end; end
  class ::Float;    def to_3js; "%.6f" % self; end; end
  class ::Length;   def to_3js; to_f.to_3js;   end; end

  class Geom::Point3d
    def to_3js
      "new THREE.Vertex(new THREE.Vector3(#{x.to_3js},#{y.to_3js},#{z.to_3js}))"
    end
  end

  class Geom::Vector3d
    def to_3js
      "new THREE.Vector3(#{x.to_3js}, #{y.to_3js}, #{z.to_3js})"
    end
  end

  class ::Array
    def to_3js
      '[' + self.map { |i| i.to_3js }.join(',') + ']'
    end
  end

  class ::Hash
    def to_3js
      '{' + self.to_a.map do |kv|
        kv[0].to_s + ':' + kv[1].to_3js
      end.join(',') + '}'
    end
  end

  class Sketchup::Texture
    def to_data_url
      type = case File.extname(self.filename).downcase
        when ".png";          "image/png"
        when ".jpg", ".jpeg"; "image/jpeg"
        when ".tiff";         "image/tiff"
        when ".gif";          "image/gif"
      end
      content = File.open(File.join(TMP_DIR, self.filename), "rb").read
      base64 = [content].pack("m").gsub("\n", '')
      "data:#{type};base64,#{base64}"
    end
  end

  class Sketchup::Color
    def to_hex
      self.to_a[0..2].map {|n| "%02x" % n}.join
    end
  end

  class Sketchup::Material
    def to_3js
      props = {}
      if self.materialType == 0 or self.materialType == 2
        props[:color] = "0x" + self.color.to_hex
      end
      if self.materialType == 1 or self.materialType == 2
        props[:map] = <<EOF
new THREE.Texture((function(img) {
  img.src = "#{self.texture.to_data_url}";
  return img;
})(new Image()), THREE.UVMapping)'
EOF
      end
      props[:opacity] = self.alpha
      "new THREE.MeshBasicMaterial(#{props.to_3js})"
    end
  end


  class ThreeJSModel
    def initialize identifier, bounds, view
      @identifier = identifier
      @bounds = bounds
      @view   = view
      @points = []
      @faces  = []
      @materials = []
      @uvs = []
    end
    
    def add_face face
      mesh = face.mesh 7
      
      # Handle points
      point_indices = mesh.points.map do |point|
        index = @points.index(point) # This sucks performance-wise!!!!!
        unless index.nil?
          index
        else
          @points.push point
          @points.size - 1
        end
      end
      
      # Handle materials, polygons and UVs
      handle_side face, mesh, point_indices, true
      handle_side face, mesh, point_indices, false
    end

    def to_3js
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
    
    // Points
    this.vertices = #{@points.to_3js};
    
    var materials = #{@materials.to_3js};
    
    // Faces
    each(#{@faces.to_3js}, function(triangle) {
      self.faces.push(new THREE.Face3(
        triangle[0],
        triangle[1],
        triangle[2],
        null,
        null,
        materials[triangle[3]]
      ));
    });
    
    // UVs
    each(#{@uvs.to_3js}, function(uvs) {
      self.faceUvs.push(uvs == null ? uvs : [
        new THREE.UV(uvs[0][0], uvs[0][1]),
        new THREE.UV(uvs[1][0], uvs[1][1]),
        new THREE.UV(uvs[2][0], uvs[2][1])
      ]);
    });
    
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals();
  }
  Model.prototype = new THREE.Geometry();
  Model.prototype.constructor = Model;
  Model.bounds = {
    width:  #{@bounds.width.to_3js},
    height: #{@bounds.height.to_3js},
    depth:  #{@bounds.depth.to_3js}
  };
  
  Model.camera = {
    position:       #{@view.camera.eye.to_3js}.position,
    targetPosition: #{@view.guess_target.to_3js}.position
  };
  
  window["#{@identifier}"] = Model;
  return Model;
})()
EOF
    end

    private

    def handle_side face, mesh, point_indices, front
      material = front ? face.material : face.back_material
      
      unless material.nil?
        material_index = @materials.index material
        if material_index.nil?
          if material.texture
            tw = Sketchup.create_texture_writer
            tw.load face, front
            tw.write face, front, File.join(TMP_DIR, material.texture.filename)
          end
          @materials.push material
          material_index = @materials.size - 1
        end
        
        mesh.polygons.each do |poly|
          poly[0], poly[1] = poly[1], poly[0] unless front
          @faces.push(poly.map do |point_nr|
            point_indices[point_nr.abs-1]
          end + [material_index])
          
          # Handle UV
          if material.texture
            @uvs.push(poly.map do |p_nr|
              p = mesh.uv_at(p_nr, front)
              # Some p.x and p.y values are <0 or >1 for any reason.
              # The texture is flipped vertically in Three.js.
              [[0, [1, p.x].min].max, [0, [1, 1-p.y].min].max]
            end)
          else
            @uvs.push nil
          end
        end
      end
    end
  end

  class ThreeJSExporter
    def initialize(filepath, type, only_selection)
      @filepath       = filepath
      @type           = type
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
      
      identifier = @model.title_or_untitled.gsub("\\", "\\\\") \
        .gsub('"', '\"').gsub(/\s/, "_").gsub(/[^A-Za-z1-9-_]/, '')
      @three_js_model = ThreeJSModel.new(identifier, @model.bounds, @model.active_view)
      add_faces
      content = (@type == :js) ? to_3js+';' : to_html
      File.open(@filepath, "w") {|file| file.write content }
    ensure
      rm_tmp_dir
      implode
    end

    private

    def make_tmp_dir
      Dir.mkdir TMP_DIR unless File.directory? TMP_DIR
    end

    def rm_tmp_dir
      if File.directory? TMP_DIR
        files = Dir.glob(TMP_DIR + "/*")
        files.each {|file| File.delete file }
        Dir.rmdir(TMP_DIR)
      end
    end

    # TODO: refactor
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
      @explosions.times { Sketchup.undo }
    end

    def add_faces
      @entities.each do |entity|
        @three_js_model.add_face entity if entity.is_a? Sketchup::Face
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
    <meta charset="utf-8" />
    <title>#{@model.title_or_untitled}</title>
    <meta name="viewport" content="width=device-width" /><!-- iPhone -->
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
  #{load_asset("Three.js")}
  #{load_asset "scene.js"}
  render(#{to_3js});
</script>
EOF
    end

    def to_3js
      @three_js_model.to_3js
    end
  end

  UI.menu("File").add_item "Export to Three.js" do
    dialog = UI::WebDialog.new "Export to Three.js", false
    dialog.set_file 'dialog.html', __FILE__
    dialog.set_on_close do
      type = dialog.get_element_value('type').to_sym
      filepath = UI.savepanel(
        "Filename",
        nil,
        Sketchup.active_model.title_or_untitled + ".#{type.to_s}")
      unless filepath.nil?
        ThreeJSExporter.new(filepath, type, false).export
      end
    end
    dialog.show_modal
  end

  test_export_dir = "#{Sketchup.find_support_file 'plugins'}/test_export_threejs"
  Dir.mkdir test_export_dir unless File.directory? test_export_dir
  UI.menu("Plugins").add_item "Test exporting to Three.js" do
    start_time = Time.now.to_f
    Dir[Sketchup.template_dir + '/*.skp'].each do |template_path|
      if Sketchup.open_file template_path
        basename = File.basename template_path, '.skp'
        export_path = "#{test_export_dir}/#{basename}.html"
        ThreeJSExporter.new(export_path, :html, false).export
      end
    end
    UI.messagebox "Time needed: #{Time.now.to_f - start_time}s"
  end
end
