'use strict'

import Card from './base/card.js'
import Standard from './base/deck.js'

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