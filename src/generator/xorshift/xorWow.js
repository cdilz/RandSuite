'use strict'

import XorBase from '../base/xorBase.js'

class XORWow extends XorBase
{
	constructor(args)
	{
		super(args)

		this.state = this.splitSeed(this.seed, 6)
	}

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