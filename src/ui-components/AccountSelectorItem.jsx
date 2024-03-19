import { useDispatch } from 'react-redux';
import { setDashboardAccount } from '../features/dashboard/dashboardSlice';
import {
  setFromAccount,
  setToAccount,
} from '../features/transfers/transfersSlice';
import { portfolio } from '../features/accountList/accountsSlice';

function AccountSelectorItem({ account, feature }) {
  const dispatch = useDispatch();

  const acctName = account.accountName?.slice(0, 12);
  const acctNum =
    account === portfolio ? null : account.accountNumber?.slice(-4);

  function handleClick() {
    switch (feature) {
      case 'dashboard':
        dispatch(setDashboardAccount(account));
        break;
      case 'transferFrom':
        dispatch(setFromAccount(account));
        break;
      case 'transferTo':
        dispatch(setToAccount(account));
        break;
      default:
        return;
    }
  }

  return (
    <li className="min-w-30 flex justify-between py-4" onClick={handleClick}>
      <div>
        {acctName} {acctNum}
      </div>
    </li>
  );
}

export default AccountSelectorItem;
