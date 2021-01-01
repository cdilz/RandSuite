'use strict'

import CryptoRNG from '../../src/generator/cryptorng.js'
import loadedArray from '../../src/array/loadedArray.js'

let testArray = 
[
	{value:1, weight: 32},
	{value:2, weight: 0},
	{value:3, weight: 128},
	{value:4, weight: 16}
]

let gen = new CryptoRNG({bits:16})
let arng = new loadedArray(gen)

arng.push('a', 10)
arng.push('b', 15)
arng.push('c', 25)
arng.push('d', 108)
arng.push('e', 6)

console.log(arng.array)
console.log(arng.peek().value == 'e' && arng.peek().weight == 6)
let res = arng.pop()
console.log(res.value == 'e' && res.weight == 6)
console.log(arng.peek().value == 'd' && arng.peek().weight == 108)

arng.replace(1, 'car', 13)
console.log(arng.peek(1).value == 'car' && arng.peek(1).weight == 13)

arng.empty()
console.log(arng.array.length == 0)

arng.replaceArray(testArray)

console.log(arng.peek().value == 4 && arng.peek().weight == 3)

let results = 
{
	1:0,
	2:0,
	3:0,
	4:0
}
let runs = 10000
for(let i = 0; i < runs; i++)
{
	results[arng.random()]++
}
console.log(results)