class BitInt
{
	get limits()
	{
		return this.unsigned ? this.limit.unsigned : this.limit.signed
	}

	get range()
	{
		return (this.limits.max - this.limits.min) + 1n
	}

	constructor(bits, unsigned = true)
	{
		this.maxBits = BigInt(bits)
		this.unsigned = unsigned

		this.limit = {}
		this.limit.unsigned = {}
		this.limit.unsigned.min = 0n
		this.limit.unsigned.max = ((2n ** this.maxBits) - 1n)
		this.limit.signed = {}
		this.limit.signed.min = -(2n ** (this.maxBits - 1n))
		this.limit.signed.max = (2n ** (this.maxBits - 1n)) - 1n
	}

	isBetween(value)
	{
		value = BigInt(value)
		return !(this.isOver(value) && this.isUnder(value))
	}

	isOver(value)
	{
		value = BigInt(value)
		return value > this.limits.max
	}

	isUnder(value)
	{
		value = BigInt(value)
		return value < this.limits.min
	}
	
	clamp(value)
	{
		let output = value
		if(this.isOver(output))
		{
			output = this.limits.max
		}
		else if(this.isUnder(output))
		{
			output = this.limits.min
		}
		return output
	}

	wrap(value)
	{
		let output = BigInt(value)
		if(this.isOver(value))
		{
			output %= this.range
			if(this.isOver(output))
			{
				output = this.limits.min + (output % (this.limits.max + 1n))
			}
		}
		else if(this.isUnder(value))
		{
			output %= this.range

			if(this.isUnder(output))
			{
				output = this.limits.max + (output % this.limits.min) + 1n
				//let add = this.limits.min == 0n ? 0n : output % this.limits.min
				//output = this.limits.max + add + 1n
			}

			/*
			if(this.unsigned && output < this.limits.min)
			{
				output = this.limits.max + output + 1n
			}
			else if(!this.unsigned && output < this.limits.min)
			{
				
				//output = this.limits.max + (output % (this.limits.max + 1n))
				//console.log(value, output, this.limits.max, this.limits.max + output + 1n, (output % (this.limits.max + 1n)), this.limits.max + (output % this.limits.min) + 1n)
				output = this.limits.max + (output % this.limits.min) + 1n
			}
			*/

			//output += this.range
			//output = this.wrap(output)

			//console.log(output)
			//console.log(output % this.range)
		}

		return output
	}

	simulate(value)
	{
		return this.wrap(value)
	}
}

export default BitInt

////////////////
// SCRATCHPAD //
////////////////

function testfunc(helper, limit)
{
	let counter = 0n
	let errors = 0n
	if(limit >= 0)
	{
		for(let i = 0; i <= limit; i++)
		{
			let simulate = helper.simulate(i)
			let middle = simulate - counter
			let errored = middle != 0n
			errors += errored ? 1n : 0n
			counter++
			if(counter > helper.limits.max)
			{
				counter = helper.limits.min
			}
		}
	}
	else
	{
		for(let i = 0; i >= limit; i--)
		{
			let middle = helper.simulate(i) - counter
			errors += BigInt(middle != 0n)
			counter--
			if(counter < helper.limits.min)
			{
				counter = helper.limits.max
			}
		}
	}
	return errors
}

let test = new BitInt(8, false)
let test2 = new BitInt(8)

/*
console.log(test.limit.signed.min)
console.log(test.limit.signed.max)
console.log(-test.limit.signed.min + test.limit.signed.max)
console.log(test.limit.unsigned.max)
*/

let max = 5000

//console.log(testfunc(test, max))
//console.log(testfunc(test, -max))
//console.log(testfunc(test2, -max))

// -1
//console.log(test.wrap(max))
//console.log(testfunc(test, -max))
//console.log(testfunc(test2, max))
//console.log(testfunc(test2, -max))

//console.log(test.overflow(max))

/*





128%256 = 128
128%128
0 - 128 = -128

129%256 = 129
0 - 129 = -129






*/