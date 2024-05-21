'use strict'


/*

	Add numeric values to cards? 
	
	This way we can allow cards to be compared.

	Must be either a number or array of numbers (then trump cards can be [1,2,3,...] and Aces can be [1,11]) - Note this is dependant on game so not sure on it, might reduce names to just single characters instead and allow the game to figure it out

*/
/**
 * Class representing a playing card.
 * 
 * @param {String} color - The color of the card suit, usually black and red in a standard deck.
 * @param {String} rank - The rank of the card, usually Ace, 2, 3, etc in a standard deck.
 * @param {String} suit - The suit of a card, usually clubs, spades, hearts, and diamonds in a standard deck.
 * @param {Boolean} faceUp - True if face up, false if it isn't.
 * @param {Number} orientation - Degrees turned the card is. 0 is normal, 180 is upside down.
 */
export default class Card
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

	/**
	 * Checks if the input card is equal to this card.
	 * 
	 * @param {Card} card - Card to compare to
	 * 
	 * @return {Boolean}
	 */
	equals(card)
	{
		let color = card.color == this.color
		let rank = card.rank == this.rank
		let suit = card.suit == this.suit

		return suit && rank && color
	}

	/**
	 * Outputs the card as a string.
	 * 
	 * @return {String} - String representation of this card as color rank of suit
	 */
	toString()
	{
		return this.color + ' ' + this.rank + ' of ' + this.suit 
	}
}
