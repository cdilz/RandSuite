'use strict'

import rng from '../../src/index.js'

let Gen = rng.GENERATOR.CRYPTO
let LoadedDie = rng.DIE.LOADED

let generator = new Gen({bits: 16})
let die = new LoadedDie(generator, 1327)

die.addSide(12)
die.addSide(15)
die.addSide(23)
die.addSide(120)
die.addSide(0)
die.addSide(14)


let runs = 100000
let results = {}

for(let i = 0n; i < die.sides; i++)
{
	results[i+1n] = 0
}

for(let i = 0; i < runs; i++)
{
	results[die.roll()]++
}

console.log(`Random Results: ${JSON.stringify(results)}`)

console.log(`Random Roll 20: ${die.rollAdd(20)}`)
console.log(`Random Multiply 20: ${die.rollMultiply(20)}`)
console.log(`Random Array 20: ` + die.rollArray(20))