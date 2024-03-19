import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAmount as setTransferAmount,
  setFromAccount,
  setToAccount,
} from '../features/transfers/transfersSlice';
import { postTransaction } from '../features/accountList/accountsSlice';

import AccountSelector from '../ui-components/AccountSelector';
import Button from '../ui-components/Button';
import Input from '../ui-components/Input';

function Transfer() {
  const { toAccountId } = useSelector((store) => store.transfers);
  const { fromAccountId } = useSelector((store) => store.transfers);
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  let date = new Date();
  let transactionId = 1234 + Math.floor(Math.random() * 100000000);

  function resetTransfer() {
    dispatch(setFromAccount(''));
    dispatch(setToAccount(''));
    dispatch(setTransferAmount(''));

    setAmount('');
  }

  const transaction = {
    transactionId,
    amount,
    date,
  };

  function handleTransfer(transaction) {
    const transferIn = {
      ...transaction,
      transactionId: transactionId + '-in',
      type: 'transferIn',
      fromAccountId: fromAccountId.accountNumber,
      accountId: toAccountId.accountNumber,
      description: `transfer of ${amount} from ${fromAccountId.accountName} to ${toAccountId.accountName} on ${date}`,
    };

    const transferOut = {
      ...transaction,
      transactionId: transactionId + '-out',
      type: 'transferOut',
      toAccountId: toAccountId.accountNumber,
      accountId: fromAccountId.accountNumber,
      description: `transfer of ${amount} from ${fromAccountId.accountName} to ${toAccountId.accountName} on ${date}`,
    };

    dispatch(postTransaction(transferIn));
    dispatch(postTransaction(transferOut));
    resetTransfer();
  }

  return (
    <>
      <div className="relative row-start-1 row-end-8 mt-24 flex  flex-col gap-6 px-6">
        <div className="absolute top-8 z-50 flex min-w-[21rem] flex-col gap-6">
          <span>Transfer from:</span>
          <AccountSelector
            feature={'transferFrom'}
            featureAcct={fromAccountId}
          />
        </div>
        <div className="absolute top-[10rem] z-40 flex min-w-[21rem] flex-col gap-6">
          <span>to:</span>
          <AccountSelector feature={'transferTo'} featureAcct={toAccountId} />
        </div>

        <div className="absolute top-[20rem] flex items-center justify-between">
          <Input
            type={'text'}
            id={'amount'}
            labelText={'Amount: '}
            value={amount}
            placeholder={'Enter amount'}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="absolute top-[26rem] flex min-w-[21rem] justify-between">
          <Button
            text={'Cancel'}
            type={'cancel'}
            size={'large'}
            to={'/'}
            active={'Transfer now'}
            onClick={() => handleTransfer(transaction)}
          ></Button>
          <Button
            text={'Transfer now'}
            type={'large'}
            size={'large'}
            active={`${!amount ? '' : 'Transfer now'}`}
            onClick={() => handleTransfer(transaction)}
          ></Button>
        </div>
      </div>
    </>
  );
}

export default Transfer;
