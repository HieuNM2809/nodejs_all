import axios from 'axios';

export const loginCall = async (userLogin, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.post('/auth/login', userLogin);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error });
  }
};
export const loginCallGg = async (dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.get('/auth/success');
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error });
  }
};
