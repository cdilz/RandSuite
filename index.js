'use strict'

import XORShift from './generator/xorshift.js'

// All values use BigInt
class RandSuite
{
	// Generator must be a pre-seeded random number generator that implements the random function
	// If it's undefined we create one using XORWow
	constructor(generator)
	{
		if(typeof generator === typeof undefined)
		{
			generator = new XORShift(XorShift.styles.XORWOW, seed)
		}	
		
		this.generator = generator
	}

	// Returns a random number
	random()
	{
		return this.generator.random()
	}

	// alias for random()
	number()
	{
		return this.random()
	}

	// Random between two values, inclusive
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

	// Returns either true or false
	bool()
	{
		let rand = this.numberBetween(0, 1)
		return !!rand
	}

	// Rolls a single die
	die(sides = 6)
	{
		return this.numberBetween(1,sides)
	}

	// Rolls a number of dice and adds them together
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
			output.push(flip())
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