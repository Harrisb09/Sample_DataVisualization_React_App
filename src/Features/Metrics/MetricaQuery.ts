export const query = `
  query {
    getMetrics
  }
`;

export const getLastThirtyMinMeasurements = `
  query($measurementQuery:  [MeasurementQuery]) {
    getMultipleMeasurements(input: $measurementQuery) {
      metric
      measurements{
        metric
        at
        value
        unit
      }
    }
  }
`;

export const subscription = `
  subscription {
    newMeasurement{
      metric
      at
      value
      unit
    }
  }
`;
