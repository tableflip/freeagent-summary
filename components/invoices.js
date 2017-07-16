import React from 'react'
import { formatMoney } from 'accounting-js'

const moneyFormat = { symbol: '£', precision: 2 }

export default function ({ invoices = [] }) {
  const { due, overdue, d90 } = summariseInvoices(invoices)

  return (
    <div className='ma4'>
      <h3 className='f5 ttu fw6'>Invoices</h3>
      <div className='cf nowrap'>
        <dl className='fl fn-l w-50 dib-l w-auto-l lh-title mr5-l'>
          <dd className='f6 fw4 ml0'>Due</dd>
          <dd className='f3 fw6 ml0'>{formatMoney(due, moneyFormat)}</dd>
        </dl>
        <dl className='fl fn-l w-50 dib-l w-auto-l lh-title mr5-l'>
          <dd className='f6 fw4 ml0'>of which Overdue</dd>
          <dd className='f3 fw6 ml0'>{formatMoney(overdue, moneyFormat)}</dd>
        </dl>
        <dl className='fl fn-l w-50 dib-l w-auto-l lh-title mr5-l'>
          <dd className='f6 fw4 ml0'>of which > 90d</dd>
          <dd className='f3 fw6 ml0'>{formatMoney(d90, moneyFormat)}</dd>
        </dl>
      </div>
    </div>
  )
}

const d90Ago = 1000 * 60 * 60 * 24 * 90

function summariseInvoices (invoices) {
  const d90CutOff = Date.now() - d90Ago

  return invoices.reduce((summary, { due_value, due_on, status }) => {
    const dueValue = parseFloat(due_value)
    const dueOn = new Date(due_on).getTime()

    summary.due += dueValue
    if (status === 'Overdue') summary.overdue += dueValue
    if (dueOn < d90CutOff) summary.d90 += dueValue

    return summary
  }, { due: 0, overdue: 0, d90: 0 })
}
