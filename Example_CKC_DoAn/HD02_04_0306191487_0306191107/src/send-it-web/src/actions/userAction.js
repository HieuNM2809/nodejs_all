import { GET_USER, UPDATE } from './actionType';
import * as api from '../API/indexAPI';
import { toast } from 'wc-toast';

export const updateUser = (formData, id) => async (dispatch) => {
  try {
    const res = await api.updateUser(formData, id);

    dispatch({ type: UPDATE, data: res.data });
    toast.success('Update profile success');
    //console.log('Update profile success');
  } catch (error) {
    console.log(error);
  }
};
export const updateBg = (formData, id) => async (dispatch) => {
  try {
    const res = await api.updateBg(formData, id);

    dispatch({ type: UPDATE, data: res.data });
    toast.success('Update profile success');
    //console.log('Update profile success');
  } catch (error) {
    console.log(error);
  }
};

export const getUser = () => async (dispatch) => {
  try {
    // const data = JSON.parse(localStorage.getItem('profile'));
    //console.log(data);

    const res = await api.getAllUser();

    dispatch({
      type: GET_USER,
      payload: res.data.filter((i) => i.email !== 'admin@gmail.com'),
    });
  } catch (error) {
    console.log(error);
  }
};
