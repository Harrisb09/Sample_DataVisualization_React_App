import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import { actions } from './reducer';
import { IState } from '../../store';
import Tiles from '../../components/Tiles';
import Graph from '../../components/Graph';
import Dropdown from '../../components/Dropdown';
import { FetchMetricList } from './FetchMetricList';
import { FetchNewMeasurementData } from './FetchNewMeasurementData';
import { FetchMultipleMeasurements } from './FetchMultipleMeasurements';

const getMetrics = (state: IState) => {
  const { metrics } = state.metric;
  return metrics;
};

const getSelectedMetrics = (state: IState) => {
  const { selectedMetrics } = state.metric;
  return selectedMetrics;
};

const Metrics = () => {
  const dispatch = useDispatch();
  const metrics = useSelector(getMetrics);
  const selectedMetrics = useSelector(getSelectedMetrics);
  const measurementQuery = useMemo(
    () =>
      selectedMetrics.map((item: string) => {
        return {
          metricName: item,
          after: Date.now() - 1800000,
        };
      }),
    [selectedMetrics],
  );

  FetchMetricList();
  FetchNewMeasurementData();
  FetchMultipleMeasurements(measurementQuery);

  const handleSelectedChange = (_event: React.ChangeEvent<{}>, values: string[]) => {
    dispatch(actions.updateSelected(values));
  };

  return (
    <div>
      <Box display="flex" flexDirection="row">
        <Box display="flex" flexDirection="column">
          <Dropdown items={metrics} handleSelectedChange={handleSelectedChange} />
        </Box>
      </Box>
      <Graph />
      <Tiles />
    </div>
  );
};

export default () => {
  return <Metrics />;
};
