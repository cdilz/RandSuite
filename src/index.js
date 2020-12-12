'use strict'

import XORShift from './generator/xorshift.js'
/** 
 * Class representing a suite of random number generation needs
 */
class RandSuite
{
	/**
	 * Creates a suite of random number generation needs
	 * @param {Generator} [generator=XORWow] - a random number generator based off of the Generator class
	 */
	constructor(generator)
	{
		if(typeof generator === typeof undefined)
		{
			generator = new XORShift(XORShift.styles.XORWOW)
		}	
		
		this.generator = generator
	}

	/**
	 * Returns a random number
	 * @returns {BigInt} - A random number based on this.generator
	 */
	random()
	{
		return this.generator.random()
	}

	/**
	 * Alias for this.random()
	 * @returns {BigInt} - A random number based on this.generator
	 */
	number()
	{
		return this.random()
	}

	/**
	 * Outputs a random number between two values, inclusive
	 * @param {BigInt} min - Smallest number the values can be
	 * @param {BigInt} max - Largest number the values can be
	 * @returns {BigInt}
	 */
	numberBetween(min, max)
	{
		min = BigInt(min)
		max = BigInt(max)
		
		let actualMax = max

		let diff = max - min

		if(BigInt(diff) > BigInt(this.generator.max))
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
	 * Rolls a single die
	 * @returns {BigInt}
	 */
	die(sides = 6)
	{
		return this.numberBetween(1,sides)
	}

	/**
	 * Rolls multiple dice and adds them together
	 */
	diceAdd(count = 1, sides = 6)
	{
		let arr = this.dice(count, sides)
		let output = 0

		for(let i = 0; i < arr.length; i++)
		{
			output += arr[i]
		}

		return output
	}

	// Rolls a number of dice
	dice(count = 1, sides = 6)
	{
		if(count <= 0)
		{
			throw 'Count must be greater than 0'
		}

		let output = []

		for(let i = 0; i < count; i++)
		{
			output.push(this.die(sides))
		}

		return output
	}

	// Alias for dice
	roll(count = 1, sides = 6)
	{
		return this.dice(count, sides)
	}

	// Flip a single coin
	flip()
	{
		return this.arrayEntry(['Obverse', 'Reverse'])
	}

	// Flips a number of coins
	multiFlip(count = 1)
	{
		let output = []
		for(let i = 0; i < count; i++)
		{
			output.push(this.flip())
		}

		return output
	}

	// Returns a random entry from a list
	arrayEntry(array)
	{
		let index = this.numberBetween(0, array.length - 1)
		return array[index]
	}

	// Pulls a random character out of a string
	character(string)
	{
		return this.arrayEntry(string)
	}
	/*
		TODO:
			- Loaded dice
			- Loaded array/object
	*/
}

export default RandSuite




/*
	TODO:
		- Maybe eplace this entire thing with multiple exports from various other classes such as:
			- Export Die as Die from './die/die.js'
			- Export Standard as Deck from './deck/standard.js'
*/