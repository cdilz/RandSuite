'use strict'

import Generator from './base/generator.js'
import crypto from 'crypto'

/**
 * Class representing a random number generator with a crypto backend.
 * 
 * @extends Generator
 * 
 * @inheritdoc
 */
class CryptoRNG extends Generator
{

	/**
	 * Uses crypto's randomBytes to generate a string, then converts the string to numbers.
	 * 
	 * @returns {BigInt}
	 */
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