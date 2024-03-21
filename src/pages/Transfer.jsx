import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAmount as setTransferAmount,
  setFromAccount,
  setToAccount,
} from '../features/transfers/transfersSlice';
import { postTransaction } from '../features/transactions/transactionsSlice';

import AccountSelector from '../ui-components/AccountSelector';
import Button from '../ui-components/Button';
import Input from '../ui-components/Input';
import toast from 'react-hot-toast';

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
    toast.success('transfer completed');
  }

  return (
    <>
      <div className="relative mt-24 flex flex-col gap-14 px-6">
        <div className=" top-8 z-50 flex flex-col gap-6">
          <span>Transfer from:</span>
          <AccountSelector
            feature={'transferFrom'}
            featureAcct={fromAccountId}
          />
        </div>
        <div className=" gap- z-40 flex flex-col gap-6">
          <span>to:</span>
          <AccountSelector feature={'transferTo'} featureAcct={toAccountId} />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Input
            type={'text'}
            id={'amount'}
            labelText={'Amount: '}
            value={amount}
            placeholder={'Enter amount'}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className=" flex justify-between">
          <Button
            text={'Cancel'}
            type={'cancel'}
            size={'large'}
            to={-1}
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
