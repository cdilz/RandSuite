'use strict'

import ArrayRNG from './Array.js'

/**
 * Class representing a loaded array. That is to say the array has a non-equal chance of an item being selected.
 * 
 * @extends ArrayRNG
 * 
 * @inheritdoc
 */
export default class LoadedArray extends ArrayRNG
{
	/**
	 * Adds a weighted value to the array.
	 * 
	 * @param {BigInt} weight 
	 * @param {*} value 
	 */
	push(value, weight)
	{
		weight = this.generator.toBigInt(weight)

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
			/*
				If this is 0 then the minimum weight has to be 0

				If the weight is 0 then it should never be chosen

				Thus our next integer is 1n and is the next weight
			*/
			let min = 1n
			let max = 0n
			let weightedArray = []
	
			for(let i = 0; i < this.array.length; i++)
			{
				const entry = this.array[i]
				const weight = this.generator.toBigInt(entry.weight)
				// Don't allow 0 weight objects through at all
				if(entry.weight === 0n) {
					continue;
				}
				max += weight
				let option = 
				{
					min,
					max,
					value: entry.value
				}
				weightedArray.push(option)
				min = max + 1n
			}
			
			let chance = this.generator.numberBetween(1n, max)
	
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
