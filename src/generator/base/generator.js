'use strict'

import crypto from 'crypto'

/**
 * Represents a random number generator. To be used as a superclass only.
 *  
 * @param {Object} [args] - Contains the number of bits for the generator and the seed.
 * @param {Number} [args.bits=128] - The maximal number of bits the random number can be.
 * @param {BigInt|Number|String|Buffer} [args.seed] - The seed for the random number generator. (May be ignored)
 */

export default class Generator
{
	/**
	 * Minimum value for RNG based on bits.
	 * 
	 * @type {BigInt}
	 */
	get min() {return 0n}

	/**
	 * Maximum value of RNG based on bits: (2^this.bits) - 1.
	 * 
	 * @type {BigInt}
	 */
	get max() {return (2n ** BigInt(this.bits)) - 1n}

	constructor(args)
	{
		if(typeof args == typeof undefined)
		{
			args = 
			{
				bits: 128
			}
		}

		if(typeof args.bits != typeof 0)
		{
			args.bits = 128
		}
		this.bits = args.bits
		if(typeof args.seed == typeof undefined)
		{
			args.seed = this.randSeed()
		}

		this.originalSeed = args.seed
		this.seed = this.fixSeed(args.seed)
	}

	/**
	 * Simulates a left shift to a BigInt. When left shifting a BigInt it doesn't lose its leftmost bits, so we have to do that ourselves.
	 * 
	 * @param {BigInt} value - The value to shift.
	 * @param {BigInt} amount - The amount to shift.
	 * @param {Number} [bits=this.bits] - The number of bits value should be.
	 * 
	 * @returns {BigInt} - The number left shifted.
	 */
	leftShift(value, amount, bits = this.bits)
	{
		let shifted = value << amount
		let shiftedString = shifted.toString(2)
		if(shiftedString.length > bits)
		{
			shiftedString = shiftedString.slice(-bits)
			shiftedString = '0b' + shiftedString
			shifted = BigInt(shiftedString)
		}
		return shifted
	}

	/**
	 * Coerces the seed into a BigInt and ensures it's not equivalent to 0.
	 * 
	 * @param {BigInt|Number|String|Buffer} [seed] - If not entered, a random seed will be generated.
	 * 
	 * @returns {BigInt}
	 */
	fixSeed(seed)
	{
		seed = this.toBigInt(seed)
		return seed === 0n ? this.max : seed
	}

	/**
	 * Generates a random seed by getting random bytes from Crypto.
	 * 
	 * @param {Number} seedLength - Length of the seed to generate.
	 * 
	 * @returns {BigInt}
	 */
	randSeed(seedLength = 64)
	{
		let seed = crypto.randomBytes(seedLength)
		seed = this.toBigInt(seed)

		return seed
	}

	/**
	 * Splits a seed into multiple parts
	 * 
	 * @param {Number} [count=1] - Number of splits to make
	 * 
	 * @returns {BigInt[]}
	 */
	splitSeed(count = 1)
	{
		let seedString = this.originalSeed.toString()
		let splitLength = Math.floor(seedString.length / count)
		let outArray = []

		let slice = (start, length) =>
		{
			return this.toBigInt(seedString.substr(start, length))
		}

		if(splitLength == 0)
		{
			for(let i = 0; i < count; i++)
			{
				outArray.push(this.fixSeed(this.seed))
			}
		}
		else
		{
			for(let i = 0; i < count - 1; i++)
			{
				outArray.push(this.fixSeed(slice(splitLength * i, splitLength)))
			}

			outArray.push(this.fixSeed(slice(splitLength * (count-1))))
		}

		return outArray
	}

	/**
	 * Ensures the value is this.bits in size.
	 * 
	 * @param {BigInt} value - Value to be coerced into this.bits of data.
	 * @param {Number} [bits=this.bits] - Bit length to convert to.
	 * 
	 * @returns {BigInt} 
	 */
	fixBits(value, bits = this.bits)
	{
		return BigInt.asUintN(bits, value)
	}

	/**
	 * Attempts to Convert the input value to BigInt.
	 * 
	 * @param {BigInt|Number|String|Buffer} value - Value to be converted to BigInt.
	 * @param {Number} [bits=this.bits] - Bit length to convert to.
	 * 
	 * @returns {BigInt}
	 */
	toBigInt(value, bits = this.bits)
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
	
		return this.fixBits(output, bits)
	}

	/**
	 * Flips the binary representation of the input value. The final digit becomes the first, the second to last becomes the second, etc.
	 * 
	 * @param {BigInt} value 
	 * 
	 * @returns {BigInt}
	 */
	reverseBits(value)
	{
		let valStr = value.toString(2)
		let bVal = valStr.padStart(this.bits, '0')

		let reversed = ''

		for(const char of bVal)
		{
			reversed = char + reversed
		}

		return BigInt('0b' + reversed)
		//return this.fixBits(BigInt('0b' + reversed))
	}

	/**
	 * Returns a random number.
	 * 
	 * @returns {BigInt} - A random number based on this.generator
	 */
	random()
	{
		let output = Math.random().toString()
		output = BigInt(output.replaceAll(/[\D]/g, ''))
		return output
	}

	/**
	 * Alias for this.random()
	 * 
	 * @returns {BigInt} - A random number based on this.generator
	 */
	number()
	{
		return this.random()
	}

	/**
	 * Outputs a random number between two values, inclusive.
	 * 
	 * @param {BigInt} min - Smallest number the values can be
	 * @param {BigInt} max - Largest number the values can be
	 * 
	 * @returns {BigInt}
	 */
	numberBetween(min, max)
	{
		min = BigInt(min)
		max = BigInt(max)
		
		let actualMax = max

		let diff = max - min

		if(BigInt(diff) > BigInt(this.max))
		{
			let error = 'Difference between min and max is larger than the generator\'s maximum.\n'
			error += 'Please either:\n'
			error += '	- Increase min\n'
			error += '	- Decrease max\n'
			error += '	- Both of the above'
			throw error
		}

		if(max == min)
		{
			return min
		}

		if(min > max)
		{
			let swap = max
			max = min
			min = swap
		}

		if(min != 0n)
		{
			actualMax = max - min
		}

		let value = this.random()

		let mod = actualMax + 1n
		let output = value % mod
		output += min
		
		return output
	}

	/**
	 * Outputs a random boolean
	 * @returns {Boolean}
	 */
	bool()
	{
		let rand = this.numberBetween(0, 1)
		return !!rand
	}
	
	/**
	 * Selects a random character from a string
	 * 
	 * @param {String} string 
	 */
	character(string)
	{
		return this.arrayEntry(string)
	}

	/**
	 * Outputs a random floating point number between 0 (inclusive) and 1 (exclusive) with optional precision.
	 * 
	 * @param {Number} [precision] - How many digits to keep after decimal point.
	 */
	float(precision)
	{
		let output = this.random().toString()

		if(typeof precision != typeof undefined)
		{
			output = output.substr(0, precision)
		}

		output = '0.' + output
		return Number(output)
	}
}
