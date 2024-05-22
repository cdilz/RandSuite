'use strict'

/**
 * Class representing a deck of cards.
 * 
 * To be used as a superclass only
 * 
 * @param {Generator} generator - Random number generator to use with the deck.
 */
export default class Deck
{
	constructor(generator)
	{
		this.freshDeck = []
		this.deck = []
		this.generator = generator
	}

	/**
	 * Replaces the deck with a fresh one as if the class was just generated.
	 */
	reset()
	{
		this.deck = this.freshDeck
	}

	/**
	 * Shuffles the entire deck, including those already drawn.
	 */
	shuffleAll()
	{
		this.reset()
		this.shuffle()
	}

	/**
	 * Shuffles whatever cards remain in the deck.
	 */
	shuffle()
	{
		let newCards = []

		while(this.deck.length > 0)
		{
			newCards.push(this.drawRandom())
		}

		this.deck = newCards
	}

	/**
	 * Adds a card to the deck.
	 * 
	 * @param {Card} card 
	 */
	addCard(card)
	{
		this.deck.push(card)
	}

	/**
	 * Removes a card from the deck.
	 * 
	 * @param {Card} card 
	 */
	removeCard(card)
	{
		for(let i = 0; i < this.deck.length; i++)
		{
			if(card.equals(this.deck[i]))
			{
				this.deck.splice(i, 1)
				break
			}
		}
	}

	/**
	 * Draws a random card from the deck.
	 * 
	 * @returns {Card} - The card that was drawn.
	 */
	drawRandom()
	{
		let card = undefined
		if(this.deck.length > 0)
		{
			card = this.generator.arrayEntry(this.deck)
			this.removeCard(card)
		}

		return card
	}

	/**
	 * Draws a card from the top of the deck.
	 * 
	 * @returns {Card} - The card that was drawn.
	 */
	draw()
	{
		return this.deck.pop()
	}

	/**
	 * Reveals a card at a specific position in the deck.
	 * 
	 * @param {Number} index - The position in the deck.
	 * 
	 * @returns {Card} - The card at that position in the deck.
	 */
	inspect(index)
	{
		return this.deck[index]
	}
}
