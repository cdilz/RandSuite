'use strict'

import Generator from './generator/base/generator.js'
import CryptoRNG from './generator/cryptorng.js'
import MathRNG from './generator/mathrng.js'
import XORBase from './generator/base/xorBase.js'
//import XORCustom from './generator/xorshift/xorShiftCustom.js'

let generator =
{
	BASE: Generator,
	CRYPTO: CryptoRNG,
	MATH: MathRNG,
	XORSHIFT:
	{
		BASE: XORBase/*,
		CUSTOM: XORCustom*/
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

















//import list from './generator/list.js'













///** 
// * Class representing a suite of random number generation needs
// */
//class RandSuite
//{
//	/**
//	 * Object containing all built-in random number generators.
//	 * 
//	 * @returns {Object}
//	 */
//	static get list()
//	{
//		return list
//	}
//
//	/**
//	 * Creates a suite of random number generation needs
//	 * @param {Generator} [generator=CryptoRNG] - a random number generator based off of the Generator class
//	 */
//	constructor(generator)
//	{
//		if(typeof generator === typeof undefined)
//		{
//			generator = new list(RandSquite.list.CRYPTO)
//		}	
//		
//		this.generator = generator
//	}
//
//	/**
//	 * Returns a random number
//	 * @returns {BigInt} - A random number based on this.generator
//	 */
//	random()
//	{
//		return this.generator.random()
//	}
//
//	numberBetween(a, b)
//	{
//		return this.generator.numberBetween(a, b)
//	}
//
//	/**
//	 * Rolls a single die
//	 * @returns {BigInt}
//	 */
//	die(sides = 6)
//	{
//		return this.numberBetween(1,sides)
//	}
//
//	/**
//	 * Rolls multiple dice and adds them together
//	 */
//	diceAdd(count = 1, sides = 6)
//	{
//		let arr = this.dice(count, sides)
//		let output = 0
//
//		for(let i = 0; i < arr.length; i++)
//		{
//			output += arr[i]
//		}
//
//		return output
//	}
//
//	// Rolls a number of dice
//	dice(count = 1, sides = 6)
//	{
//		if(count <= 0)
//		{
//			throw 'Count must be greater than 0'
//		}
//
//		let output = []
//
//		for(let i = 0; i < count; i++)
//		{
//			output.push(this.die(sides))
//		}
//
//		return output
//	}
//
//	// Alias for dice
//	roll(count = 1, sides = 6)
//	{
//		return this.dice(count, sides)
//	}
//
//	// Flip a single coin
//	flip()
//	{
//		return this.arrayEntry(['Obverse', 'Reverse'])
//	}
//
//	// Flips a number of coins
//	multiFlip(count = 1)
//	{
//		let output = []
//		for(let i = 0; i < count; i++)
//		{
//			output.push(this.flip())
//		}
//
//		return output
//	}
//
//	// Returns a random entry from a list
//	arrayEntry(array)
//	{
//		return this.generator.arrayEntry(array)
//	}
//
//	// Pulls a random character out of a string
//	character(string)
//	{
//		return this.arrayEntry(string)
//	}
//
//	bool()
//	{
//		return this.generator.bool()
//	}
//}
//
//export default RandSuite
//
//
//
//
///*
//	TODO:
//		- Maybe eplace this entire thing with multiple exports from various other classes such as:
//			- Export Die as Die from './die/die.js'
//			- Export Standard as Deck from './deck/standard.js'
//*/