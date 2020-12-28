'use strict'

import RandSuite from './src/index.js'


function getMedian(inputArr)
{
	let length = inputArr.length
	let median
	
	if(length % 2 == 0)
	{
		median = (inputArr[length/2] + inputArr[(length/2) - 1])/2n
	}
	else
	{
		median = inputArr[Math.floor(length/2)]
	}

	return median
}

function getSumSquared(inputArr, mean)
{
	let sumSquared = 0n
	for(let i = 0; i < inputArr.length; i++)
	{
		sumSquared += (inputArr[i] - mean) ** 2n
	}

	return sumSquared
}

function getVariance(inputArr, mean)
{
	return getSumSquared(inputArr, mean) / BigInt(inputArr.length)
}

function getMode(inputArr)
{
	let modeObj = {}
	for(let i = 0; i < inputArr.length; i++)
	{
		let valStr = inputArr[i].toString()
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

	let output = []
	for(let i = 0; i < testObj.num.length; i++)
	{
		output.push(BigInt(testObj.num[i]))
	}

	return output
}

function statistics()
{
	let generated = []

	let mean = 0n
	let min
	let max
	let median
	let mode
	let variance
	
	for(let i = 0n; i < loops; i++)
	{
		let num = random()
	
		if(typeof min == typeof undefined)
		{
			min = num
		}
		else
		{
			min = num < min ? num : min
		}
	
		if(typeof max == typeof undefined)
		{
			max = num
		}
		else
		{
			max = num > max ? num : max
		}
	
		mean += num
		generated.push(num)
	}
	
	generated.sort((a,b) => {return (a < b) ? -1 : ((a > b) ? 1 : 0)})
	mean = mean / loops
	median = getMedian(generated)
	variance = getVariance(generated, mean)
	mode = getMode(generated)
	
	console.log(`WARNING: due to how BigInt works mid, median, and variance may be inaccurate
	`)
	
	console.log(`Generator Min: ${rnd.generator.min}`)
	console.log(`Absolute Min: ${absoluteMin}`)
	console.log(`Actual Min: ${min}`)
	console.log(`Generator Max: ${rnd.generator.max}`)
	console.log(`Absolute Max: ${absoluteMax}`)
	console.log(`Actual Max: ${max}`)
	console.log(`Range: ${max - min}`)
	console.log(`Generator Mid: ${(rnd.generator.max - rnd.generator.min)/2n}`)
	console.log(`Absolute Mid: ${(absoluteMax - absoluteMin)/2n}`)
	console.log(`Mid: ${(max - min)/2n}`)
	console.log(`Mean: ${mean}`)
	console.log(`Median: ${median}`)
	console.log(`Mode: ${mode}`)
	console.log(`Variance: ${variance}`)
}

function countEntries()
{
	console.log(`Possible Min: ${absoluteMin}`)
	console.log(`Possible Max: ${absoluteMax}`)
	
	let counter = {}
		
	for(let i = 0; i < loops; i++)
	{
	
		let a = random()
		let index = a.toString()
		if(typeof counter[index] === typeof undefined)
		{
			counter[index] = 0
		}
		counter[index]++
	}

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
	/*
	Object.entries(counter).forEach(ele => 
	{
		console.log(`${ele[0]}: ${ele[1]}`)
	})
	*/
}

let loops = 1000000n

let args = 
{
	 seed: "This is a fantastic seed!sw45oiyhsmnzoderigjnyth90w4s5ierkmghio9r4sdi5ekg0oisw4er5jm9ghiserjm5npj90y8jse45r0m9g"
	,bits: 6
}

let gen = new RandSuite.list.CRYPTO(args)
let rnd = new RandSuite(gen)

let absoluteMin = 0n
let absoluteMax = rnd.generator.max
function random()
{
	return rnd.numberBetween(absoluteMin, absoluteMax)
}

statistics()
countEntries()

//console.log(rnd.generator.randSeed())