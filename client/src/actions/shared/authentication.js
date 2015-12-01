import {createAction} from 'redux-actions';
import {tokensAPI} from '../../api';

export const actions = {
  START_LOGIN: 'START_LOGIN',
  START_LOGOUT: 'START_LOGOUT',
};

export const startLogin = createAction(actions.START_LOGIN, tokensAPI.createToken);
export const startLogout = createAction(actions.START_LOGOUT);
