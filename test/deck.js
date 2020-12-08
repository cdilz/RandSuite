'use strict'

import XORShift from '../generator/xorshift.js'
import RandSuite from '../index.js'
import Standard from '../deck/standard.js'

let args = 
{
	 seed: 'I am a deck of cards!'
	,bits: 6
}

let generator = new XORShift.XORWOW(args)
let rng = new RandSuite(generator)

let deck = new Standard(rng)

//deck.shuffle()
for(let i = 0; i < 52; i++)
{
	console.log(deck.draw().toString())
}

console.log(deck.draw())
