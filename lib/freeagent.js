import React, { Component } from 'react'
import Url from 'url-parse'

const freeagentApi = {
  domain: 'https://api.freeagent.com',
  root: 'v2'
}

export default function () {
  let creds = window.localStorage.getItem('freeagent')
  if (!creds) return null
  creds = JSON.parse(creds)
  if (creds.expires_at && creds.expires_at < Date.now()) {
    window.localStorage.removeItem('freeagent')
    return null
  }

  const { access_token } = creds

  function get ({ url, endpoint }) {
    if (!url) url = `${freeagentApi.domain}/${freeagentApi.root}/${endpoint}`
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then((res) => {
      const json = res.json()
      if (!res.ok) return Promise.reject(json)
      return json
    })
  }

  return {
    get
  }
}

export function saveCredentials (creds) {
  if (!creds.expires_at && creds.expires_in) {
    creds.expires_at = (creds.expires_in * 1000) + Date.now()
  }
  window.localStorage.setItem('freeagent', JSON.stringify(creds))
}

export function connectComponent (data) {
  return (WrappedComponent) => {
    return class ConnectComponent extends Component {
      static contextTypes = {
        freeagent: React.PropTypes.object
      }

      state = {}

      componentDidMount () {
        const { freeagent } = this.context
        let _data = typeof data === 'function' ? data(this.props) : data
        _data = _data instanceof Array ? _data : [_data]

        _data.map(({ key, endpoint, paging }) => {
          const url = Url(`${freeagentApi.root}/${endpoint}`, freeagentApi.domain, true)
          let pagedResults = []

          const getPages = (urlObj, page = 0) => {
            const thisUrl = Url(urlObj.toString(), true)
            thisUrl.query = { ...thisUrl.query, page, per_page: 100 }

            freeagent.get({ url: thisUrl.toString() })
              .then((data) => {
                const resKey = Object.keys(data)[0]
                pagedResults = pagedResults.concat(data[resKey])
                if (data[resKey].length < 100) return this.setState({ [key]: { [resKey]: pagedResults } })
                getPages(urlObj, page + 1)
              })
          }

          if (paging) {
            return getPages(url)
          }

          freeagent.get({ url: url.toString() })
            .then((data) => this.setState({ [key]: data }))
        })
      }

      render () {
        return <WrappedComponent {...this.props} {...this.state} />
      }
    }
  }
}
