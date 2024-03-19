import { useDispatch, useSelector } from 'react-redux';
import { setDashboardPeriod } from './dashboardSlice';

function Timeframe() {
  const { periods } = useSelector((store) => store.dashboard);
  const { dashboardPeriod } = useSelector((store) => store.dashboard);
  const dispatch = useDispatch();

  function togglePeriod(p) {
    dispatch(setDashboardPeriod(p));
  }

  return (
    <div className="absolute bottom-[4.50rem] flex w-dvw shrink justify-between bg-slate-200/50 px-6 py-1  text-xs text-slate-400 backdrop-blur-sm ">
      {periods.map((period) => (
        <button
          onClick={() => togglePeriod(period)}
          key={period}
          className={`rounded-md px-3 font-bold  ${
            period === dashboardPeriod
              ? 'bg-slate-900 text-slate-50 backdrop-blur-sm'
              : ''
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
}

export default Timeframe;
