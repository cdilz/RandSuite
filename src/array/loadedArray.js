'use strict'

import ArrayRNG from './array.js'

/**
 * Class representing a loaded array. That is to say the array has a non-equal chance of an item being selected.
 * 
 * @extends ArrayRNG
 * 
 * @inheritdoc
 */
class LoadedArray extends ArrayRNG
{
	/**
	 * Adds a weighted value to the array.
	 * 
	 * @param {BigInt} weight 
	 * @param {*} value 
	 */
	push(value, weight)
	{
		this.array.push({weight, value})
	}

	/**
	 * Replace the value and weight at index with the new value and weight.
	 * 
	 * @param {Number} index 
	 * @param {*} value 
	 * @param {BigInt} weight 
	 */
	replace(index, value, weight)
	{
		this.array[index] = {weight, value}
	}

	random()
	{
		try 
		{
			let min = 0
			let max = 0
			let weightedArray = []
	
			for(let i = 0; i < this.array.length; i++)
			{
				let entry = this.array[i]
				max += entry.weight
				let option = 
				{
					min,
					max,
					value: entry.value
				}
				weightedArray.push(option)
				min = max + 1
			}
			
			let chance = this.generator.numberBetween(0, max)
	
			for(let i = 0; i < weightedArray.length; i++)
			{
				let entry = weightedArray[i]
				if(chance >= entry.min && chance <= entry.max)
				{
					return entry.value
				}
			}
	
			return undefined
		} 
		catch (e) 
		{
			throw e
		}
	}
}

export default LoadedArray