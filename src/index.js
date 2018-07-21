export const accumul = (callingFunction, time, releaseFunction) => {
  let buffer = []
  let isBuffering = false
  let timerId

  return {
    fire(...args) {
      buffer.push(callingFunction(...args))

      if (releaseFunction && !isBuffering) {
        isBuffering = true

        timerId = setTimeout(() => {
          releaseFunction(buffer.splice(0))
          isBuffering = false
          clearTimeout(timerId)
        }, time)
      }
    },

    release() {
      isBuffering = false
      const output = buffer.splice(0)
      clearTimeout(timerId)
      return releaseFunction ? releaseFunction(output) : output
    },

    latest() {
      return buffer[ buffer.length - 1 ];
    }
  }
}