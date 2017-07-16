import React, { Component } from 'react'
import Router from 'next/router'
import urlParse from 'url-parse'
import config from '../lib/config'
import { saveCredentials } from '../lib/freeagent'
import { checkState } from '../lib/state-utils'

const isServer = typeof window === 'undefined'
const request = isServer ? require('request-promise') : null

class OAuth extends Component {
  static getInitialProps ({ query, req }) {
    checkState(query.state)

    const { clientId, clientSecret } = config
    const urlParts = urlParse(req.url, true)
    const redirectUri = `http${req.connection.encrypted ? 's' : ''}://${req.headers.host}${urlParts.pathname}`

    const opts = {
      method: 'POST',
      uri: 'https://api.freeagent.com/v2/token_endpoint',
      auth: {
        user: clientId,
        pass: clientSecret
      },
      form: {
        grant_type: 'authorization_code',
        code: query.code,
        redirect_uri: redirectUri
      },
      json: true
    }

    return request(opts)
      .then((res) => {
        return { freeagent: res }
      })
      .catch((err) => {
        return { error: err }
      })
  }

  componentDidMount () {
    saveCredentials(this.props.freeagent)
    Router.push('/')
  }

  render () {
    return <div>LOADING</div>
  }
}

export default OAuth
