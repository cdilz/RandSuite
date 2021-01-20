Generators to geenerate random BigInts (unless otherwise specified in the docs) as well as some tools to simulate various random activities such as flipping a coin or rolling a die.

Importing default will give you an object full of classes that looks a little bit like this:
```
{
	// Where all the random number generators are.
	GENERATOR:
	{
		// Used as a basis for all other generators. Should generate random numbers, but isn't recommended.
		BASE,
		// Uses crypto to generate random values. Is slow.
		CRYPTO,
		// Uses Math.random(), but is odd-heavy.
		MATH,
		// The XORShift style generators. They use XOR and left and right shifts to make random numbers. They are untested and the default values may not work.
		XORSHIFT:
		{
			// Basic XORShift. 
			BASE,
			// Highly customizable algorithm. Plese refer to documentations for how to do so.
			CUSTOM,
			// Implementation of XORShift+
			PLUS,
			// Implementation of XORShift*
			STAR,
			// Implementation of XORWow
			WOW
		}
	},
	// Classes to randomly select from an array.
	ARRAY:
	{
		// Base random array selector, works fine standalone.
		BASE,
		// Randomly selects from an array using weights to favor certain results.
		LOADED
	},
	// Classes to randomly flip a coin.
	COIN:
	{
		// Base for flipping a coin. No children, but named such for consistency.
		BASE
	},
	// Classes that represent a card.
	CARD:
	{
		// Base for cards. Use to make your own cards. No children, but named such for consistency.
		BASE
	},
	// Classes that represent a deck of cards.
	DECK:
	{
		// Used as a base for all other decks. Fill it with custom cards.
		BASE,
		// Classes that represent a standard deck of cards (hearts, clubs, spades, diamonds, Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King).
		STANDARD:
		{
			// Standard deck. Named for consistency.
			BASE,
			// Standard deck, but with two jokers added.
			JOKER
		}
	}
	// Classes that represent a game die.
	DIE:
	{
		// A normal die to roll, base for other dice.
		BASE,
		// A loaded die which has a weight on each side to favor certain results.
		LOADED
	}
}
```

You can also import generator, array, coin, card, deck, and die to get just those parts if needed.

There are other generators in the folders, but there are serious issues with them and they should not be used.