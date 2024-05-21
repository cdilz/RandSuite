'use strict'

import rng from '../../src/index.js'

let Gen = rng.GENERATOR.CRYPTO
let ArrayRNG = rng.ARRAY.BASE


let testArray = [1,2,3,4]

let gen = new Gen({bits:16})
let arng = new ArrayRNG(gen)

arng.push('a')
arng.push('b')
arng.push('c')
arng.push('d')
arng.push('e')

console.log(`Peek 'e': ${arng.peek() === 'e'}`)
console.log(`Pop 'e': ${arng.pop() === 'e'}`)
console.log(`Peek 'd': ${arng.peek() === 'd'}`)

arng.replace(1, 'car')
console.log(`Replace Peek 'car': ${arng.peek(1) === 'car'}`)

arng.empty()
console.log(`Array Empty: ${arng.array.length === 0}`)

arng.replaceArray(testArray)

console.log(`Replace Array Peek 4: ${arng.peek() === 4}`)

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