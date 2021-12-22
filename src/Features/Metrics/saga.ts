import { toast } from 'react-toastify';
import { PayloadAction } from 'redux-starter-kit';
import { takeEvery, call } from 'redux-saga/effects';
import { actions as MetricActions } from './reducer';
import { ApiErrorAction } from '../../shared/ActionType';

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* watchApiError() {
  yield takeEvery(MetricActions.metricsApiErrorAction.type, apiErrorReceived);
}

