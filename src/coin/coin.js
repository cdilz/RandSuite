'use strict'

/**
 * Class representing a coin.
 * 
 * @param {Generator} generator - The random number generator to use with the coin.
 * @param {Boolean} [outputType=Count.STANDARD] - How the user wants the results output.
 */
export default class Coin
{
	constructor(generator, outputType = Coin.outputTypes.STANDARD)
	{
		this.generator = generator
		this.outputType = outputType
	}

	/**
	 * Enum for the output types.
	 * 
	 * STANDARD: Heads, Tails
	 * TECHNICAL: Obverse, Reverse
	 * NUMERIC: 1, 0
	 * BOOLEAN: True, False
	 * 
	 * @readonly
	 * @enum {Number}
	 */
	static get outputTypes()
	{
		return {
			STANDARD: 0,
			TECHNICAL: 1,
			NUMERIC: 2,
			BOOLEAN: 3
		}
	}

	/**
	 * @type {String|Number|Boolean}
	 */
	get heads()
	{
		switch(this.outputType)
		{
			case Coin.outputTypes.STANDARD:
				return 'Heads'
			case Coin.outputTypes.TECHNICAL:
				return 'Obverse'
			case Coin.outputTypes.NUMERIC:
				return 1
			case Coin.outputTypes.BOOLEAN:
				return true
			default:
				throw 'Output Type Does Not Exist'
		}
	}

	/**
	 * @type {String|Number|Boolean}
	 */
	get tails()
	{
		switch(this.outputType)
		{
			case Coin.outputTypes.STANDARD:
				return 'Tails'
			case Coin.outputTypes.TECHNICAL:
				return 'Reverse'
			case Coin.outputTypes.NUMERIC:
				return 0
			case Coin.outputTypes.BOOLEAN:
				return false
			default:
				throw 'Output Type Does Not Exist'
		}
	}

	/**
	 * Flips a coin count number of times
	 * 
	 * @param {Number} count 
	 * @param {Boolean} [forceArray=false]
	 * 
	 * @returns {String|String[]} - The results of the flip in order. Reduces to just the output if single flip, unless forceArray is true
	 */
	flip(count = 1, forceArray = false)
	{
		if(typeof count != typeof 0)
		{
			throw 'Count must be a Number.'
		}
		else if(count < 1)
		{
			throw 'Count must be a positive non-zero number'
		}

		let output = []

		if(count == 1)
		{
			// Gets a random boolean, if it's heads, get the correct result for heads, else get the one for tails.
			let result = this.generator.bool() ? this.heads : this.tails
			if(forceArray)
			{
				output.push(result)
			}
			else
			{
				output = result
			}
		}
		else
		{
			for(let i = 0; i < count; i++)
			{
				// Recurses once to flip a single coin.
				output.push(this.flip())
			}
		}

		return output
	}
}
