import BalanceBox from '../ui-components/SummaryBox';
import ChartFilter from '../features/dashboard/ChartTransactionFilter';
import AccountSelector from '../ui-components/AccountSelector';
import Timeframe from '../features/dashboard/Timeframe';
import AccountList from '../features/accountList/AccountList';
import { useSelector } from 'react-redux';

function Dashboard() {
  const { dashboardAccount } = useSelector((store) => store.dashboard);

  return (
    <>
      <div className="relative row-start-1 row-end-8 flex flex-col justify-between bg-[url('/rhchart.png')] bg-cover">
        <div className="absolute left-4 top-20 min-w-44">
          <AccountSelector
            feature={'dashboard'}
            featureAcct={dashboardAccount}
          />
        </div>
        <BalanceBox />
        <div className="border-l-10 absolute bottom-0 w-full border-blue-500 bg-slate-800 py-1">
          <ChartFilter />
        </div>
        <Timeframe />
      </div>

      <AccountList />
    </>
  );
}

export default Dashboard;
