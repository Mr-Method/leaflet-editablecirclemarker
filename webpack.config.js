module.exports = {
  entry: './leaflet.editableCircleMarker.js',
  output: {
    path: __dirname + '/dist',
    filename: 'editablecirclemarker.js'
  },
  externals: {
    'leaflet': 'L'
  }
}