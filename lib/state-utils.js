const crypto = require('crypto')
const stateTokens = []

export function makeState () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, (err, buffer) => {
      if (err) return reject(err)
      const state = buffer.toString('hex')
      stateTokens.push(state)
      resolve({ state })
    })
  })
}

export function checkState (state) {
  console.log('Checking state', stateTokens, state)
  const ind = stateTokens.indexOf(state)
  if (ind === -1) throw new Error('Invalid state token')
  stateTokens.splice(ind, 1)
  return true
}
