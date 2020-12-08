'use strict'

import Base from './base/base.js'

class MathRNG extends Base
{
	adjust(value)
	{
		let stringVal = value.toString()
		// Remove the decimal point
		let output = stringVal.replace(/\./, '')

		// Remove the exponent
		let exponentIndex = output.search(/e/)
		if(exponentIndex > -1)
		{
			output = output.slice(0, exponentIndex)
		}
		return BigInt(output)
	}

	random()
	{
		let rand = this.adjust(Math.random())
		//rand = rand ** this.bits
		while(rand < (this.max + 1n))
		{
			rand += rand
		}

		return this.fixBits(rand) //rand % (this.max + 1n)
	}
}

export default MathRNG