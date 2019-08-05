'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('assert');
var BN = require('bn.js');
var utils = require('./utils');

describe('usePrecomputed', function() {
  var elliptic;
  var g;

  function reset() {
    utils.resetCache();
    elliptic = require('../');
    g = elliptic.curves.p256.g;
  }

  beforeEach(reset);

  it('should set g.precomputed on regular curve init', function() {
    assert(g.precomputed == null, 'g.precomputed starts out null');

    elliptic.ec('p256');

    assert(g.precomputed != null, 'curve init sets g.precomputed');
  });

  it('should set g.precomputed via usePrecomputed', function() {
    assert(g.precomputed == null, 'g.precomputed stars out null');

    elliptic.usePrecomputed({
      p256: require('../lib/elliptic/precomputed/p256')
    });

    assert(g.precomputed != null, 'usePrecomputed sets g.precomputed');
  });

  it('precomputed curves have been calculated correctly', function() {
    this.timeout(5000);

    var dir = path.join(__dirname, '..', 'lib/elliptic/precomputed')

    fs.readdirSync(dir)
      .filter(function (file) {
        return path.extname(file) === '.json'
      })
      .forEach(function (file) {
        var name = path.parse(file).name;
        console.log('comparing', name)
        var precomputed = require(path.join(dir, file));
        var curve = elliptic.ec(name);
        var computed = JSON.parse(JSON.stringify(curve.g.toJSON()));
        var compare = assert.deepStrictEqual || assert.deepEqual;
        compare(
          computed,
          precomputed,
          name + ' curve matches precomputed'
        );
      });
  });
});
