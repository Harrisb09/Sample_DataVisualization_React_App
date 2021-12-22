import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLastThirtyMinMeasurements } from './MetricaQuery';
import { actions } from './reducer';
import { useQuery } from 'urql';

export const FetchMultipleMeasurements = (measurementQuery: any[]) => {
  const dispatch = useDispatch();
  const [result] = useQuery({
    query: getLastThirtyMinMeasurements,
    variables: {
      measurementQuery,
    },
  });
  const { data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorAction({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    const graphData: any = {};
    for (let i = 0; i < getMultipleMeasurements.length; i++) {
      graphData[getMultipleMeasurements[i].metric] = {
        unit: getMultipleMeasurements[i].measurements[0].unit,
        data: getMultipleMeasurements[i].measurements,
      };
    }
    dispatch(actions.setGraphData(graphData as any));
  }, [dispatch, data, error]);
};
