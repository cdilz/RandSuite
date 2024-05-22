'use strict'

/**
 * Class representing a normal array.
 * 
 * @param {Generator} generator - The random number generator to use with the array.
 */
export default class ArrayRNG
{
	constructor(generator)
	{
		this.generator = generator
		this.array = []
	}
	
	/**
	 * Empty the internal array
	 */
	empty()
	{
		this.array = []
	}

	/**
	 * Adds a value to the array.
	 * 
	 * @param {*} value - Value to add to the array.
	 */
	push(value)
	{
		this.array.push(value)
	}

	/**
	 * Removes value from the end of an array and returns the value.
	 * 
	 * @returns {*} - Last value added to the array.
	 */
	pop()
	{
		return this.array.pop()
	}

	/**
	 * Replace the value at index with new value.
	 * 
	 * @param {Number} index - 
	 * @param {*} value 
	 */
	replace(index, value)
	{
		this.array[index] = value
	}

	/**
	 * Retrieves value at specific index
	 * 
	 * @param {Number} [index=this.array.length - 1] - Location of data to get
	 * 
	 * @returns {*}
	 */
	peek(index=this.array.length - 1)
	{
		return this.array[index]
	}

	/**
	 * Replace the internal array with a completely new one.
	 * 
	 * @param {Array} array - Array to replace the internal one with.
	 */
	replaceArray(array)
	{
		this.array = array
	}

	/**
	 * Randomly pick an entry from the array.
	 * 
	 * @return {*}
	 */
	random()
	{
		let index = this.generator.numberBetween(0, this.array.length - 1)
		return this.array[index]
	}
}
