'use strict'

import Generator from './generator/base/generator.js'
import CryptoRNG from './generator/cryptorng.js'
import MathRNG from './generator/mathrng.js'
import XORBase from './generator/base/xorBase.js'
import XORCustom from './generator/xorshift/xorShiftCustom.js'
import XORShiftPlus from './generator/xorshift/xorShiftPlus.js'
import XORShiftStar from './generator/xorshift/xorShiftStar.js'
import XORWow from './generator/xorshift/xorWow.js'
import MiddleSquare from './generator/middleSquare.js'

let generator =
{
	BASE: Generator,
	CRYPTO: CryptoRNG,
	MATH: MathRNG,
	MIDDLESQUARE: MiddleSquare,
	XORSHIFT:
	{
		BASE: XORBase,
		CUSTOM: XORCustom,
		PLUS: XORShiftPlus,
		STAR: XORShiftStar,
		WOW: XORWow
	}
}

import ArrayRNG from './array/array.js'
import LoadedArray from './array/loadedArray.js'

let array =
{
	BASE: ArrayRNG,
	LOADED: LoadedArray
}

import Deck from './deck/base/deck.js'
import Standard from './deck/standard.js'
import StandardWithJoker from './deck/standardWithJoker.js'

let deck =
{
	BASE: Deck,
	STANDARD: 
		{
			BASE: Standard,
			JOKER: StandardWithJoker
		}
}

import Die from './die/die.js'
import LoadedDie from './die/loadedDie.js'

let die =
{
	BASE: Die,
	LOADED: LoadedDie
}
import Coin from './coin/coin.js'

let coin =
{
	BASE: Coin
}

import Card from './deck/base/card.js'

let card =
{
	BASE: Card
}

let master =
{
	GENERATOR: generator,
	ARRAY: array,
	COIN: coin,
	CARD: card,
	DECK: deck,
	DIE: die
}

export default master

export {generator, array, coin, card, deck, die}