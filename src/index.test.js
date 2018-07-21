import { accumul } from '.'

const callingFunction = x => x * x

it('should return a proper array of invocation arguments', done => {
  const releaseFunction = args => {
    expect(args).toEqual([1,4,9,16])
    done()
  }

  const buffered = accumul(callingFunction, 100, releaseFunction)

  buffered.fire(1)
  buffered.fire(2)
  buffered.fire(3)
  buffered.fire(4)

})



it('should return a proper latest result of the invocation', () => {
  const buffered = accumul(callingFunction, 100, () => {})

  buffered.fire(1)
  expect(buffered.latest()).toBe(1)

  buffered.fire(2)
  expect(buffered.latest()).toBe(4)

  buffered.fire(3)
  expect(buffered.latest()).toBe(9)

  buffered.fire(4)
  expect(buffered.latest()).toBe(16)
})



it('should stop buffer after beforehand release and restart after next fire', done => {

  let stop = false

  const releaseFunction = args => {
    if (stop) {
      expect(args).toEqual([16,25])
      done()
    }
    stop = true
    return args
  }

  const buffered = accumul(callingFunction, 100, releaseFunction)

  buffered.fire(1)
  buffered.fire(2)
  buffered.fire(3)

  const result = buffered.release();

  expect(result).toEqual([1,4,9])

  buffered.fire(4)
  buffered.fire(5)
})



it('should return buffer on beforehand release', () => {
  const releaseFunction = args => args

  const buffered = accumul(callingFunction, 100, releaseFunction)

  buffered.fire(1)
  buffered.fire(2)
  buffered.fire(3)
  buffered.fire(4)
  const result = buffered.release();

  expect(result).toEqual([1,4,9,16])
})


it('should stop bufferization after the expiration', done => {
  const releaseFunction = args => {
    expect(args).toEqual([1, 4, 9, 16])
    done()
  }

  const buffered = accumul(callingFunction, 0, releaseFunction)

  setTimeout(() => {
    buffered.fire(5)
  }, 200)

  buffered.fire(1)
  buffered.fire(2)
  buffered.fire(3)
  buffered.fire(4)
})
