'use strict'

import CryptoRNG from "../src/generator/crypto.js"

let a = new CryptoRNG()

console.log(a.float())
console.log(a.float(3))



/*
function makeMatrix(bits)
{
	let matrix = []
	for(let i = 0; i < bits; i++)
	{
		matrix.push('0'.repeat(bits).split(''))
	}
	let x = 0
	let y = 1

	//console.log(matrix)

	while(true)
	{
		matrix[y][x] = '1'
		x++
		y++

		if(y >= bits){break}
	}

	for(let i = 0; i < matrix.length; i++)
	{
		matrix[i] = BigInt('0b' + matrix[i].join(''))
	}

	console.log(matrix)
}

makeMatrix(32)
*/








/*
	n is bit size

	y is binary vector

	L is all 0's except for 1's on the principal subdiagonal. That is to say: the first diagonal under the one that starts at [0,0] and ends aqt [n,n]

	T = I + L^a


import {create, all} from 'mathjs'

const math = create(all, config)

const config = {}
// Makes L
function makeMatrix(bits)
{
	let output = math.zeros(bits, bits)

	let x = 0
	let y = 1

	while(true)
	{
		output.subset(math.index(y, x), 1)
		x++
		y++
		if(y >= bits) {break;}
	}

	console.log(output.toString())
}

makeMatrix(4)
*/









/*
import crypto from 'crypto'

console.log(crypto.randomInt((2**48) - 1))


let a = crypto.randomBytes(64)

function toBigInt(value)
{
	let output = undefined

	if(typeof value === typeof 0n)
	{
		output = value
	}
	else if(typeof value === typeof 0 || a instanceof Number)
	{
		output = value
	}
	else if(typeof value === typeof "" || value instanceof String)
	{
		let stringOutput = ''
		for(let i = 0; i < value.length; i++)
		{
			stringOutput += value.charCodeAt(i)
		}

		output = stringOutput
	}
	else if (value instanceof Buffer)
	{
		let stringOutput = ''

		let ts = []
		for(let i = 0; i < value.length; i++)
		{
			stringOutput += value[i]
			ts.push(value[i])
		}

		console.log(ts)
		output = stringOutput
	}

	output = BigInt(output)

	return fixBits(output)
}

function fixBits(value)
{
	return BigInt.asUintN(32, value)
}

console.log(a.toString())

console.log('\n\n\n')

console.log(toBigInt(a))
*/


/*
let max = 10000000

let even = 0
let odd = 0

function adjust(value)
{
	let stringVal = value.toString()
	// Remove the decimal point
	let output = stringVal.replace(/\./, '')

	// Remove the exponent
	let exponentIndex = output.search(/e/)
	if(exponentIndex > -1)
	{
		output = output.slice(0, exponentIndex)
	}
	return BigInt(output)
}

let test = () =>
{
	for(let i = 0; i < max; i++)
	{
		let ran = adjust(Math.random())
		let ranString = ran.toString()
		let final = ranString[ranString.length -1]
		if(final%2 == 0)
		{
			even++
		}
		else
		{
			odd++
		}
	}

	console.log(`even: ${even}`)
	console.log(`odd: ${odd}`)
}

test()
*/

/*
let max = 1000000000

let even = 0
let odd = 0

let test = () =>
{
	let output = 0
	for(let i = 0; i < max; i++)
	{
		let length = Math.random().toString().length
		output = Math.max(output, length)
	}

	return output
}

console.log(test())
*/