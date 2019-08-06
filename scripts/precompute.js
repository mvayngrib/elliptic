#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const elliptic = require('..')
const outputDir = path.join(__dirname, '..', 'lib/elliptic/precomputed')

const prettify = (obj) => JSON.stringify(obj, null, 2)

const getCurvePath = (name) => path.join(outputDir, `${name}.json`)

const names = {
  ec: ['p192', 'p224', 'p256', 'p384', 'p521'],
  eddsa: ['ed25519'], // precomputed not exportable/importable at the moment
}

const ec = names.ec.map((name) => ({ name, curve: elliptic.ec(name) }))
const eddsa = names.eddsa.map((name) => ({ name, curve: elliptic.eddsa(name) }))

const eddsaToJSON = curve => {
  const toHex = ({ x, y, z }) => {
    return [x.fromRed().toString(16, 2), y.fromRed().toString(16, 2), z.fromRed().toString(16, 2)]
  }

  const { g } = curve
  return {
    doubles: g.precomputed.doubles && {
      step: g.precomputed.doubles.step,
      points: g.precomputed.doubles.points.slice(1).map(toHex),
    },
    naf: g.precomputed.naf && {
      wnd: g.precomputed.naf.wnd,
      points: g.precomputed.naf.points.slice(1).map(toHex),
    },
  }
}


ec.forEach(({ name, curve }) => {
  const precomputed = curve.g.toJSON()
  fs.writeFileSync(getCurvePath(name), prettify(precomputed))
})

eddsa.forEach(({ name, curve }) => {
  const precomputed = eddsaToJSON(curve)
  fs.writeFileSync(getCurvePath(name), prettify(precomputed))
})
