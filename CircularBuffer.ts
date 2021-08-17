class CirBuffer {
    private readIndex: number
    private writeIndex: number
    private bufferSize: number
    private buffer: any[]
    constructor(size: number = 2048) {
        if (size < 0) {
            throw new RangeError('Buffer size cannot be negative')
        }
        if (size < 2) {
            throw new RangeError('Buffer size must be greater than 2')
        }
        this.bufferSize = size + 1
        this.readIndex = 0
        this.writeIndex = 0
        this.buffer = new Array(this.bufferSize)
    }
    private increment(index: number): number {
        return (index + 1) % this.bufferSize
    }
    public isFull(): boolean {
        return this.increment(this.writeIndex) === this.readIndex
    }
    public isEmpty(): boolean {
        return this.readIndex === this.writeIndex
    }
    public get size(): number {
        return this.bufferSize - 1
    }
    public get available(): number {
        if (this.writeIndex > this.readIndex) {
            return this.writeIndex - this.readIndex
        } else {
            return this.size - this.readIndex - this.writeIndex
        }
    }
    public read(): any {
        if (this.isEmpty()) {
            throw new RangeError('Buffer is empty')
        }
        const value = this.buffer[this.readIndex]
        this.readIndex = this.increment(this.readIndex)
        return value
    }
    public write(value: any) {
        if (this.isFull()) {
            this.readIndex = this.increment(this.readIndex)
        }
        this.buffer[this.writeIndex] = value
        this.writeIndex = this.increment(this.writeIndex)
    }
}
