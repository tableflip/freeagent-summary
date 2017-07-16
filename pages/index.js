import React, { Component } from 'react'
import url from 'url'
import Head from 'next/head'
import Dashboard from '../components/dashboard'
import config from '../lib/config'
import FreeAgent from '../lib/freeagent'
import { makeState } from '../lib/state-utils'

class Home extends Component {
  static getInitialProps () {
    return makeState()
  }

  static childContextTypes = {
    freeagent: React.PropTypes.object
  }

  state = { freeagent: null }

  getChildContext () {
    return { freeagent: this.state.freeagent }
  }

  componentDidMount () {
    this.setState({ freeagent: FreeAgent() })
  }

  connectToFreeagent = (evt) => {
    evt.preventDefault()
    const { protocol, host } = window.location
    const redirectUri = `${protocol}//${host}/oauth`
    const oauthUrl = url.format({
      protocol: 'https:',
      host: 'api.freeagent.com',
      pathname: '/v2/approve_app',
      query: {
        redirect_uri: redirectUri,
        response_type: 'code',
        client_id: config.clientId,
        state: window.oauthState
      }
    })
    window.location = oauthUrl
  }

  render () {
    const { state } = this.props
    const { freeagent } = this.state

    return (
      <div>
        {state ? <Head><script dangerouslySetInnerHTML={{ __html: `window.oauthState='${state}'` }} /></Head> : null}
        {freeagent
          ? <Dashboard />
          : <a href='#' onClick={this.connectToFreeagent}>Connect to Freeagent</a>
        }
      </div>
    )
  }
}

export default Home
