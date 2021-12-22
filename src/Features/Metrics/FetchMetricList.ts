import { useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { query } from './MetricaQuery';
import { actions } from './reducer';

export const FetchMetricList = () => {
    const dispatch = useDispatch();
  
    const [result] = useQuery({
      query,
    });
    const { data, error } = result;
  
    useEffect(() => {
      if (error) {
        dispatch(actions.metricsApiErrorAction({ error: error.message }));
        return;
      }
      if (!data) return;
      const { getMetrics } = data;
      dispatch(actions.setMetrics(getMetrics));
    }, [dispatch, data, error]);
  };