import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  filterTransactionsByAcct,
  filterTransactionsByTimeframe,
  formatCurrency,
  formatDate,
} from '../utils/helpers';
import { useState } from 'react';
import Header from '../ui-components/Header';
import { setCurrentTransaction } from './transactions/transactionsSlice';

function AccountDetailView() {
  const { activeAccount } = useSelector((store) => store.accounts);
  const transactions = filterTransactionsByAcct(activeAccount);
  const datedTransactions = transactions.map((trans) => ({
    ...trans,
    date: new Date(trans.date),
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  function viewTransactionDetails(id) {
    dispatch(setCurrentTransaction(id));
    navigate(`/transaction-details/${id}`);
  }

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

  return (
    <>
      <div className="absolute top-[3.25rem] w-full">
        {/* <div className="absolute top-0 z-10 w-full "> */}
        <Header type="page">
          <Link to={-1}>
            <span className="text-[18px]">&larr;</span>
          </Link>
          <span>
            {activeAccount.accountName} |{' '}
            {activeAccount.accountNumber.slice(-4)}
          </span>
        </Header>
      </div>

      <div className="absolute top-[7rem] z-10 w-full shadow-md">
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

      <div className=" absolute top-[10rem] h-dvh w-full  overflow-scroll">
        <div className="my-2 mb-12 flex flex-col ">
          {sortedTransactions.map((trans, i) => (
            <div
              key={trans.transactionId}
              className={`flex justify-between px-6 py-4 text-xs ${
                i % 2 === 0 ? 'bg-slate-50' : ''
              }`}
              onClick={() => viewTransactionDetails(trans.transactionId)}
            >
              <span>{`${formatDate(trans.date).month} ${
                formatDate(trans.date).day
              } ${formatDate(trans.date).year}`}</span>
              <span>{trans.type}</span>
              <span
                className={`flex-grow-[0] ${
                  trans.type === 'deposit' || trans.type === 'transferIn'
                    ? 'text-emerald-500'
                    : ''
                }`}
              >
                {formatCurrency(trans.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default AccountDetailView;
