'use strict'

/*
	TODO:
		- Automatically generate triple from bits
*/

import Generator from './generator.js'

/**
 * Class representing a random number generator that uses XOR Shift.
 * 
 * To be used as a superclass only.
 *
 * @extends Generator
 * 
 * @param {Object} args - Contains the number of bits for the generator and the seed.
 * @param {Number} [args.bits=128] - The maximal number of bits the random number can be.
 * @param {BigInt|Number|String|Buffer} [args.seed] - The seed for the random number generator. (May be ignored)
 * @param {BigInt[]|Number[]|String[]|Buffer[]} [args.triple=[23n, 17n, 26n]] - A triple value used in the RNG. This varies depending on the bits, I don't currently have a way of automatically finding one.
 * 
 * @inheritdoc
 */
class XorBase extends Generator
{
	constructor(args)
	{
		super(args)
		
		let triple = args.triple || [23n, 17n, 26n]

		triple[0] = this.toBigInt(triple[0])
		triple[1] = this.toBigInt(triple[1])
		triple[2] = this.toBigInt(triple[2])
		this.triple = triple

		this.state = this.splitSeed(1)
	}

	random()
	{
		let x = this.state
		x ^= x << this.triple[0]
		x ^= x >> this.triple[1]
		x ^= x << this.triple[2]
		this.state = x
		return x
	}
}

export default XorBase