import data from '../../data/accountData.json';
import { portfolio } from '../features/accountList/accountsSlice';
const { transactionsData } = JSON.stringify(data);

export function filterTransactionsByType(
  transactions = transactionsData,
  transType,
) {
  const filteredByType = transactions.filter(
    (trans) => trans.type === transType,
  );
  return filteredByType;
}

export function filterTransactionsByAcct(account) {
  const filteredByAcct =
    account === portfolio
      ? data.transactionsData
      : data.transactionsData.filter(
          (trans) => trans.accountId === account.accountNumber,
        );

  return filteredByAcct;
}

export function filterTransactionsByTimeframe(transactions, numDays) {
  const startDay = new Date();
  const prevDay = new Date(startDay - numDays * (1000 * 60 * 60 * 24));
  const filteredByTimeframe = transactions.filter((trans) => {
    let transDate = Date.parse(trans.date);
    if (transDate <= startDay && transDate >= prevDay) return trans;
  });
  return filteredByTimeframe;
}

export function sumTransactionsByType(
  transactions = data.transactionsData,
  transType,
) {
  const transactionsByType = filterTransactionsByType(
    transactions,
    transType,
  ).map((trans) => Number(trans.amount));

  const sumTransactions = transactionsByType.reduce((acc, cur) => acc + cur, 0);
  return sumTransactions;
}

export function sumTransactions(transactions) {
  const sum = transactions.reduce((acc, cur) => acc + cur, 0);
  return sum;
}

export function getTransactionsBalance(transactions) {
  const deposits = sumTransactionsByType(transactions, 'deposit');
  const transfersIn = sumTransactionsByType(transactions, 'transferIn');
  const transfersOut = sumTransactionsByType(transactions, 'transferOut');
  const withdrawals = sumTransactionsByType(transactions, 'withdrawal');

  const balance = deposits + transfersIn - transfersOut - withdrawals;

  return balance;
}

export function getNetWorth(accounts) {
  const balances = accounts.map((account) => getTransactionsBalance(account));
  return balances.reduce((acc, cur) => acc + cur, 0);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatDate(date) {
  const strDate = JSON.stringify(date).slice(1, 11);
  const year = strDate.slice(0, 4);
  const month = strDate.slice(5, 7);
  const day = strDate.slice(8, 11);

  const dateObj = {
    day,
    month,
    year,
  };

  return dateObj;
}
