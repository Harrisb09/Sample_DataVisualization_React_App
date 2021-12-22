export type ApiErrorAction = {
  error: string;
};

export type WeatherForLocation = {
  description: string;
  locationName: string;
  temperatureinCelsius: number;
};
