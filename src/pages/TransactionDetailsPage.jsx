import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../utils/helpers';

import { useSelector } from 'react-redux';
import Header from '../ui-components/Header';

function TransactionDetailsPage() {
  const { currentTransaction } = useSelector((store) => store.transactions);

  const { type, amount, date, transactionId, accountId } =
    currentTransaction[0];

  let dateString = `${formatDate(date).month} ${
    formatDate(date).day
  } ${formatDate(date).year}`;

  return (
    <>
      <div>
        <div className="fixed top-[3.250rem] z-10 w-full ">
          <Header type="page">
            <Link to={-1}>
              <span className="text-[18px]">&larr;</span>
            </Link>
            <span>
              {currentTransaction[0]?.type} |{' '}
              {currentTransaction[0]?.transactionId}
            </span>
          </Header>
        </div>
        <div className="absolute top-36 flex flex-col gap-4 px-6">
          <h3>Transaction Id:</h3>
          <p className="rounded-md bg-slate-100 px-3 py-2">{transactionId}</p>
          <h3>Date:</h3>
          <p className="rounded-md bg-slate-100 px-3 py-2">{dateString}</p>
          <h3>Amount:</h3>
          <p className="rounded-md bg-slate-100 px-3 py-2">
            {formatCurrency(amount)}
          </p>
          <h3>Description:</h3>
          <p className="rounded-md bg-slate-100 px-3 py-2">{`Account ${accountId}: ${type} of ${formatCurrency(amount)} on ${dateString}`}</p>
        </div>
      </div>
    </>
  );
}

export default TransactionDetailsPage;
