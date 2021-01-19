'use strict'

import RandSuite from './src/index.js'

class TestSuite
{
	constructor(generator, rounds)
	{
		this.generator = generator
		this.rounds = rounds
		this.values = []
		this.internal = {}
	}

	run()
	{
		this.internal = {}
		for(let i = 0; i < this.rounds; i++)
		{
			this.values.push(this.generator.random())
		}

		this.values.sort((a,b) => {return (a < b) ? -1 : ((a > b) ? 1 : 0)})
	}

	get min()
	{
		if(this.values.length == 0)
		{
			return 0n
		}

		return this.values[0]
	}

	get max()
	{		
		if(this.values.length == 0)
		{
			return 0n
		}

		return this.values[this.values.length - 1]
	}

	get mean()
	{
		if(this.values.length == 0)
		{
			return 0n
		}

		if(typeof this.internal.mean != typeof undefined)
		{
			return this.internal.mean
		}

		this.internal.mean = 0n
		this.values.forEach(value => this.internal.mean += value)
		this.internal.mean /= BigInt(this.values.length)
		return this.internal.mean
	}

	get median()
	{
		if(this.values.length == 0)
		{
			return 0n
		}

		if(typeof this.internal.median != typeof undefined)
		{
			return this.internal.median
		}

		let length = this.values.length
		
		if(length % 2 == 0)
		{
			this.internal.median = (this.values[length/2] + this.values[(length/2) - 1])/2n
		}
		else
		{
			this.internal.median = this.values[Math.floor(length/2)]
		}
	
		return this.internal.median
	}

	get mode()
	{
		if(this.values.length == 0)
		{
			return 0n
		}

		if(typeof this.internal.mode != typeof undefined)
		{
			return this.internal.mode
		}

		let modeObj = {}
		for(let i = 0; i < this.values.length; i++)
		{
			let valStr = this.values[i].toString()
			if(typeof modeObj[valStr] == typeof undefined)
			{
				modeObj[valStr] = 1
			}
			else
			{
				modeObj[valStr]++
			}
		}
	
		let testObj = 
		{
			 num: []
			,count: 0n
		}
	
		for(const num in modeObj)
		{
			if(modeObj[num] > testObj.count)
			{
				testObj.num = [num]
				testObj.count = modeObj[num]
			}
			else if(modeObj[num] == testObj.count)
			{
				testObj.num.push(num)
			}
		}
	
		this.internal.mode = []
		for(let i = 0; i < testObj.num.length; i++)
		{
			this.internal.mode.push(BigInt(testObj.num[i]))
		}
	
		return this.internal.mode
	}

	get sumSquared()
	{
		if(this.values.length == 0)
		{
			return 0n
		}

		if(typeof this.internal.SumSquared != typeof undefined)
		{
			return this.internal.SumSquared
		}

		this.internal.SumSquared = 0n
		for(let i = 0; i < this.values.length; i++)
		{
			this.internal.SumSquared += (this.values[i] - this.mean) ** 2n
		}
	
		return this.internal.SumSquared
	}

	get variance()
	{
		if(this.values.length == 0)
		{
			return 0n
		}

		if(typeof this.internal.variance != typeof undefined)
		{
			return this.internal.variance
		}

		this.internal.variance = this.sumSquared / BigInt(this.values.length)
		return this.internal.variance
	}

	get count()
	{		
		if(this.values.length == 0)
		{
			return {}
		}

		if(typeof this.internal.count != typeof undefined)
		{
			return this.internal.count
		}

		this.internal.count = {}
			
		for(let i = 0; i < this.values.length; i++)
		{
			let value = this.values[i]
			let valueString = value.toString()
			if(typeof this.internal.count[valueString] === typeof undefined)
			{
				this.internal.count[valueString] = 0
			}
			this.internal.count[valueString]++
		}

		return this.internal.count
	
		/*
		let entries = Object.entries(counter)
	
		entries.sort((a,b) =>
		{
			let l = BigInt(a[0])
			let r = BigInt(b[0])
			return (l < r) ? -1 : ((l > r) ? 1 : 0)
		})
		
		for(let i = 0; i < entries.length; i++)
		{
			console.log(`${entries[i][0]}: ${entries[i][1]}`)
		}
		*/
		/*
		Object.entries(counter).forEach(ele => 
		{
			console.log(`${ele[0]}: ${ele[1]}`)
		})
		*/
	}

	toConsole()
	{	
		console.log('='.repeat(12))
		console.log(`WARNING: due to how BigInt works mid, median, and variance may be inaccurate
		`)
		
		console.log(`Generator Min: ${this.generator.min}`)
		console.log(`Actual Min: ${this.min}`)
		console.log('\n')
		console.log(`Generator Max: ${this.generator.max}`)
		console.log(`Actual Max: ${this.max}`)
		console.log('\n')
		console.log(`Generator Range: ${this.generator.max - this.generator.min}`)
		console.log(`Actual Range: ${this.max - this.min}`)
		console.log('\n')
		console.log(`Generator Mid: ${(this.generator.max - this.generator.min)/2n}`)
		console.log(`Mid: ${(this.max - this.min)/2n}`)
		console.log('\n')
		console.log(`Mean: ${this.mean}`)
		console.log(`Median: ${this.median}`)
		console.log(`Mode: ${this.mode}`)
		console.log(`Variance: ${this.variance}`)
		console.log('='.repeat(12))

		let entries = Object.entries(this.count)
		for(let i = 0; i < entries.length; i++)
		{
			console.log(`${entries[i][0]}: ${entries[i][1]}`)
		}
	}
}

let loops = 1000000n

let args = 
{
	seed: "This is a fantastic seed!sw45oiyhsmnzoderigjnyth90w4s5ierkmghio9r4sdi5ekg0oisw4er5jm9ghiserjm5npj90y8jse45r0m9g",
	bits: 6/*,
	stateCount: 6,
	stepCount: 8,
	steps: 
	[
		'<<',
		'>>',
		'*',
		'r',
		'**',
		'<<',
		'>>',
		'<<'
	],
	stateToUse:
	[
		5,
		5,
		5,
		5,
		5,
		5,
		5,
		5
	],
	shiftAmount:
	[
		3,
		5,
		2,
		0,
		2,
		1,
		13,
		12
	]*/
}

//let gen = new RandSuite.list.CRYPTO(args)
let gen = new RandSuite.GENERATOR.XORSHIFT.CUSTOM(args)

let stats = new TestSuite(gen, loops)

stats.run()
stats.toConsole()

// countEntries()

//console.log(rnd.generator.randSeed())