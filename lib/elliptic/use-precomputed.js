var curves = require('./curves');

function setPrecomputedEDDSA(g, precomputed) {
  var pointFromJSON = g.curve.pointFromJSON.bind(g.curve);
  var doublesPoints = precomputed.doubles.points.map(pointFromJSON)
  var nafPoints = precomputed.naf.points.map(pointFromJSON)
  g.precomputed = {
    doubles: precomputed.doubles && {
      step: precomputed.doubles.step,
      points: [ g ].concat(doublesPoints)
    },
    naf: precomputed.naf && {
      wnd: precomputed.naf.wnd,
      points: [ g ].concat(nafPoints)
    }
  }
}

function usePrecomputed(precomputed) {
  // validate input
  var names = Object.keys(precomputed);
  var invalid = names.filter(function(name) {
    return !curves[name];
  });

  if (invalid.length) {
    throw new Error('invalid curves: ' + invalid.join(','));
  }

  // monkeypatch
  names.forEach(function(name) {
    if (!curves[name].g.precomputed) {
      if (name === 'ed25519') {
        var g = curves[name].g
        curves[name].g.precomputed = setPrecomputedEDDSA(g, precomputed[name])
      } else {
        curves[name].g.precomputed = precomputed[name];
      }
    }
  });
}

module.exports = usePrecomputed;
