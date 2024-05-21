'use strict'

/**
 * Class representing a numbered game die.
 * 
 * @param {Generator} generator - Random number generator used to roll the die.
 * @param {BigInt} [sides=6] - The number of sides the die has, defaults to 6.
 */
export default class Die
{
	constructor(generator, sides = 6n)
	{
		this.generator = generator
		this.sides = this.generator.toBigInt(sides)
	}

	/**
	 * Rolls the die.
	 * 
	 * @returns {BigInt} - A random number between 1 and the number of sides the die has, inclusive.
	 */
	roll()
	{
		return this.generator.numberBetween(1n, this.sides)
	}

	/**
	 * Rolls the die multiple times and adds them together.
	 * 
	 * @param {BigInt} times - Number of times to roll the die.
	 * 
	 * @returns {BigInt} - Number value of all rolls added together.
	 */
	rollAdd(times = 1n)
	{
		times = this.generator.toBigInt(times)

		if(times < 1n)
		{
			throw "Can't roll a die less than once"
		}

		let output = 0n
		for(let i = 0n; i < times; i++)
		{
			output += this.roll()
		}

		return output
	}

	/**
	 * Rolls the die multiple timnes and multiplies them together.
	 * 
	 * @param {BigInt} times - Number of times to roll the die.
	 * 
	 * @returns {BigInt} - Number of all rolls multiplied together.
	 */
	rollMultiply(times = 1n)
	{
		times = this.generator.toBigInt(times)

		if(times < 1n)
		{
			throw "Can't roll a die less than once"
		}

		let output = 1n
		for(let i = 0n; i < times; i++)
		{
			output *= this.roll()
		}

		return output
	}

	/**
	 * Rolls the die multiple times and returns them as an array in roll order.
	 * 
	 * @param {BigInt} times - Number of times to roll the die.
	 * 
	 * @returns {BigInt[]} - Dice rolls in roll order.
	 */
	rollArray(times = 1n)
	{
		times = this.generator.toBigInt(times)

		if(times < 1n)
		{
			throw "Can't roll a die less than once"
		}

		let output = []
		for(let i = 0n; i < times; i++)
		{
			output.push(this.roll())
		}

		return output
	}
}
