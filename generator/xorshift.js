'use strict'

import XORWow from './xorshift/xorWow.js'
import XORShiftStar from './xorshift/xorShiftStar.js'
import XORShiftPlus from './xorshift/xorShiftPlus.js'

class XORWeird extends XORWow
{
	random()
	{/*
		let x = this.state.a
		x = this.fixBits(x ^ this.fixBits(x >> this.triple[0]))
		x = this.fixBits(flip(x))
		x = this.fixBits(x ^ this.fixBits(x << this.triple[1]))
		x = this.fixBits(flip(x))
		x = this.fixBits(x ^ this.fixBits(x >> this.triple[2]))
		x = this.fixBits(flip(x))
		return x
		*/


		/*
		let t = this.state.e
		let s = this.state.a
		this.state.e = this.state.d
		this.state.d = this.state.c
		this.state.c = this.state.b
		this.state.b = s
		
		t = this.fixBits(t ^ this.fixBits(t >> this.triple[0]))
		t = this.flipBits(t)
		t = this.fixBits(t ^ this.fixBits(t << this.triple[1]))
		t = this.flipBits(t)
		t = this.fixBits(t ^ this.fixBits(s ^ this.fixBits(s << this.triple[2])))
		t = this.flipBits(t)
		this.state.a = t
		this.state.f = this.fixBits(this.state.f + this.fixBits(362437n))
		return this.fixBits(t + this.state.f)
		*/
		
		
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
		

		/*
		let t = this.state.e
		let s = this.state.a
		this.state.e = this.state.d
		this.state.d = this.state.c
		this.state.c = this.state.b
		this.state.b = s
		t = this.fixBits(t ^ this.fixBits(t >> this.triple[0]))
		t = this.fixBits(t ^ this.fixBits(t << this.triple[1]))
		t = this.fixBits(t ^ this.fixBits(s ^ this.fixBits(s << this.triple[2])))
		this.state.a = t
		this.state.f = this.reverseBits(this.fixBits(this.state.f + this.fixBits(362437n)))
		return this.fixBits(t + this.state.f)
		*/
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