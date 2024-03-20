import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import data from '../../../data/accountData.json';
import { useSelector } from 'react-redux';
import {
  filterTransactionsByAcct,
  filterTransactionsByTimeframe,
  filterTransactionsByType,
} from '../../utils/helpers';

const { transactionsData } = data;
console.log(transactionsData);

function Chart() {
  const { dashboardAccount, dashboardFilter, dashboardPeriod } = useSelector(
    (store) => store.dashboard,
  );

  console.log(dashboardFilter);

  let transactions = transactionsData;
  transactions = filterTransactionsByAcct(dashboardAccount);
  transactions = filterTransactionsByTimeframe(transactions, dashboardPeriod);
  //   transactions = filterTransactionsByType(transactions, dashboardFilter);

  const data2 = [
    {
      transactionId: '00348423',
      amount: '252.86',
      date: '2023-08-16T00:38:04.472Z',
      type: 'withdrawal',
      accountId: '59313771',
    },
    {
      transactionId: '65977610',
      amount: '940.41',
      date: '2023-07-09T09:28:09.252Z',
      type: 'withdrawal',
      accountId: '59313771',
    },
    {
      transactionId: '96926168',
      amount: '560.33',
      date: '2023-07-02T19:12:38.471Z',
      type: 'withdrawal',
      accountId: '59313771',
    },
    {
      transactionId: '94281976',
      amount: '851.78',
      date: '2023-09-14T03:20:29.451Z',
      type: 'withdrawal',
      accountId: '59313771',
    },
    {
      transactionId: '17339227',
      amount: '610.32',
      date: '2023-04-02T20:38:14.682Z',
      type: 'withdrawal',
      accountId: '59313771',
    },
    {
      transactionId: '32222689',
      amount: '4217.12',
      date: '2023-08-19T10:34:15.480Z',
      type: 'withdrawal',
      accountId: '59313771',
    },
    {
      transactionId: '32601490',
      amount: '834.34',
      date: '2023-06-11T20:40:37.170Z',
      type: 'withdrawal',
      accountId: '59313771',
    },
  ];

  return (
    <div className="absolute bottom-12 h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={transactions} height={500} width={500}>
          <Line
            dataKey="amount"
            type="monotone"
            stroke="rgb(16 185 129)"
            fill="rgb(16 185 129)"
            strokeWidth={2}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
