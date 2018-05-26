/* global describe, it, before */
var fs = require('fs')
require('should')
var jsdom = require('mocha-jsdom')
var L = require('leaflet-headless')

var ll = L.latLng(10.10, 15.15);
var rad = 200;

describe('basic usage', function () {
  jsdom()

  before(function () {
    this.editablecirclemarker = require('../leaflet.editableCircleMarker')
    this.layer = this.editablecirclemarker(ll, rad);
    // console.log(require('util').inspect(this.layer.options, {colors: true, depth: 2}))
  })

  it('returns a correct object', function () {
    this.layer.should.have.property('_latlng')
    this.layer.getLatLng().should.be.eql(ll)
    this.layer.getRadius().should.be.eql(rad)
  })

})
