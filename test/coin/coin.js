'use strict'

import CryptoRNG from '../../src/generator/crypto.js'
import Coin from '../../src/coin/coin.js'



let generator = new CryptoRNG({bits:1})
let coinStan = new Coin(generator, Coin.outputTypes.STANDARD)
let coinTech = new Coin(generator, Coin.outputTypes.TECHNICAL)
let coinNum = new Coin(generator, Coin.outputTypes.NUMERIC)
let coinBool = new Coin(generator, Coin.outputTypes.BOOLEAN)

function test(coin)
{
	let output = {}
	output[coin.heads] = 0
	output[coin.tails] = 0
	output.other = 0

	let coins = coin.flip(10000)

	for(let i = 0; i < coins.length; i++)
	{
		if(coins[i] == coin.heads)
		{
			output[coin.heads]++
		}
		else if(coins[i] == coin.tails)
		{
			output[coin.tails]++
		}
		else
		{
			output.other++
		}
	}

	return output
}

console.log(test(coinStan))
console.log(test(coinTech))
console.log(test(coinNum))
console.log(test(coinBool))