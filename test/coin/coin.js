'use strict'

import rng from '../../src/index.js'

let Gen = rng.GENERATOR.CRYPTO
let Coin = rng.COIN.BASE



let generator = new Gen({bits:1})
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
		if(coins[i] === coin.heads)
		{
			output[coin.heads]++
		}
		else if(coins[i] === coin.tails)
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

console.log(`Random Standard Coins: ${JSON.stringify(test(coinStan))}`)
console.log(`Random Technical Coins: ${JSON.stringify(test(coinTech))}`)
console.log(`Random Numeric Coins: ${JSON.stringify(test(coinNum))}`)
console.log(`Random Boolean Coints: ${JSON.stringify(test(coinBool))}`)