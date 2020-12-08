'use strict'

import XorBase from '../base/xorBase.js'

class XORShiftPlus extends XorBase
{
	constructor(args)
	{
		super(args)

		this.state = this.splitSeed(this.seed, 2)
	}

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