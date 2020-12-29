'use strict'

import CryptoRNG from '../../src/generator/crypto.js'
import ArrayRNG from '../../src/array/array.js'

let testArray = [1,2,3,4]

let gen = new CryptoRNG({bits:16})
let arng = new ArrayRNG(gen)

arng.push('a')
arng.push('b')
arng.push('c')
arng.push('d')
arng.push('e')

console.log(arng.array)
console.log(arng.peek() == 'e')
console.log(arng.pop() == 'e')
console.log(arng.peek() == 'd')

arng.replace(1, 'car')
console.log(arng.peek(1) == 'car')

arng.empty()
console.log(arng.array.length == 0)

arng.replaceArray(testArray)

console.log(arng.peek() == 4)

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