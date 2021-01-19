'use strict'

import XorBase from '../base/xorBase.js'

/**
 * Class representing a custom XORShift random number generator.
 * 
 * @extends XorBase
 * 
 * @param {Object} args - Contains the number of bits for the generator and the seed.
 * @param {Number} [args.bits=128] - The maximal number of bits the random number can be.
 * @param {BigInt|Number|String|Buffer} [args.seed] - The seed for the random number generator. (May be ignored)
 * @param {Number} [args.stateCount = 1] - Number of states to use.
 * @param {Number} [args.stepCount = 3] - Number of steps.
 * @param {String[]} [args.steps = ['<<', '>>', '<<']] - How you want to shift: << for left with xor, >> for right shift with xor, r for reverse, + for add, * for multiply, / for divide, - for subtract, % for mod, ^ or ** for exponential.
 * @param {BigInt[]|Number[]|String[]|Buffer[]} [args.shiftAmount = [23n,17n,26n]] - How much to shift on each step. Doesn't apply to flip.
 * 
 * @inheritdoc
 */
class XORShiftCustom extends XorBase
{
	constructor(args)
	{
		super(args)

		this.stateCount = args.stateCount || 1
		this.state = this.splitSeed(this.stateCount)
		this.stepCount = args.stepCount || 3
		this.steps = args.steps || ['<<', '>>', '<<']
		this.shiftAmount = args.shiftAmount || [23n, 17n, 26n]

		if(this.shiftAmount.length > this.shiftCount)
		{
			throw 'args.shiftCount lower than length of args.shiftAmount'
		}
		else if(this.shiftAmount.length < this.shiftCount)
		{
			throw 'args.shiftCount higher than length of args.shiftAmount'
		}

		if(this.steps.length > this.shiftCount)
		{
			throw 'args.shiftCount lower than length of args.steps'
		}
		else if(this.steps.length < this.shiftCount)
		{
			throw 'args.shiftCount higher than length of args.steps'
		}

		for(let i = 0; i < this.shiftAmount.length; i++)
		{
			this.shiftAmount[i] = this.toBigInt(this.shiftAmount[i])
		}
	}

	stateAdjust()
	{
		let newState = []

		let stateLen = this.state.length - 1
		newState.push(this.state[stateLen])

		for(let i = 0; i < stateLen; i++)
		{
				newState.push(this.state[i])
		}

		this.state = newState
	}

	doMath(index, state)
	{
		let step = this.steps[index]
		let shift = this.shiftAmount[index]

		switch (step) 
		{
			case '<<':
				return (state ^ (state << shift))
			case '>>':
				return (state ^ (state >> shift))
			case 'r':
				return this.reverseBits(state)
			case '+':
				return (state + shift)
			case '*':
				return (state * shift)
			case '/':
				return (state / shift)
			case '-':
				return (state - shift)
			case '%':
				return (state % shift)
			case '^':
			case '**':
				return (state ** shift)
			default:
				throw `Invalid step operator in step ${index}`
		}
		/*
		switch (step) 
		{
			case '<<':
				return this.fixBits(state ^ this.fixBits(state << shift))
			case '>>':
				return this.fixBits(state ^ this.fixBits(state >> shift))
			case 'r':
				return this.reverseBits(state)
			case '+':
				return this.fixBits(state + shift)
			case '*':
				return this.fixBits(state * shift)
			case '/':
				return this.fixBits(state / shift)
			case '-':
				return this.fixBits(state - shift)
			case '%':
				return this.fixBits(state % shift)
			case '^':
			case '**':
				return this.fixBits(state ** shift)
			default:
				throw `Invalid step operator in step ${index}`
		}
		*/
	}

	random()
	{
		let randState = [...this.state]
		this.stateAdjust()
		let state = randState[randState.length - 1]

		for(let i = 0; i < this.stepCount; i++)
		{
			state = this.doMath(i, state)
		}

		this.state[0] = this.fixBits(state)
		return this.fixBits(state)
	}
}

export default XORShiftCustom