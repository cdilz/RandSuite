'use strict'

import Generator from './base/Generator.js'

/**
 * Class representing a random number generator that uses the built in Math.random().
 * 
 * @extends Generator
 * 
 * @inheritdoc
 */
export default class MathRNG extends Generator
{
	/**
	 * 'Adjusts' a floating point by removing non-decimal characters.
	 * 
	 * @param {Number} value - The number to be 'adjusted'
	 */
	adjust(value)
	{
		let stringVal = value.toString()
		// Remove non-digit characters.
		let output = BigInt(stringVal.replaceAll(/[\D]/g, ''))
		return BigInt(output)
	}

	/**
	 * Generates a random number by using Math.random and adjusting it.
	 * 
	 * @returns {BigInt}
	 */
	random()
	{
		let rand = this.adjust(Math.random())
		//rand = rand ** this.bits
		while(rand < (this.max + 1n))
		{
			rand += rand
		}

		return this.fixBits(rand) //rand % (this.max + 1n)
	}
}
