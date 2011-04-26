require 'sketchup.rb'
require 'extensions.rb'
#require 'LangHandler.rb'

export_threejs_extension = SketchupExtension.new "Export to Three.js", "export_threejs/main.rb"
export_threejs_extension.creator = "Tim Baumann"
export_threejs_extension.version = "0.0.1"
export_threejs_extension.copyright = "MIT License"
export_threejs_extension.description = "Export your models to a webpage. You can freely rotate them in all directions."
Sketchup.register_extension export_threejs_extension, true
