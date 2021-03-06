import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions as WeatherActions } from './reducer';
import { PayloadAction } from 'redux-starter-kit';
import { ApiErrorAction } from '../../shared/ActionType';

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error Occured: ${action.payload.error}`);
}

export default function* watchApiError() {
  yield takeEvery(WeatherActions.weatherApiErrorReceived.type, apiErrorReceived);
}
