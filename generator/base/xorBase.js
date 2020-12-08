'use strict'

import Base from './base.js'

class XorBase extends Base
{
	constructor(args)
	{
		super(args)
		
		let triple = args.triple || [23n, 17n, 26n]

		triple[0] = this.toBigInt(triple[0])
		triple[1] = this.toBigInt(triple[1])
		triple[2] = this.toBigInt(triple[2])
		this.triple = triple

		this.state = this.splitSeed(this.seed, 1)
	}
}

export default XorBase