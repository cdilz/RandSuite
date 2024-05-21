'use strict'

import rng from '../../src/index.js'

let Gen = rng.GENERATOR.CRYPTO
let loadedArray = rng.ARRAY.LOADED

let testArray = 
[
	{value:1, weight: 32},
	{value:2, weight: 0},
	{value:3, weight: 128},
	{value:4, weight: 16}
]

let gen = new Gen({bits:16})
let arng = new loadedArray(gen)

arng.push('a', 10)
arng.push('b', 15)
arng.push('c', 25)
arng.push('d', 108)
arng.push('e', 6)

console.log(`Peek 'e', Weight 6: ${arng.peek().value === 'e' && arng.peek().weight === 6}`)
let res = arng.pop()
console.log(`Pop 'e', Weight 6: ${res.value === 'e' && res.weight === 6}`)
console.log(`Peek 'd', Weight 108: ${arng.peek().value === 'd' && arng.peek().weight === 108}`)

arng.replace(1, 'car', 13)
console.log(`Replace Peek 'car', Weight 13: ${arng.peek(1).value === 'car' && arng.peek(1).weight === 13}`)

arng.empty()
console.log(`Array Empty: ${arng.array.length === 0}`)

arng.replaceArray(testArray)

console.log(`Replace Array Peek 4, Weight 16: ${arng.peek().value === 4 && arng.peek().weight === 16}`)

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
console.log(`Random Results: ${JSON.stringify(results)}`)