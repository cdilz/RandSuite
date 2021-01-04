'use strict'

import rng from '../../src/index.js'

let Gen = rng.GENERATOR.CRYPTO
let Deck = rng.DECK.STANDARD.BASE

let gen = new Gen({bits: 6})
let deck = new Deck(gen)

//deck.shuffle()
for(let i = 0; i < 52; i++)
{
	console.log(deck.draw().toString())
}

console.log(deck.draw())
