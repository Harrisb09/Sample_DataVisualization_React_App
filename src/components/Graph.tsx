import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getDateFormat, getTimeFormat, measurementDataToChartFormat } from '../shared/UtilityHelper';

import { IState } from '../store';

const getGraphData = (state: IState) => {
  const { graphData } = state.metric;
  return graphData;
};

const Graph = () => {
  const graphData = useSelector(getGraphData);

  const data = useMemo(() => measurementDataToChartFormat(graphData), [graphData]);
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart data={data}>
        <Tooltip labelFormatter={(value: any) => getDateFormat(value)} />
        {Object.keys(graphData).map((key: any, i: number) => {
          const item = graphData[key];
          return (
            <Line
              type="monotone"
              key={key + '_' + i}
              dataKey={key}
              stroke={item.color}
              yAxisId={item.unit}
              strokeOpacity="1"
              activeDot={{ r: 8 }}
              isAnimationActive={false}
              dot={false}
            />
          );
        })}
        <XAxis
          dataKey="at"
          domain={['auto', 'auto']}
          interval={230}
          tickFormatter={(tick: any) =>getTimeFormat(tick)}
          type="number"
          scale="time"
        />
        {Object.keys(graphData).map((key: any, i: number) => {
          const item = graphData[key];
          return (
            <YAxis
              key={key + '_y_' + i}
              width={70}
              yAxisId={item.unit}
              type="number"
              unit={item.unit}
              scale="auto"
              domain={[0, 'auto']}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};
export default Graph;
