import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import data from '../../../data/accountData.json';
import { useDispatch, useSelector } from 'react-redux';
import {
  dvFilterTransactionsByAcct,
  filterTransactionsByTimeframe,
  filterTransactionsByType,
  formatCurrency,
  getDailySummary,
} from '../../utils/helpers';
import {
  setDashboardTransactions,
  setDashboardViewTransactions,
} from './dashboardSlice';
import { useEffect } from 'react';

const { transactionsData } = data;

function Chart() {
  const {
    dashboardAccount,
    dashboardFilter,
    dashboardPeriod,
    // dashboardViewTransactions,
  } = useSelector((store) => store.dashboard);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  function convertFilterValue(filter) {
    switch (filter) {
      case 'Deposits':
        return 'deposit';
      case 'Expenses':
        return 'withdrawal';
      default:
        return filter;
    }
  }

  // Getting Chart data:
  // 1. Transactions start as the entire array of transaction objects
  const transactions = transactionsData;

  // 2. Using dasboard State to create a "filter" object which contains all the information for slicing the transactions data to fit the user input
  const filterObject = {
    account: dashboardAccount,
    filter: dashboardFilter,
    period: dashboardPeriod,
  };

  // 3. Pass transactionsData and filterObject through each filter function to arrive at chart data

  function getDashboardTransactions(transactions, filterObj) {
    let viewTransactions = dvFilterTransactionsByAcct(
      transactions,
      filterObj.account,
    );
    viewTransactions = filterTransactionsByTimeframe(
      viewTransactions,
      filterObj.period,
    );
    viewTransactions = filterTransactionsByType(
      viewTransactions,
      convertFilterValue(filterObj.filter),
    );

    // dispatch(setDashboardViewTransactions(viewTransactions));
    return viewTransactions;
  }

  const dashboardTransactions = getDashboardTransactions(
    transactions,
    filterObject,
  );

  const chartData = getDailySummary(dashboardTransactions, dashboardPeriod);
  let dataKey = 'balance';

  const summary = chartData[chartData.length - 1].balance;
  console.log(summary);

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip rounded-md bg-slate-100 px-3 py-2">
          <p className="label">{`${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="fixed bottom-64  h-1/2 w-full">
      <ResponsiveContainer width="100%" height="50%">
        <AreaChart data={chartData} height={1000} width={500}>
          <ReferenceLine y={0} stroke="lightgray" />
          <Area
            dataKey={dataKey}
            type="monotone"
            stroke="rgb(16 185 129)"
            fill="rgb(16 185 129)"
          />
          <Tooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;

// const testData = [
//   {
//     transactionId: '00348423',
//     amount: '252.86',
//     date: '2023-08-16T00:38:04.472Z',
//     type: 'withdrawal',
//     accountId: '59313771',
//   },
//   {
//     transactionId: '65977610',
//     amount: '940.41',
//     date: '2023-07-09T09:28:09.252Z',
//     type: 'withdrawal',
//     accountId: '59313771',
//   },
//   {
//     transactionId: '96926168',
//     amount: '560.33',
//     date: '2023-07-02T19:12:38.471Z',
//     type: 'withdrawal',
//     accountId: '59313771',
//   },
//   {
//     transactionId: '94281976',
//     amount: '851.78',
//     date: '2023-09-14T03:20:29.451Z',
//     type: 'withdrawal',
//     accountId: '59313771',
//   },
// ];
