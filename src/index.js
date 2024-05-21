'use strict'

import Generator from './generator/base/Generator.js'
import CryptoRNG from './generator/CryptoRNG.js'
import MathRNG from './generator/MathRNG.js'
import XORBase from './generator/base/XORBase.js'
import XORCustom from './generator/xorshift/XORShiftCustom.js'
import XORShiftPlus from './generator/xorshift/XORShiftPlus.js'
import XORShiftStar from './generator/xorshift/XORShiftStar.js'
import XORWow from './generator/xorshift/XORWow.js'
import MiddleSquare from './generator/MiddleSquare.js'

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

import ArrayRNG from './array/Array.js'
import LoadedArray from './array/LoadedArray.js'

let array =
{
	BASE: ArrayRNG,
	LOADED: LoadedArray
}

import Deck from './deck/base/Deck.js'
import StandardDeck from './deck/StandardDeck.js'
import StandardDeckWithJoker from './deck/StandardDeckWithJoker.js'

let deck =
{
	BASE: Deck,
	STANDARD: 
		{
			BASE: StandardDeck,
			JOKER: StandardDeckWithJoker
		}
}

import Die from './die/Die.js'
import LoadedDie from './die/LoadedDie.js'

let die =
{
	BASE: Die,
	LOADED: LoadedDie
}
import Coin from './coin/Coin.js'

let coin =
{
	BASE: Coin
}

import Card from './deck/base/Card.js'

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