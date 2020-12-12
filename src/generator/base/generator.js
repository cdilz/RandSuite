'use strict'

import crypto from 'crypto'

class Generator
{
	get min() {return 0n}
	get max() {return (2n ** BigInt(this.bits)) - 1n}

	constructor(args)
	{
		this.bits = args.bits || 128
		this.seed = this.fixSeed(args.seed)
	}

	/*
	constructor(seed, bits = 128)
	{
		console.log(this)
		console.log(arguments)

		this.bits = bits
		this.seed = this.fixSeed(seed)
	}
	*/

	fixSeed(seed)
	{
		if(typeof seed == typeof undefined)
		{
			seed = this.randSeed()
		}
		seed = this.toBigInt(seed)
		return seed === 0n ? this.max : seed
	}

	randSeed(seedLength = 64)
	{
		let seed = crypto.randomBytes(seedLength)

		return seed
	}

	splitSeed(seed, count)
	{
		let seedString = this.seed.toString()
		let splitLength = Math.floor(seedString.length / count)
		let outArray = []

		let slice = (start, length) =>
		{
			return this.fixBits(BigInt(seedString.substr(start, length)))
		}

		if(splitLength == 0)
		{
			for(let i = 0; i < count; i++)
			{
				outArray.push(seed)
			}
		}
		else
		{
			for(let i = 0; i < count - 1; i++)
			{
				outArray.push(slice(splitLength * i, splitLength))
			}

			outArray.push(slice(splitLength * (count-1)))
		}

		return outArray
	}

	fixBits(value)
	{
		return BigInt.asUintN(this.bits, value)
	}

	toBigInt(value)
	{
		let output = undefined
	
		if(typeof value === typeof 0n)
		{
			output = value
		}
		else if(typeof value === typeof 0 || value instanceof Number)
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
			for(let i = 0; i < value.length; i++)
			{
				stringOutput += value[i].toString()
			}
	
			output = stringOutput
		}
	
		output = BigInt(output)
	
		return this.fixBits(output)
	}

	// Flips the binary value so the rightmost bedcomes the leftmost
	reverseBits(value)
	{
		//let reversed = []
		let valStr = value.toString(2)
		let bVal = valStr.padStart(this.bits, '0')

		let reversed = ''

		for(const char of bVal)
		{
			reversed = char + reversed
		}

		return this.fixBits(BigInt('0b' + reversed))
	}

	random()
	{
		return -1n
	}
}

export default Generator