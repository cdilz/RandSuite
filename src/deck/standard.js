'use strict'

import Deck from './base/deck.js'
import Card from './base/card.js'

/**
 * Class representing a standard deck of playing cards.
 * 
 * @extends Deck
 * 
 * @param {Generator} generator - Random number generator to use with the deck.
 * 
 * @inheritdoc
 */
class Standard extends Deck
{
	constructor(generator)
	{
		super(generator)
		let suits = 
		[
			{name: 'Spades', color: 'Black'},
			{name: 'Diamonds', color: 'Red'},
			{name: 'Clubs', color: 'Black'},
			{name: 'Hearts', color: 'Red'}
		]

		let faces = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']

		for(let i = 0; i < suits.length; i++)
		{
			for(let j = 0; j < faces.length; j++)
			{
				this.addCard(new Card(suits[i].color, faces[j], suits[i].name))
			}
		}

		this.freshDeck = this.deck
	}
}

export default Standard