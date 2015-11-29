import {createAction} from 'redux-actions';
import {tokensAPI} from '../../api';

export const actions = {
  START_LOGIN: 'START_LOGIN',
};

export const startLogin = createAction(actions.START_LOGIN, tokensAPI.createToken);
