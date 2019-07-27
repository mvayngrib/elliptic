const elliptic = require('.')

elliptic.curves.p192.g.precomputed = require('./lib/elliptic/precomputed/p192')
elliptic.curves.p224.g.precomputed = require('./lib/elliptic/precomputed/p224')
elliptic.curves.p256.g.precomputed = require('./lib/elliptic/precomputed/p256')
elliptic.curves.p384.g.precomputed = require('./lib/elliptic/precomputed/p384')
elliptic.curves.p521.g.precomputed = require('./lib/elliptic/precomputed/p521')

require('./test')
