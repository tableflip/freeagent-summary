import { connectComponent } from '../lib/freeagent'
import Company from './company'
import Accounts from './accounts'
import Invoices from './invoices'
import IncomeTrend from './income-trend'
import Outflows from './outflows'

const Dashboard = ({ company, bankAccounts, overdueInvoices, income, expenses, categories }) => {
  return (
    <div className='flex flex-column mw9 center'>
      {company ? <Company company={company.company} /> : null}
      <div className='flex flex-row flex-wrap justify-around'>
        {bankAccounts ? <Accounts accounts={bankAccounts.bank_accounts} /> : null}
        {overdueInvoices ? <Invoices invoices={overdueInvoices.invoices} /> : null}
        {income ? <IncomeTrend invoices={income.invoices} /> : null}
        {bankAccounts && categories ? <Outflows accounts={bankAccounts.bank_accounts} categories={categories} /> : null}
      </div>
    </div>
  )
}

export default connectComponent(() => {
  return [
    { key: 'company', endpoint: 'company' },
    { key: 'bankAccounts', endpoint: 'bank_accounts' },
    { key: 'overdueInvoices', endpoint: 'invoices?view=open_or_overdue', paging: true },
    { key: 'income', endpoint: 'invoices?view=last_6_months', paging: true },
    { key: 'categories', endpoint: 'categories' }
  ]
})(Dashboard)
