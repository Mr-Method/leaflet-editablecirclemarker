/*
 * Based in
 *   https://gist.github.com/glenrobertson/3630960
 *   https://github.com/Leaflet/Leaflet/blob/master/src/layer/marker/Marker.js
 *
 * */

var L = require('leaflet')

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
        if (this.options.icon) {
          markerOptions.icon = this.options.icon
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
        map.addLayer(this._marker);
        map.addLayer(this._circle);
        if ( this.options.draggable )
            this._marker.dragging.enable();
    },

    onRemove: function (map) {
        map.removeLayer(this._marker);
        map.removeLayer(this._circle);
    },

    getEvents: function () {
      return {
        zoom: this.updateMarker,
        viewreset: this.updateMarker
      };
    },

    updateMarker: function() {
      if (this._marker._icon && this._marker._map) {
        var pos = this._marker._map.latLngToLayerPoint(this._marker._latlng).round();
        this._marker._setPos(pos);
      }
      return this;
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
