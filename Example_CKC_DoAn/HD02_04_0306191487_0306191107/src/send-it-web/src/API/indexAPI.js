import axios from 'axios';

const API = axios.create({
  //baseURL: 'https://send-it-apii.herokuapp.com/api/',
  baseURL: 'http://localhost:8800/api/',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

export const signUp = (formData) => API.post('auth/register', formData);
export const signIn = (formData) => API.post('auth/login', formData);

export const checkUser = (formData) => API.post('user/checkuser', formData);
export const getAllUser = () => API.get('user/');

//get conversation
export const getConversation = (userId) =>
  API.get(`/conversation/conversation_of/${userId}`);

export const updateIsReadStatusApi = (isReadObject) =>
  API.put('/conversation/update/readStatus', isReadObject);

//create new conversation
export const createNewConversation = (newConversation) =>
  API.post('/conversation', newConversation);

//getUserStatistical
export const userStatisticalApi = (userId) =>
  API.get(`/user/userStatistical/${userId}`);

export const userFilter = (formData) => API.post('user/filter', formData);
export const updateUser = (formData, id) => API.put(`user/${id}`, formData);
export const updateBg = (formData, id) =>
  API.put(`user/update_bg/${id}`, formData);

export const getMessages = (conversationId) =>
  API.get(`message/${conversationId}`);
export const emojiMessageApi = (emote) => API.put(`message/emoji`, emote);
export const deleteMessage = (data) => API.put('message/delete', data);
export const sendMessage = (data) => API.post('message', data);
export const sendMessageImage = (formData) =>
  API.post('message/sendImageMessage', formData);
