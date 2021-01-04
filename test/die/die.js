'use strict'

import rng from '../../src/index.js'

let Gen = rng.GENERATOR.CRYPTO
let Die = rng.DIE.BASE

let generator = new Gen({bits: 16})
let die = new Die(generator, 6)
let runs = 100000
let results = {}

for(let i = 0n; i < die.sides; i++)
{
	results[i+1n] = 0
}

for(let i = 0n; i < runs; i++)
{
	results[die.roll()]++
}

console.log(`Random Results: ${JSON.stringify(results)}`)

console.log(`Random Roll 20: ${die.rollAdd(20)}`)
console.log(`Random Multiply 20: ${die.rollMultiply(20)}`)
console.log(`Random Array 20: ` + die.rollArray(20))