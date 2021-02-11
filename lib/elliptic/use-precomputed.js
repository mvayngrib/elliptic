var curves = require('./curves');

function usePrecomputed(precomputed) {
  // validate input
  var names = Object.keys(precomputed);
  var invalid = names.filter(function(name) {
    if (!/^[a-z][a-z0-9]+$/i.test(name)) return true;
    return ({})[name] || !curves[name];
  });

  if (invalid.length) {
    throw new Error('invalid curves: ' + invalid.join(','));
  }

  // monkeypatch
  names.forEach(function(name) {
    if (!curves[name].g.precomputed) {
      curves[name].g = curves[name].curve.pointFromJSON(precomputed[name]);
    }
  });
}

module.exports = usePrecomputed;
