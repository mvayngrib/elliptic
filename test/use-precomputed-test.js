'use strict';

var assert = require('assert');
var BN = require('bn.js');
var utils = require('./utils');

describe('usePrecomputed', function() {
  var elliptic;
  var g;

  beforeEach(function() {
    utils.resetCache();
    elliptic = require('../');
    g = elliptic.curves.p256.g;
  });

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
});
