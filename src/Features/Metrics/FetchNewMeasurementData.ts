import { useSubscription } from 'urql';
import { useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { subscription } from './MetricaQuery';
import { actions } from './reducer';

export const FetchNewMeasurementData = () => {
    const dispatch = useDispatch();
    const receiveMeasurement = useCallback(measurement => dispatch(actions.setMeasurementData(measurement)), [dispatch]);
  
    const [result] = useSubscription({
      query: subscription,
      variables: {},
    });
    const { data, error } = result;
    useEffect(() => {
      if (error) {
        dispatch(actions.metricsApiErrorAction({ error: error.message }));
        return;
      }
      if (!data) {
        return;
      }
      const { newMeasurement } = data;
      receiveMeasurement(newMeasurement);
    }, [data, error, dispatch, receiveMeasurement]);
  };