import {handleActions} from 'redux-actions';

const initialState = {
  authToken: null,
  user: null
};

function startLogin(state, action) {
  const newState = {authToken: action.payload.authToken, user: action.payload.user}
  return Object.assign({}, state, newState);
}

function startLogout(state, action) {
  return Object.assign({}, initialState);
}

export default handleActions({
  START_LOGIN: startLogin,
  START_LOGOUT: startLogout
}, initialState);
