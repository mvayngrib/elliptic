'use strict';

var assert = require('assert');
var BN = require('bn.js');
var elliptic = require('../');

describe('Curve', function() {
  it('should call precompute the first time', function() {
    var i = 0
    var g = elliptic.curves.p256.g

    // 1
    assert(g.precomputed == null, 'g.precomputed starts out null');

    elliptic.ec('p256');

    // 2
    assert(g.precomputed != null, 'curve init sets g.precomputed');

    delete g.precomputed

    elliptic.usePrecomputed({
      p256: require('../lib/elliptic/precomputed/p256')
    });

    // 3
    assert(g.precomputed != null, 'usePrecomputed sets g.precomputed');
  });
});
