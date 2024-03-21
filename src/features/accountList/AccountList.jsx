import AccountListItem from './AccountListItem';
import { useSelector } from 'react-redux';
import Header from '../../ui-components/Header';
import { Link } from 'react-router-dom';

function AccountList() {
  const { isLoading } = useSelector((store) => store.accounts);
  const { accounts } = useSelector((store) => store.accounts);

  if (isLoading) return <p>...Loading</p>;

  return (
    <>
      {/* <div className="relative w-full  bg-slate-50"> */}
      <div className="relative top-0 z-10 w-full shadow-md">
        <Header type={'section'}>
          <p>Account</p>
          <p>Balance</p>
        </Header>
      </div>
      {/* <div className="relative top-12"> */}
      <div className="absolute top-12 h-[250px] w-full overflow-scroll ">
        <ul className="flex w-full  flex-col divide-y-2 divide-slate-200 text-xs uppercase">
          {accounts.map((acct) => (
            <AccountListItem account={acct} key={acct.accountNumber} />
          ))}
          {accounts.map((acct) => (
            <AccountListItem account={acct} key={acct.accountNumber} />
          ))}
        </ul>

        <Link to="new-account">
          <div className="mb-12 flex justify-between bg-slate-200 px-6 py-5 text-sm italic text-slate-400">
            <span>Open new account +</span>
          </div>
        </Link>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default AccountList;
