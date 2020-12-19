'use strict'

import Card from './base/card.js'
import Standard from './base/deck.js'

/**
 * Class representing a standard deck of playing cards with Jokers added in.
 * 
 * @extends Standard
 * 
 * @param {Generator} generator - Random number generator to use with the deck.
 */
class StandardWithJoker extends Standard
{
	constructor(randSuite)
	{
		super(randSuite)

		this.addCard(new Card('Red', 'Joker', 'Trump'))
		this.addCard(new Card('Black', 'Joker', 'Trump'))

		this.freshDeck = this.deck
	}
}

export default StandardWithJoker