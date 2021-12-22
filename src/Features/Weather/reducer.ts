import { createSlice, PayloadAction } from 'redux-starter-kit';
import { ApiErrorAction, WeatherForLocation } from '../../shared/ActionType';
import { convertToFarenhit } from '../../shared/UtilityHelper';
import { initialState } from './initialState';

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    weatherDataRecevied: (state, action: PayloadAction<WeatherForLocation>) => {
      const { description, locationName, temperatureinCelsius } = action.payload;
      state.temperatureinCelsius = temperatureinCelsius;
      state.temperatureinFahrenheit = convertToFarenhit(temperatureinCelsius);
      state.description = description;
      state.locationName = locationName;
    },
    weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
