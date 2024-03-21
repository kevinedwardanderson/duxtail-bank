import { Link } from 'react-router-dom';
import {
  filterTransactionsByAcct,
  formatCurrency,
  getTransactionsBalance,
} from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import { setActiveAccount } from './accountsSlice';
import { setDashboardAccount } from '../dashboard/dashboardSlice';

function AccountListItem({ account }) {
  const { accountName, accountNumber } = account;
  const dispatch = useDispatch();

  function handleClick(account) {
    dispatch(setActiveAccount(account));
    dispatch(setDashboardAccount(account));
  }

  const transactions = filterTransactionsByAcct(account);

  const accountBalance = getTransactionsBalance(transactions);

  return (
    <Link to="account-details">
      <li
        onClick={() => handleClick(account)}
        className="flex justify-between bg-slate-50 px-6 py-5"
      >
        <span>
          {accountName.length > 16 ? accountName.slice(0, 16) : accountName} |
          xxxx
          {accountNumber.slice(-4)}
        </span>
        <span>{formatCurrency(accountBalance)} &rarr;</span>
      </li>
    </Link>
  );
}

export default AccountListItem;
