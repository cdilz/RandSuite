'use strict'

import crypto from 'crypto'

/**
 * Represents a random number generator. To be used as a superclass only.
 *  
 * @param {Object} args - Contains the number of bits for the generator and the seed.
 * @param {Number} [args.bits=128] - The maximal number of bits the random number can be.
 * @param {BigInt|Number|String|Buffer} [args.seed] - The seed for the random number generator. (May be ignored)
 */

class Generator
{
	/**
	 * Minimum value for RNG based on bits (should always be 0).
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
		if(typeof args.bits != typeof 0)
		{
			args.bits = 128
		}
		this.bits = args.bits
		this.seed = this.fixSeed(args.seed)
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
		if(typeof seed == typeof undefined)
		{
			seed = this.randSeed()
		}
		else
		{
			seed = this.toBigInt(seed)
		}
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
				outArray.push(this.seed)
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

	/**
	 * Ensures the value is this.bits in size.
	 * 
	 * @param {BigInt} value - Value to be coerced into this.bits of data.
	 * 
	 * @returns {BigInt} 
	 */
	fixBits(value)
	{
		return BigInt.asUintN(this.bits, value)
	}

	/**
	 * Attempts to Convert the input value to BigInt.
	 * 
	 * @param {BigInt|Number|String|Buffer} value - Value to be converted to BigInt
	 * 
	 * @returns {BigInt}
	 */
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

		return this.fixBits(BigInt('0b' + reversed))
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
	 * Selects an entry from an array at random.
	 * 
	 * @param {*} array 
	 */
	arrayEntry(array)
	{
		let index = this.numberBetween(0, array.length - 1)
		return array[index]
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
}

export default Generator