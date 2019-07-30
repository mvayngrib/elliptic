var curves = require('./curves');

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
      curves[name].g.precomputed = precomputed[name];
    }
  });
}

module.exports = usePrecomputed;
