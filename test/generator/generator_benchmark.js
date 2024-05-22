'use strict'

import Generator from '../../src/generator/base/Generator.js'
import Benchmark from '../Benchmark.js'


const operations = 1000000
const generator = new Generator()

const left_shift_benchmark = new Benchmark()
left_shift_benchmark.runner(operations, () => generator.leftShift(1000000000000n, 13n, 5))

const reverse_bits_benchmark = new Benchmark()
reverse_bits_benchmark.runner(operations, () => generator.reverseBits(3572398623423n))

const random_bits_benchmark = new Benchmark()
random_bits_benchmark.runner(operations, () => generator.random())

const number_between_benchmark = new Benchmark()
number_between_benchmark.runner(operations, () => generator.numberBetween(1n, 132453354534n))

const bool_benchmark = new Benchmark()
bool_benchmark.runner(operations, () => generator.bool())

const character_benchmark = new Benchmark()
character_benchmark.runner(operations, () => generator.character('abcdefghijklmnopqrstuvwxyz' + 'abcdefghijklmnopqrstuvwxyz'.toUpperCase() + '0123456789'))

const float_benchmark = new Benchmark()
float_benchmark.runner(operations, () => generator.float(24))





function log_ops(label, ops) {
    console.log(`${label} Operations Per Second: ${ops.toLocaleString()}/s`)
}

console.clear()
log_ops('left_shift', left_shift_benchmark.ops_per_sec(operations))
log_ops('reverse', reverse_bits_benchmark.ops_per_sec(operations))
log_ops('random', random_bits_benchmark.ops_per_sec(operations))
log_ops('number_between', number_between_benchmark.ops_per_sec(operations))
log_ops('bool', bool_benchmark.ops_per_sec(operations))
log_ops('character', character_benchmark.ops_per_sec(operations))
log_ops('float', float_benchmark.ops_per_sec(operations))