# Leaflet editable Circle Marker [![Build Status](https://travis-ci.org/cualbondi/leaflet-editablecirclemarker.svg)](https://travis-ci.org/cualbondi/leaflet-editablecirclemarker)

Combined marker with a circle below component plugin for Leaflet that behaves as a L.marker.

## Usage
```javascript
options.className = 'string' // for the divicon
options.draggable = boolean  // allow/dissallow draggable
options.popup = L.Popup      // set a popup that gets open on marker click
options.* = L.circle options // the rest of the options are for the L.circle

// creation
var ecm = L.editableCircleMarker(latlng, radius, options)
ecm.addTo(map)

// API
ecm.getBounds()

ecm.getRadius()
ecm.setRadius(number)

ecm.getLatLng()
ecm.setLatLng(latlng)

ecm.getCircleOptions()
ecm.setCircleStyle(style)

// events
ecm.on('movestart', function(e) { console.log(e) })
ecm.on('move',      function(e) { console.log(e) })  // event data = { oldLatLng: L.latlng, latlng: L.latlng }
ecm.on('moveend',   function(e) { console.log(e) })
```

## Installation
* via NPM: `npm install leaflet-editablecirclemarker`
* via yarn: `yarn add leaflet-editablecirclemarker`

Include `dist/editablecirclemarker.js` on your page after Leaflet:
```html
<script src="path/to/leaflet.js"></script>
<script src="path/to/editablecirclemarker.js"></script>
```
Or, if using via CommonJS (Browserify, Webpack, etc.):
```javascript
var L = require('leaflet')
require('leaflet-editablecirclemarker')
```

## Development
This project uses [webpack](http://webpack.github.io/) to build the JavaScript and 
[standard](https://github.com/feross/standard) for code style linting.

* While developing, use `npm run watch` to automatically rebuild when files are saved
* Use `npm test` to run unit tests and code style linter
* Before committing `dist/`, use `npm run build` to optimize and minify for production use
