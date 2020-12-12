'use strict'

/*
*	Class representing a normal game die of selectable size
*/
class Die
{
	/*
		Creates a die that can be rolled to get numbers
		@param {RandSuite} randSuite - Used as the random number generator backend
		@param {number} [sides=6] - The number of sides the die has, defaults to 6
	*/
	constructor(randSuite, sides = 6)
	{
		this.generator = randSuite
		this.sides = sides
	}

	roll()
	{
		return this.generator.numberBetween(1, this.sides)
	}

	rollAdd(times = 1)
	{
		if(times < 1)
		{
			throw "Can't roll a die less than once"
		}

		let output = 0
		for(let i = 0; i < times; i++)
		{
			output += this.roll()
		}

		return output
	}

	rollMultiply(times = 1)
	{
		if(times < 1)
		{
			throw "Can't roll a die less than once"
		}

		let output = 1
		for(let i = 0; i < times; i++)
		{
			output *= this.roll()
		}

		return output
	}

	rollArray(times = 1)
	{
		if(times < 1)
		{
			throw "Can't roll a die less than once"
		}

		let output = []
		for(let i = 0; i < times; i++)
		{
			output.push(this.roll())
		}

		return output
	}
}

export default Die