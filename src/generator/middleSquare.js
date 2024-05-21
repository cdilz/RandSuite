'use strict'

import Generator from './base/Generator.js'

/**
 * Class representing a middle square number generator with a crypto backend.
 * 
 * @extends Generator
 * 
 * @inheritdoc
 */
export default class MiddleSquare extends Generator
{
	/**
	 * Minimum value for RNG based on bits.
	 * 
	 * @type {BigInt}
	 */
	get min() {return 0n}

	constructor(args)
	{
		console.warn('Number sequence may repeat and definitely do on smaller bit ranges.')
		super(args)

		if(this.bits == 1)
		{
			this.seedBits = 3
		}
		else
		{
			this.seedBits = 2 * this.bits
		}
		this.seedState = this.toBigInt(this.seed, this.bits)
		this.weylState = 0n
	}

	/**
	 * Attempt to make a Weyl value for a Weyl sequence. Unsure if it actually works.
	 * 
	 * @returns {BigInt}
	 */
	makeWeyl()
	{
		if(typeof this.weyl == typeof undefined)
		{
			let maxWeyl = (2n ** BigInt(this.seedBits)) - 1n
			// Try using 90% of max as a Weyl sequence
			// let mid = (maxWeyl * 9n) / 10n
			let mid = maxWeyl/(BigInt(this.seedBits) * 2n)
			// Means it's even, but we want odd
			if(mid % 2n == 0n)
			{
				mid++
			}

			this.weyl = mid
		}

		return this.fixBits(this.weyl, this.seedBits)
	}

	/**
	 * Returns the middle this.bits of a value.
	 * 
	 * @param {BigInt} value - The value to get the middle of.
	 * 
	 * @returns {BigInt} - The middle of value.
	 */
	getMiddle(value)
	{
		let bitDiff = BigInt(this.seedBits - this.bits)
		let left = 0n
		let right = 0n

		// If the difference between bits is odd, move left more than we move right.
		if(bitDiff % 2n != 0n)
		{
			left = (bitDiff/2n) + 1n
			right = left + (bitDiff/2n)
		}
		else
		{
			left = (bitDiff/2n)
			right = left * 2n
		}

		let newValue = this.leftShift(value, left, this.seedBits)
		newValue = newValue >> right
		return newValue
	}

	random()
	{
		let newState = this.seedState ** 2n
		this.weylState = this.fixBits(this.weylState + this.makeWeyl(), this.seedBits)
		newState = this.fixBits(newState + this.weylState, this.seedBits)

		/*
		let left = this.leftShift(newState, BigInt(this.bits), this.seedBits)
		let right = newState >> BigInt(this.bits)

		newState = right | left
		*/

		newState = this.getMiddle(newState)
		this.seedState = newState
		return this.fixBits(newState)
	}
}
