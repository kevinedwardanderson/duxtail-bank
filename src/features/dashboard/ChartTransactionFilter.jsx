import { useState } from 'react';
import Button from '../../ui-components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setDashboardFilter } from './dashboardSlice';

function ChartFilter() {
  const { dashboardFilter } = useSelector((store) => store.dashboard);
  const dispatch = useDispatch();

  function toggleFilter(text) {
    dispatch(setDashboardFilter(text));
  }

  return (
    <div className="flex justify-around px-4  py-4 text-xs font-bold">
      <Button
        text={'Balance'}
        size={'small'}
        active={dashboardFilter}
        onClick={toggleFilter}
      ></Button>
      <Button
        text={'Deposits'}
        size={'small'}
        active={dashboardFilter}
        onClick={toggleFilter}
      ></Button>
      <Button
        text={'Expenses'}
        size={'small'}
        active={dashboardFilter}
        onClick={toggleFilter}
      ></Button>
      <Button
        text={'+ / -'}
        size={'small'}
        active={dashboardFilter}
        onClick={toggleFilter}
      ></Button>
    </div>
  );
}

export default ChartFilter;
