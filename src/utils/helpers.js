import data from '../../data/accountData.json';
import { portfolio } from '../features/accountList/accountsSlice';
import {
  dashboardAccount,
  dashboardFilter,
  dashboardPeriod,
} from '../features/dashboard/dashboardSlice';
const { transactionsData } = data;

export function filterTransactionsByType(
  transactions = transactionsData,
  transType,
) {
  if (transType === 'Balance' || transType === '+ / -') return transactions;
  const filteredByType = transactions.filter(
    (trans) => trans.type === transType,
  );
  return filteredByType;
}

export function filterTransactionsByAcct(account) {
  const filteredByAcct =
    account === portfolio
      ? transactionsData
      : transactionsData.filter(
          (trans) => trans.accountId === account.accountNumber,
        );

  return filteredByAcct;
}

export function dvFilterTransactionsByAcct(transactions, account) {
  const filteredByAcct =
    account === portfolio
      ? transactionsData
      : transactions.filter(
          (trans) => trans.accountId === account.accountNumber,
        );

  return filteredByAcct;
}

export function getTransactionsByDate(transactions, date) {
  const transactionsByDate = transactions.filter((trans) => {
    const transDateISO = new Date(trans.date).toISOString();
    const dateISO = new Date(date).toISOString();
    return transDateISO.slice(0, 10) === dateISO.slice(0, 10);
  });
  return transactionsByDate;
}

export function sumTransactionsByDate(transactions, date) {
  const sumByDate = getTransactionsBalance(
    getTransactionsByDate(transactions, date),
  );
  return sumByDate;
}

export function filterTransactionsByTimeframe(
  transactions = transactionsData,
  numDays,
) {
  const currentDay = new Date();
  const prevDay = new Date(currentDay - numDays * (1000 * 60 * 60 * 24));
  const filteredByTimeframe = transactions.filter((trans) => {
    let transDate = Date.parse(trans.date);
    if (transDate <= currentDay && transDate >= prevDay) return trans;
  });
  return filteredByTimeframe;
}

export function sumTransactionsByType(
  transactions = transactionsData,
  transType,
) {
  const transactionsByType = filterTransactionsByType(
    transactions,
    transType,
  ).map((trans) => Number(trans.amount));

  const sumTransactions = transactionsByType.reduce((acc, cur) => acc + cur, 0);
  return sumTransactions;
}

export function sumTransactions(transactions = transactionsData) {
  const sum = transactions.reduce((acc, cur) => acc + cur, 0);
  return sum;
}

export function getTransactionsBalance(transactions = transactionsData) {
  const deposits = sumTransactionsByType(transactions, 'deposit');
  const transfersIn = sumTransactionsByType(transactions, 'transferIn');
  const transfersOut = sumTransactionsByType(transactions, 'transferOut');
  const withdrawals = sumTransactionsByType(transactions, 'withdrawal');

  const balance = deposits + transfersIn - transfersOut - withdrawals;

  return balance;
}

export function getDailySummary(transactions, numDays) {
  const dailySummary = [];
  const currentDay = new Date();
  const prevDay = new Date(currentDay - numDays * (1000 * 60 * 60 * 24));
  let runningNet = 0;

  for (
    let i = prevDay;
    i < currentDay;
    i = new Date(Date.parse(i) + 1000 * 60 * 60 * 24)
  ) {
    runningNet += sumTransactionsByDate(transactions, i);
    dailySummary.push({
      date: i,
      sum: sumTransactionsByDate(transactions, i),
      balance: runningNet,
    });
  }
  return dailySummary;
}

// export function getRunningBalance(transactions, numDays) {
//   const runningBalance = [];
//   let runningNet = 0;
//   let dailyNets = getDailyNet(transactions, numDays);

// for (let j = 0; j < 10; j++) {
//   console.log(dailyNets[j].sum);
// runningNet = runningNet + dailyNets[j].sum;
// runningBalance.push({ date: dailyNets[j].date, balance: runningNet });
// }
//   console.log(dailyNets);
//   console.log(runningBalance);
// }

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

// const transactions = transactionsData;
// const filterObject = {
//   account: dashboardAccount,
//   filter: dashboardFilter,
//   period: dashboardPeriod,
// };

// export function dashboardView(transactions, filterObj) {
//   let viewTransactions = filterTransactionsByAcct(
//     transactions,
//     filterObj.account,
//   );
//   viewTransactions = filterTransactionsByTimeframe(
//     viewTransactions,
//     filterObj.period,
//   );
//   // viewTransactions = filterTransactionsByType(
//   //   viewTransactions,
//   //   filterObj.filter,
//   // );
//   console.log(filterObj.account);
//   console.log(filterObj.period);
//   console.log(viewTransactions);
// }

// dashboardView(transactions, filterObject);
