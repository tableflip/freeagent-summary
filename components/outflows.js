import React from 'react'
import { connectComponent } from '../lib/freeagent'
import { formatMoney } from 'accounting-js'

const moneyFormat = { symbol: '£', precision: 2 }
const filters = [
  /HMRC VAT/
]

function Outflows (data) {
  const pseudoArray = { ...data, length: data.accounts.length }
  const _categories = data.categories
  const categories = Object.keys(_categories).reduce((categories, section) => categories.concat(_categories[section]), [])
  const transactions = Array.prototype.reduce.call(pseudoArray, (allTrans, account) => allTrans.concat(account.bank_transactions), [])
  if (!transactions.length) return null
  const annualised = annualiseOutflows(transactions, categories)
  return (
    <div className='ma4'>
      <h3 className='f5 ttu fw6'>Outflows</h3>
      <div className='cf nowrap'>
        <dl className='fl fn-l w-50 dib-l w-auto-l lh-title mr5-l'>
          <dd className='f6 fw4 ml0'>Annualised</dd>
          <dd className='f3 fw6 ml0'>{formatMoney(annualised, moneyFormat)}</dd>
        </dl>
        <dl className='fl fn-l w-50 dib-l w-auto-l lh-title mr5-l'>
          <dd className='f6 fw4 ml0'>Monthly</dd>
          <dd className='f3 fw6 ml0'>{formatMoney(annualised / 12, moneyFormat)}</dd>
        </dl>
      </div>
    </div>
  )
}

export default connectComponent(({ accounts }) => {
  const sixMonthsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6).toISOString().substr(0, 10)
  const threeMonthsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6).toISOString().substr(0, 10)
  return accounts.map(({ url }, ind) => ({
    key: ind,
    endpoint: `bank_transactions?bank_account=${url}&from_date=${threeMonthsAgo}`,
    paging: true
  }))
})(Outflows)

function annualiseOutflows (transactions, categories) {
  const start = Date.now() - (1000 * 60 * 60 * 24 * 60)
  console.log(transactions.filter((t) => {
    if (parseFloat(t.amount) > -1000) return false
    if (new Date(t.datedOn).getTime() > start) return false
    return true
  }))
  return transactions.reduce((total, { amount, description }) => {
    if (filters.some((f) => f.test(description))) return total
    const amountNum = parseFloat(amount)
    if (amountNum < 0) total += amountNum
    const unexplainedAmount = parseFloat(unexplainedAmount)
    if (amountNum < 0 && unexplainedAmount < 0) total -= unexplainedAmount
    return total
  }, 0) * 365 / 180
}
