import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  filterTransactionsByAcct,
  filterTransactionsByTimeframe,
  formatCurrency,
  formatDate,
} from '../utils/helpers';
import { useState } from 'react';
import Header from '../ui-components/Header';

function AccountDetailView() {
  const { activeAccount } = useSelector((store) => store.accounts);
  const transactions = filterTransactionsByAcct(activeAccount);
  const datedTransactions = transactions.map((trans) => ({
    ...trans,
    date: new Date(trans.date),
  }));

  const byDateAsc = datedTransactions.slice().sort((a, b) => b.date - a.date);
  const byDateDesc = datedTransactions.slice().sort((a, b) => a.date - b.date);
  const byTypeAsc = datedTransactions.slice().sort((a, b) => b.type - a.type);
  const byTypeDesc = datedTransactions.slice().sort((a, b) => a.type - b.type);
  const byAmtAsc = datedTransactions
    .slice()
    .sort((a, b) => b.amount - a.amount);
  const byAmtDesc = datedTransactions
    .slice()
    .sort((a, b) => a.amount - b.amount);

  const [sortedTransactions, setSortedTransactions] = useState(byDateAsc);

  function toggleFilter(filter) {
    switch (filter) {
      case 'date':
        sortedTransactions === byDateAsc
          ? setSortedTransactions(byDateDesc)
          : setSortedTransactions(byDateAsc);
        break;
      case 'type':
        sortedTransactions === byTypeAsc
          ? setSortedTransactions(byTypeDesc)
          : setSortedTransactions(byTypeAsc);
        break;
      case 'amount':
        sortedTransactions === byAmtAsc
          ? setSortedTransactions(byAmtDesc)
          : setSortedTransactions(byAmtAsc);
        break;
      default:
        return null;
    }
  }

  const tdStyle = 'w-1/3';

  return (
    <>
      <div className="row-start-2">
        <div className="fixed top-[3.250rem] z-10 w-full ">
          <Header type="page">
            <Link to="/">
              <span className="text-[18px]">&larr;</span>
            </Link>
            <span
              onClick={() => filterTransactionsByTimeframe(activeAccount, 30)}
            >
              {activeAccount.accountName} |{' '}
              {activeAccount.accountNumber.slice(-4)}
            </span>
          </Header>
        </div>

        <div className="fixed top-[6.9rem] z-10 w-dvw shadow-md">
          <Header type={'section'}>
            <div
              className="flex items-center gap-1 "
              onClick={() => toggleFilter('date')}
            >
              <span>Date</span>
              <div className="flex flex-col text-[7px] ">
                <span>&uarr;</span>
                <span>&darr;</span>
              </div>
            </div>
            <div
              className="flex items-center gap-1"
              onClick={() => toggleFilter('type')}
            >
              <span>Type</span>
              <div className="flex flex-col text-[7px]">
                <span>&uarr;</span>
                <span>&darr;</span>
              </div>
            </div>
            <div
              className="flex items-center  gap-1"
              onClick={() => toggleFilter('amount')}
            >
              <span>Amount</span>
              <div className="flex flex-col text-[7px]">
                <span>&uarr;</span>
                <span>&darr;</span>
              </div>
            </div>
          </Header>
        </div>

        {/* <AccountFilter /> */}

        <div className="relative top-[5.25rem] overflow-scroll">
          <table className="w-full text-left">
            <tbody className="my-2 mb-12 flex flex-col">
              {sortedTransactions.map((trans, i) => (
                <tr
                  key={trans.transactionId}
                  className={`flex justify-between px-6 py-4 text-left text-xs ${
                    i % 2 === 0 ? 'bg-slate-50' : ''
                  }`}
                >
                  <td className={tdStyle}>{`${formatDate(trans.date).month} ${
                    formatDate(trans.date).day
                  } ${formatDate(trans.date).year}`}</td>
                  <td className={tdStyle}>{trans.type}</td>
                  <td
                    className={
                      trans.type === 'deposit' || trans.type === 'transferIn'
                        ? 'text-emerald-500'
                        : ''
                    }
                  >
                    {formatCurrency(trans.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AccountDetailView;
