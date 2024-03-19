import { useState } from 'react';
import AccountSelectorItem from './AccountSelectorItem';
import { portfolio } from '../features/accountList/accountsSlice';
import { useSelector } from 'react-redux';

function AccountSelector({ feature, featureAcct = portfolio }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { accounts } = useSelector((store) => store.accounts);

  function toggleExpand() {
    setIsExpanded((exp) => !exp);
  }

  return (
    <>
      <ul
        className="flex w-full flex-col
      rounded-md 
       bg-slate-100/75 px-4 
        text-sm 
       drop-shadow-sm
       backdrop-blur-sm"
        onClick={toggleExpand}
      >
        {!isExpanded ? (
          <div className="flex items-center justify-between">
            <AccountSelectorItem account={featureAcct} /> <span>&#9660;</span>
          </div>
        ) : (
          <>
            {feature === 'dashboard' && (
              <AccountSelectorItem account={portfolio} feature={feature} />
            )}
            {accounts.map((account) => (
              <AccountSelectorItem
                account={account}
                feature={feature}
                key={account.accountNumber}
              />
            ))}
          </>
        )}
      </ul>
    </>
  );
}

export default AccountSelector;
