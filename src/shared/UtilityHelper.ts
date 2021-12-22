import { randomHex } from './Constants';
import moment from 'moment';

export const getRandomColor = (): string => {
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += randomHex[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const convertToFarenhit = (c: number) => (c * 9) / 5 + 32;

export const measurementDataToChartFormat = (graphData: any) => {
  const list = [];

  if (graphData && Object.keys(graphData).length === 0) {
    return null;
  }

  let minLen = 999;
  for (const key in graphData) {
    const cLen = graphData[key].data.length;
    minLen = minLen > cLen ? cLen : minLen;
  }

  for (let i = 0; i < minLen; i++) {
    let obj = {} as any;
    for (const key in graphData) {
      obj[key] = graphData[key].data[i].value;
      obj['at'] = graphData[key].data[i].at;
    }
    list.push(obj);
  }
  return list;
};

export const getDateFormat = (value: any) => moment(value).format('MM-DD-YYYY hh:mm:ss');
export const getTimeFormat = (tick: any) => moment(tick).format('hh:mm');
