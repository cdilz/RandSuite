export default class Benchmark {
    #start
    #end
    #diff

    constructor() {}

    start() {
        this.#start = process.hrtime()
        this.#end = undefined
        return this.#start
    }

    end() {
        this.#end = process.hrtime()
        this.#diff = process.hrtime(this.#start)
        return this.#end
    }

    convert_ns_to_time(ns) {
        const output = {}

        output.total_nanoseconds = ns
        output.total_microseconds = output.total_nanoseconds / 1000
        output.total_milliseconds = output.total_nanoseconds / (1000 * 1000)
        output.total_seconds = output.total_nanoseconds / (1000 * 1000 * 1000)
        output.total_minutes = output.total_nanoseconds / (1000 * 1000 * 1000 * 60)
        output.total_hours = output.total_nanoseconds / (1000 * 1000 * 1000 * 60 * 60)

        output.nanoseconds = Math.round(output.total_nanoseconds) % 1000
        output.microseconds = Math.round(output.total_microseconds) % 1000
        output.milliseconds = Math.round(output.total_milliseconds) % 1000
        output.seconds = Math.round(output.total_seconds) % 60
        output.minutes = Math.round(output.total_minutes) % 60
        output.hours = Math.round(output.total_hours) // % 60

        return output
    }

    diff_nanoseconds() {
        const ns_per_sec = 1e9
        const sec_to_ns = (this.#diff?.[0] ?? 0) * ns_per_sec
        return sec_to_ns + (this.#diff?.[1] ?? 0)
    }

    diff() {
        const ns = this.diff_nanoseconds()
        const time = this.convert_ns_to_time(ns)
        const hours = time.hours
        const minutes = ('00' + time.minutes).slice(-2)
        const seconds = ('00' + time.seconds).slice(-2)
        const milliseconds = ('000' + time.milliseconds).slice(-3)
        
        return `${hours}:${minutes}:${seconds}.${milliseconds}`
    }

    ops_per_sec(ops = 1) {
        const ns = this.diff_nanoseconds()
        const time = this.convert_ns_to_time(ns)

        return Math.round(ops / time.total_seconds, 3)
    }

    runner(operations, callback) {
        this.start()

        for(let i = 0; i < operations; i++) {
            callback()
        }

        this.end()
    }
}