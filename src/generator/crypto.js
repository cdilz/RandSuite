'use strict'

import Generator from './base/generator.js'
import crypto from 'crypto'

class CryptoRNG extends Generator
{
	random()
	{
		let bytes = Math.ceil(this.bits/8)
		let byteBuffer = crypto.randomBytes(bytes)
		let randString = ''
		for(let i = 0; i < byteBuffer.length; i++)
		{
			randString += byteBuffer[i].toString()
		}

		randString = BigInt(randString)

		return this.fixBits(randString)
	}
}

export default CryptoRNG