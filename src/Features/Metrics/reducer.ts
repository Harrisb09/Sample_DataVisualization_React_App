import { createSlice, PayloadAction } from 'redux-starter-kit';
import { ApiErrorAction } from '../../shared/ActionType';
import { getRandomColor } from '../../shared/UtilityHelper';
import { initialState } from './InitialState';

const slice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    setMetrics: (state, action) => {
      state.metrics = action.payload;
    },
    updateSelected: (state, action) => {
      state.selectedMetrics = action.payload;
      const measurementData: any = {};
      action.payload.forEach((metric: string) => {
        measurementData[metric] = {};
      });
      state.measurementData = measurementData;
    },
    setGraphData: (state, action) => {
      const graphData: any = {};
      for (const metric in action.payload) {
        graphData[metric] = {
          unit: action.payload[metric].unit,
          data: action.payload[metric].data,
          color: getRandomColor(),
        };
      }
      state.graphData = graphData;
    },
    setMeasurementData: (state, action: any) => {
      if (state.selectedMetrics.indexOf(action.payload.metric) > -1) {
        state.measurementData[action.payload.metric] = action.payload;
      }
      const graphData = state.graphData;
      if (
        graphData[action.payload.metric] &&
        graphData[action.payload.metric].data &&
        graphData[action.payload.metric].data.length > 0
      ) {
        graphData[action.payload.metric].data.push(action.payload);
        graphData[action.payload.metric].data.shift();
      }
      state.graphData = graphData;
    },
    metricsApiErrorAction: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
