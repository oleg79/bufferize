# Example

```shell
$ npm install bufferize --save

```
or using yarn
```shell
$ yarn add bufferize
```

```javascript
const { bufferize } = require('bufferize')
// ES2015 modules
import { bufferize } from 'bufferize'

const callingFunction = x => x * x

const releaseFunction = args => {
  console.log(args)
}

const buffered = bufferize(callingFunction, 2000, releaseFunction)

buffered.fire(1)
buffered.fire(2)
buffered.fire(3)
buffered.fire(4)

// after ~2 seconds you will see in a console
// [1, 4, 9, 16]

// or you can release buffered values beforehand

const buffered = bufferize(callingFunction, 2000, releaseFunction)

buffered.fire(1)
buffered.fire(2)
buffered.fire(3)

buffered.release()
// [1, 4, 9]

buffered.fire(4)
// after ~2 seconds you will see in a console
// [16]


```