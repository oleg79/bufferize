import { bufferize } from '.'

const callingFunction = x => x * x

it('should return a proper array of invocation arguments', done => {
  const releaseFunction = args => {
    expect(args).toEqual([1,4,9,16])
    done()
  }

  const buffered = bufferize(callingFunction, 100, releaseFunction)

  buffered.fire(1)
  buffered.fire(2)
  buffered.fire(3)
  buffered.fire(4)

})



it('should return a proper latest result of the invocation', () => {
  const buffered = bufferize(callingFunction, 100, () => {})

  buffered.fire(1)
  expect(buffered.latest()).toBe(1)

  buffered.fire(2)
  expect(buffered.latest()).toBe(4)

  buffered.fire(3)
  expect(buffered.latest()).toBe(9)

  buffered.fire(4)
  expect(buffered.latest()).toBe(16)
})



it('should stop bufferizing after beforehand release', done => {
  const releaseFunction = args => {
    expect(args).toEqual([1,4,9,16])
    done()
    return args;
  }

  const buffered = bufferize(callingFunction, 100, releaseFunction)

  buffered.fire(1)
  buffered.fire(2)
  buffered.fire(3)
  buffered.fire(4)

  buffered.release();

  buffered.fire(5)
})



it('should return buffer on beforehand release', () => {
  const releaseFunction = args => args

  const buffered = bufferize(callingFunction, 100, releaseFunction)

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

  const buffered = bufferize(callingFunction, 0, releaseFunction)

  setTimeout(() => {
    buffered.fire(5)
  }, 200)

  buffered.fire(1)
  buffered.fire(2)
  buffered.fire(3)
  buffered.fire(4)
})
