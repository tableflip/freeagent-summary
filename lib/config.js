import configPublic from '../config.json'

if (typeof window === 'undefined') {
  require('dotenv').config()
}

let configPrivate = {}
if (process.env.CLIENT_SECRET) {
  configPrivate.clientSecret = process.env.CLIENT_SECRET
}

export default { ...configPublic, ...configPrivate }
