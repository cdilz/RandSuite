'use strict'

import CryptoRNG from '../../src/generator/crypto.js'
import Die from '../../src/die/die.js'

let generator = new CryptoRNG({bits: 16})
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

console.log(results)

console.log(die.rollAdd(20))
console.log(die.rollMultiply(20))
console.log(die.rollArray(20))