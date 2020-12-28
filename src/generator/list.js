'use strict'

import GENERATOR from './base/generator.js'
import CRYPTO from './crypto.js'
import MATH from './mathrng.js'

let GenList = 
{
	GENERATOR,
	CRYPTO,
	MATH
}

export default GenList







/*

import XORWow from './xorshift/xorWow.js'
import XORShiftStar from './xorshift/xorShiftStar.js'
import XORShiftPlus from './xorshift/xorShiftPlus.js'

class XORWeird extends XORWow
{
	random()
	{		
		let t = this.state.e
		let s = this.state.a
		this.state.e = this.state.d
		this.state.d = this.state.c
		this.state.c = this.state.b
		this.state.b = s
		let mid = 0
		
		mid = this.reverseBits(this.fixBits(t >> this.triple[0]))
		t = this.reverseBits(this.fixBits(t ^ mid))

		mid = this.reverseBits(this.fixBits(t << this.triple[1]))
		t = this.reverseBits(this.fixBits(t ^ mid))


		mid = this.reverseBits(this.fixBits(s << this.triple[2]))
		mid = this.reverseBits(this.fixBits(s ^ mid))

		t = this.reverseBits(this.fixBits(t ^ mid))

		this.state.a = t
		this.state.f = this.fixBits(this.state.f + this.fixBits(362437n))
		return this.fixBits(t + this.state.f)
	}
}

const XORShift =
{
	 "XORWOW": XORWow
	,"XORSHIFT*": XORShiftStar
	,"XORSHIFTSTAR": XORShiftStar
	,"XORSHIFT+": XORShiftPlus
	,"XORSHIFTPLUS": XORShiftPlus
	,"XORWEIRD": XORWeird
}

export default XORShift
*/