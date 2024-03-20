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
      <div className="relative row-start-1 row-end-8 flex flex-col justify-between ">
        <Chart />

        <div className="absolute left-4 top-20 z-10 min-w-44">
          <AccountSelector
            feature={'dashboard'}
            featureAcct={dashboardAccount}
          />
        </div>
        <SummaryBox />
        <div className="absolute bottom-0 w-full  bg-slate-900 py-1">
          <ChartFilter />
        </div>
        <Timeframe />
      </div>

      <AccountList />
    </>
  );
}

export default Dashboard;
