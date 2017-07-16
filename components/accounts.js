import React from 'react'
import { formatMoney } from 'accounting-js'

export default function ({ accounts = [] }) {
  return (
    <div className='ma4'>
      <h3 className='f5 ttu fw6'>Balances</h3>
      <table className='collapse'>
        <tbody>
          {accounts.map(renderAccount)}
        </tbody>
      </table>
    </div>
  )
}

function renderAccount ({ bank_name, name, current_balance }) {
  return (
    <tr className='fw2' key={name}>
      <td className='pv2 pr3'>{name}</td>
      <td className='pv2 ph3 i'>{bank_name}</td>
      <td className='pv2 pl3 tr fw6 f3'>{formatMoney(parseFloat(current_balance), { symbol: '£', precision: 2 })}</td>
    </tr>
  )
}
