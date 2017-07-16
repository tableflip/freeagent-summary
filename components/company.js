import React from 'react'

export default function ({ company = {} }) {
  const { name, town, country } = company
  return (
    <header className='tc pv4 pv5-ns'>
      <img src='https://tableflip.io/img/tableflip.min.svg' className='br3 h3 w3' alt='avatar' />
      <h1 className='f5 f4-ns fw6'>{name}</h1>
      <h2 className='f6 fw2 ttu tracked'>{town}, {country}</h2>
    </header>
  )
}
