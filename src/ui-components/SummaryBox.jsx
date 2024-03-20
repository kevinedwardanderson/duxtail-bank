import { useSelector } from 'react-redux';
import {
  filterTransactionsByAcct,
  filterTransactionsByTimeframe,
  formatCurrency,
  getTransactionsBalance,
  sumTransactionsByType,
} from '../utils/helpers.js';

import data from '../../data/accountData.json';

function BalanceBox() {
  const { dashboardAccount, dashboardFilter, dashboardPeriod } = useSelector(
    (store) => store.dashboard,
  );

  let transactions = data.transactionsData;
  transactions = filterTransactionsByAcct(dashboardAccount);
  transactions = filterTransactionsByTimeframe(transactions, dashboardPeriod);

  function getSummary(transactions, filter) {
    const balanceTrans = filterTransactionsByAcct(dashboardAccount);

    switch (filter) {
      case 'Balance':
        return getTransactionsBalance(balanceTrans);
      case 'Deposits':
        return (
          sumTransactionsByType(transactions, 'deposit') +
          sumTransactionsByType(transactions, 'transferIn')
        );

      case 'Expenses':
        return (
          sumTransactionsByType(transactions, 'withdrawal') +
          sumTransactionsByType(transactions, 'transferOut')
        );
      case '+ / -':
        return (
          sumTransactionsByType(transactions, 'deposit') +
          sumTransactionsByType(transactions, 'transferIn') -
          sumTransactionsByType(transactions, 'transferOut') -
          sumTransactionsByType(transactions, 'withdrawal')
        );
      default:
        return 0.0;
    }
  }

  const dashboardAccountSummary = getSummary(transactions, dashboardFilter);

  return (
    <div className="balance-box absolute right-4 top-20 rounded-md bg-gray-100/75 px-3 py-2 text-[24px] drop-shadow-sm backdrop-blur-sm">
      <span>{formatCurrency(dashboardAccountSummary)}</span>
    </div>
  );
}

export default BalanceBox;
