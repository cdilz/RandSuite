'use strict'

import XorBase from '../base/xorBase.js'

/**
 * Untested Functionality
 * 
 * Class representing the XORShift* random number generator.
 * 
 * @extends XorBase
 * 
 * @inheritdoc
 */
class XORShiftStar extends XorBase
{

	/**
	 * Uses XOR and bit shifts to generate a pseudorandom number.
	 * 
	 * @returns {BigInt}
	 */
	random()
	{
		let x = this.state[0]
		x = x ^ (x >> this.triple[0])
		x = x ^ (x << this.triple[1])
		x = x ^ (x >> this.triple[2])
		this.state[0] = x
		return this.fixBits(x * this.fixBits(BigInt(0x2545F4914F6CDD1D)))
	}
}

export default XORShiftStar