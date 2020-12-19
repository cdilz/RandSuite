'use strict'

throw 'Not Yet Implemented'

import XorBase from '../base/xorBase.js'

/**
 * NON-FUNCTIONAL
 * 
 * Class representing the XORShift+ random number generator.
 * 
 * @extends XorBase
 * 
 * @inheritdoc
 */
class XORShiftPlus extends XorBase
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

		x = this.fixBits(x ^ this.fixBits(x << this.triple[0]))
		x = this.fixBits(x ^ this.fixBits(x >> this.triple[1]))
		x = this.fixBits(x ^ this.fixBits(y ^ this.fixBits(y >> this.triple[2])))

		this.state[1] = x

		return this.fixBits(x + y)
	}
}

export default XORShiftPlus