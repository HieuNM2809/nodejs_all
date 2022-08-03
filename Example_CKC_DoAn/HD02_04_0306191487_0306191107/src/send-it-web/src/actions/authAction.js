import { GET_LOGIN, LOGIN, REGISTER } from './actionType';
import * as api from '../API/indexAPI';
import { toast } from 'wc-toast';

export const signUp = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: REGISTER, data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, router) => async (dispatch) => {
  try {
    //console.log(formData);
    const res = await api.signIn(formData);
    dispatch({ type: LOGIN, data: res.data });
    toast.success('Login success');
  } catch (error) {
    // console.log(error);
    toast.error(error.response.data);
  }
};

export const signInGG = (formData, router) => async (dispatch) => {
  try {
    //console.log(formData);
    const res = await api.signIn(formData);

    if (res.status == 200) {
      dispatch({ type: LOGIN, data: res.data });
    }

    if (res.status == 404) {
      signUp(formData, router);
    }

    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const getLogin = () => (dispatch) => {
  try {
    const data = JSON.parse(localStorage.getItem('profile'));

    dispatch({ type: GET_LOGIN, payload: data });
  } catch (error) {
    console.log(error);
  }
};
