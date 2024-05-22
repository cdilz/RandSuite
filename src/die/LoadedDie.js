'use static'

import LoadedArray from '../array/LoadedArray.js'
import Die from './Die.js'

/**
 * Class representing a numbered game die. Uses {@link loadedArray}
 * 
 * @extends Die
 * @inheritdoc
 */
export default class LoadedDie extends Die
{
	constructor(generator)
	{
		super(generator)
		this.sides = 0n
		this.weights = new LoadedArray(generator)
	}

	/**
	 * Adds a new side to the die.
	 * 
	 * @param {BigInt} weight - The weight of the new side (how often it'll show up relative to other sides)
	 */
	addSide(weight)
	{
		this.sides++

		this.weights.push(this.sides, weight)
	}

	roll()
	{
		try
		{
			return this.weights.random()
		}
		catch(e)
		{
			throw e
		}
	}
}