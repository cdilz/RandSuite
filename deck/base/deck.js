'use strict'

class Deck
{
	constructor(randSuite)
	{
		this.freshDeck = []
		this.deck = []
		this.generator = randSuite
	}

	reset()
	{
		this.deck = this.freshDeck
	}

	shuffleAll()
	{
		this.reset()
		this.shuffle()
	}

	shuffle()
	{
		let newCards = []

		while(this.deck.length > 0)
		{
			newCards.push(this.drawRandom())
		}

		this.deck = newCards
	}

	addCard(card)
	{
		this.deck.push(card)
	}

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

	draw()
	{
		return this.deck.pop()
	}

	inspect(index)
	{
		return this.deck[index]
	}
}

export default Deck