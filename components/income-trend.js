import React from 'react'
import { formatMoney } from 'accounting-js'

export default function ({ invoices = [] }) {
  const trends = calculateTrends(invoices)

  return (
    <div className='ma4'>
      <h3 className='f5 ttu fw6'>Income Trend</h3>
      <div className='cf nowrap'>
        {trends.map(({ monthsAgo, rate }) => {
          return (
            <dl key={monthsAgo} className='fl fn-l w-50 dib-l w-auto-l lh-title mr5-l'>
              <dd className='f6 fw4 ml0'>Last {monthsAgo} months</dd>
              <dd className='f3 fw6 ml0'>{formatMoney(rate, { symbol: '£', precision: 2 })}</dd>
            </dl>
          )
        })}
      </div>
    </div>
  )
}

const oneMonth = 1000 * 60 * 60 * 24 * 30

function calculateTrends (invoices) {
  return [1, 2, 3, 6].map((monthsAgo) => {
    const timeAgo = oneMonth * monthsAgo
    const minTime = Date.now() - timeAgo

    return {
      monthsAgo,
      rate: invoices.reduce((total, { dated_on, net_value }) => {
        const datedOn = new Date(dated_on).getTime()
        if (datedOn > minTime) total += parseFloat(net_value)
        return total
      }, 0) * 365 / (30 * monthsAgo)
    }
  })
}
