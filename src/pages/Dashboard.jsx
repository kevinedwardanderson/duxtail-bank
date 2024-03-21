import SummaryBox from '../ui-components/SummaryBox';
import ChartFilter from '../features/dashboard/ChartTransactionFilter';
import AccountSelector from '../ui-components/AccountSelector';
import Timeframe from '../features/dashboard/Timeframe';
import AccountList from '../features/accountList/AccountList';
import { useSelector } from 'react-redux';
import Chart from '../features/dashboard/Chart';

function Dashboard() {
  const { dashboardAccount } = useSelector((store) => store.dashboard);

  return (
    <>
      <div className="fixed top-0 flex h-3/5 w-full flex-col justify-between">
        <Chart />

        <div className="fixed left-4 top-20 z-10 min-w-44">
          <AccountSelector
            feature={'dashboard'}
            featureAcct={dashboardAccount}
          />
        </div>
        <SummaryBox />
        <Timeframe />
        <div className="absolute bottom-0 w-full bg-slate-900 py-1">
          <ChartFilter />
        </div>
      </div>
      <div className="fixed bottom-0 h-2/5 w-full ">
        <div className="relative">
          <AccountList />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
