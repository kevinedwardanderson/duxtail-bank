import AccountListItem from './AccountListItem';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../ui-components/Header';
import { Link } from 'react-router-dom';
import { data } from '../../../data/accountData';

function AccountList() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.accounts);
  const { accounts } = useSelector((store) => store.accounts);

  if (isLoading) return <p>...Loading</p>;

  return (
    <div className="row-start-8 row-end-13  overflow-scroll bg-slate-50">
      <div className="t-0 absolute z-10 w-full shadow-md">
        <Header type={'section'}>
          <p>Account</p>
          <p>Balance</p>
        </Header>
      </div>
      <div className="relative top-12 overflow-scroll">
        <ul className="flex flex-col  divide-y-2 divide-slate-200  text-xs uppercase">
          {accounts.map((acct) => (
            <AccountListItem account={acct} key={acct.accountNumber} />
          ))}
          {/* {accounts.map((acct) => (
            <AccountListItem account={acct} key={acct.accountNumber} />
          ))} */}
        </ul>

        <Link to="new-account">
          <div className="mb-12 flex justify-between bg-slate-200 px-6 py-5 text-sm italic text-slate-400">
            <span>Open new account +</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AccountList;
