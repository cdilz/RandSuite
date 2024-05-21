'use strict'

import XORBase from '../base/XORBase.js'

/**
 * Untested Functionality
 * 
 * Class representing the XORShift+ random number generator.
 * 
 * @extends XORBase
 * 
 * @inheritdoc
 */
export default class XORShiftPlus extends XORBase
{
	constructor(args)
	{
		super(args)

		this.state = this.splitSeed(2)
	}

	/**
	 * Uses XOR and bit shifts to generate a pseudorandom number.
	 * 
	 * @returns {BigInt}
	 */
	random()
	{
		let x = this.state[0]
		let y = this.state[1]
		
		this.state[0] = this.state[1]

		x = x ^ this.leftShift(x, this.triple[1])
		x = x ^ (x >> this.triple[1])
		x = x ^ (y ^ (y >> this.triple[2]))

		this.state[1] = x

		return this.fixBits(x + y)
	}
}
