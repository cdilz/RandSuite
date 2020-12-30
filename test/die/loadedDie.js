'use strict'

import CryptoRNG from '../../src/generator/crypto.js'
import LoadedDie from '../../src/die/loadedDie.js'

let generator = new CryptoRNG({bits: 16})
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
	results[i+1n] = 0n
}

for(let i = 0; i < runs; i++)
{
	results[die.roll()]++
}

console.log(results)

console.log(die.rollAdd(20))
console.log(die.rollMultiply(20))
console.log(die.rollArray(20))