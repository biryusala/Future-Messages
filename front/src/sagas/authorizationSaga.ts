import {IAction, setLoader, setSigninErrorMsg} from '../redux/actionCreators';
import { put, call, takeEvery } from 'redux-saga/effects'
import { setAuthorized } from "../redux/actionCreators";
import actionTypes from "../redux/actionTypes";
import AuthorizationService from '../services/authorizationService';
import {AuthDTO, SignOutDTO} from '../types/dto';
import { IAuthorizationService } from '../types/authorization';

let refreshIntervalId: NodeJS.Timeout;
const service: IAuthorizationService = new AuthorizationService();

async function refreshToken() {
  let oldToken: string | null = sessionStorage.getItem('refresh');

  if (!oldToken || oldToken === "undefined") {
    oldToken = localStorage.getItem('refresh');
  }

  if (oldToken && oldToken !== "undefined") {
    const result: AuthDTO = await service.refreshToken(oldToken);

    if (localStorage.getItem('refresh')) {
      localStorage.setItem('refresh', result.refresh);
    } else {
      sessionStorage.setItem('refresh', result.refresh);
    }
  } else {
    clearInterval(refreshIntervalId);
    put(setAuthorized(false));
  }
}

function* signInWorker(action: IAction) {
  try {
    const authorizationData: AuthDTO = yield call(service.signIn, action.payload)

    if (authorizationData.statusCode === 400) {
      console.error(authorizationData.message);
      yield put(setSigninErrorMsg('Введены некорректные данные'));
    }

    if (authorizationData?.refresh) {
      localStorage.setItem('login', action.payload.login);
      if (action.payload.remember) {
        localStorage.setItem('refresh', authorizationData.refresh);
      } else {
        localStorage.removeItem('refresh');
        sessionStorage.setItem('refresh', authorizationData.refresh);
      }

      refreshIntervalId = setInterval(refreshToken, 60000);

      yield put(setAuthorized(true));
      yield put(setSigninErrorMsg(''));
    }
  } catch(e: any) {
    console.error('An error thrown while dispatching signing, result: ', e.message);
  }
}

function* signOutWorker() {
  try {
    yield put(setLoader(true));

    const refresh: string | null = sessionStorage.getItem('refresh') || localStorage.getItem('refresh');
    const signOutResponse: SignOutDTO = yield call(service.signOut, refresh);

    if (signOutResponse) {
      clearInterval(refreshIntervalId);
      localStorage.removeItem('refresh');
      sessionStorage.removeItem('refresh');

      yield put(setAuthorized(false));
    }

    yield put(setLoader(false));
  } catch(e: any) {
    console.error('An error thrown while dispatching signout, result: ', e.message);

    yield put(setLoader(false));
  }
}

function* checkAuthorization() {
  try {
    yield put(setLoader(true));

    const sessionRefresh = sessionStorage.getItem('refresh');
    const localRefresh = localStorage.getItem('refresh');
    const validRefresh = sessionRefresh && sessionRefresh !== 'undefined' ? sessionRefresh :
      localRefresh && localRefresh !== 'undefined' ? localRefresh : '';

    const newRefresh: AuthDTO = yield service.refreshToken(validRefresh);

    if (newRefresh.refresh) {
      sessionRefresh && sessionRefresh !== 'undefined' && sessionStorage.setItem('refresh', newRefresh.refresh);
      localRefresh && localRefresh !== 'undefined' && localStorage.setItem('refresh', newRefresh.refresh);

      yield put(setAuthorized(true));
    } else {
      yield put(setAuthorized(false));
    }

    yield put(setLoader(false));
  } catch(e: any) {
    console.error('An error thrown while checking user\'s authorization status: ', e.message);

    yield put(setLoader(false));
  }
}

function* authorizationSaga() {
  yield takeEvery(actionTypes.SIGNIN, signInWorker);
  yield takeEvery(actionTypes.SIGNOUT, signOutWorker);
  yield takeEvery(actionTypes.CHECK_AUTHORIZATION_STATUS, checkAuthorization);
}

export default authorizationSaga;