'use strict'

throw 'Not Yet Implemented'

import XorBase from '../base/xorBase.js'

/**
 * NON-FUNCTIONAL
 * 
 * Class representing the XORWow random number generator.
 * 
 * @extends XorBase
 * 
 * @inheritdoc
 */
class XORWow extends XorBase
{
	constructor(args)
	{
		super(args)

		this.state = this.splitSeed(6)
	}

	/**
	 * Uses XOR and bit shifts to generate a pseudorandom number.
	 * 
	 * @returns {BigInt}
	 */
	random()
	{
		let x = this.state[4]
		let y = this.state[0]

		this.state[4] = this.state[3]
		this.state[3] = this.state[2]
		this.state[2] = this.state[1]
		this.state[1] = this.state[0]

		x = this.fixBits(x ^ this.fixBits(x >> this.triple[0]))
		x = this.fixBits(x ^ this.fixBits(x << this.triple[1]))
		x = this.fixBits(x ^ this.fixBits(y ^ this.fixBits(y << this.triple[2])))

		this.state[0] = x
		this.state[5] = this.fixBits(this.state[5] + this.fixBits(362437n))
		return this.fixBits(x + this.state[5])
	}
}

export default XORWow