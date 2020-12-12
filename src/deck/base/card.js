'use strict'


/*

	Add numeric values to cards? 
	
	This way we can allow cards to be compared.

	Must be either a number or array of numbers (then trump cards can be [1,2,3,...] and Aces can be [1,11]) - Note this is dependant on game so not sure on it, might reduce names to just single characters instead and allow the game to figure it out

*/
class Card
{
	constructor(color, rank, suit, faceUp, orientation)
	{
		this.color = color
		this.rank = rank
		this.suit = suit
		this.faceUp = faceUp

		if(typeof this.faceUp != typeof true || !(this.faceUp instanceof Boolean))
		{
			this.faceUp = false
		}

		this.orientation = orientation

		if(typeof this.orientation != typeof 0 || !(this.orientation instanceof Number))
		{
			this.orientation = 0n
		}
	}

	equals(card)
	{
		let color = card.color == this.color
		let rank = card.rank == this.rank
		let suit = card.suit == this.suit

		return suit && rank && color
	}

	toString()
	{
		return this.color + ' ' + this.rank + ' of ' + this.suit 
	}
}

export default Card