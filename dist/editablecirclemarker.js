/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = L;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Based in
 *   https://gist.github.com/glenrobertson/3630960
 *   https://github.com/Leaflet/Leaflet/blob/master/src/layer/marker/Marker.js
 *
 * */

var L = __webpack_require__(0)

L.EditableCircleMarker = L.Layer.extend({
    includes: L.Evented,

    options: {
        weight: 1,
        clickable: false,
        draggable: true
    },

    initialize: function (latlng, radius, options) {
        options = options || {};
        L.Util.setOptions(this, options);
        this._latlng = L.latLng(latlng);
        this._radius = radius;

        var markerOptions = {}
        if (this.options.className) {
          markerOptions.icon = new L.DivIcon({
            className: this.options.className
          })
        }
        markerOptions.draggable = this.options.draggable

        this._marker = new L.Marker(latlng, markerOptions);

        if ( this.options.popup ) {
            this._marker.bindPopup(this.options.popup);
        }

        this._circle = new L.Circle(latlng, radius, this.options);

        // move circle when marker is dragged
        var self = this;
        this._marker.on('movestart', function() {
            self.fire('movestart');
        });
        this._marker.on('move', function(latlng) {
            var oldLatLng = self._latlng;
            self._latlng = this._latlng;
            self._circle.setLatLng(self._latlng);
            return self.fire('move', { oldLatLng: oldLatLng, latlng: self._latlng });
        });
        this._marker.on('moveend', function() {
            self._marker.setLatLng(this._latlng);
            self.fire('moveend');
        });
    },

    onAdd: function (map) {
        this._map = map;
        this._marker._map = map
        this._marker.onAdd(map);
        this._circle._map = map
        this._circle.beforeAdd(map);
        this._circle.onAdd(map);
        if ( this.options.draggable )
            this._marker.dragging.enable();
        this.fire('loaded');
    },

    onRemove: function (map) {
        this._marker.onRemove(map);
        this._circle.onRemove(map);
        this.fire('unloaded');
    },

    getBounds: function() {
        return this._circle.getBounds();
    },

    getLatLng: function () {
        return this._latlng;
    },

    setLatLng: function (latlng) {
        this._marker.fire('movestart');
        this._latlng = L.latLng(latlng);
        this._marker.setLatLng(this._latlng);
        this._circle.setLatLng(this._latlng);
        this._marker.fire('moveend');
    },

    getRadius: function () {
        return this._radius;
    },

    setRadius: function (meters) {
        //this._marker.fire('movestart');
        this._radius = meters;
        this._circle.setRadius(meters);
        //this._marker.fire('moveend');
    },

    getCircleOptions: function () {
        return this._circle.options;
    },

    setCircleStyle: function (style) {
        this._circle.setStyle(style);
    },

});

L.editableCircleMarker = module.exports = function (latlng, radius, options) {
    return new L.EditableCircleMarker(latlng, radius, options);
};


/***/ })
/******/ ]);