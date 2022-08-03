/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBg } from '../../actions/userAction';
import './backgroundConversation.scss';

const BackgroundConversation = ({ close }) => {
  const [form, setForm] = useState({ full_name: '' });
  const [image, setImage] = useState({ preview: '', data: '' });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.authData);

  const handleInputChange = (e) =>
    setForm({
      full_name: e.target.value,
    });

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (image.data !== '') {
      formData.append('image', image.data);
      formData.append('check_img', true);
    }
    dispatch(updateBg(formData, user._id));
  };

  const checkInput = image.preview || form.full_name ? false : true;
  //console.log(image.preview);

  return (
    <div className='bgConversation'>
      <div className='container rounded bg-white mt-5 mb-5'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='row'>
            <h4 className='text-right'>Change your background</h4>
            <div className='col-md-12 border-right'>
              <div className='d-flex flex-column align-items-center text-center p-3 py-0'>
                <label className='pointer_on' htmlFor='change-profile-bg'>
                  {!image.preview ? (
                    <img
                      crossOrigin='anonymous'
                      htmlFor='change-profile-bg'
                      className='mt-5 mb-3 bgConversation__img'
                      src={
                        user
                          ? user.dashboard_bg_color
                          : './images/users/noAvatar.png'
                      }
                    />
                  ) : (
                    <img
                      crossOrigin='anonymous'
                      htmlFor='change-profile-bg'
                      className='mt-5 mb-3 bgConversation__img'
                      src={user ? image.preview : './images/users/noAvatar.png'}
                    />
                  )}
                </label>
                <input
                  type='file'
                  id='change-profile-bg'
                  className='form-control bgConversation__input'
                  name='image'
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className='mt-5 text-end'>
              <button className='bgConversation__button mx-3' onClick={close}>
                Cancel
              </button>
              {checkInput ? (
                <span className='bgConversation__buttonUnhandled' type='text'>
                  Save
                </span>
              ) : (
                <button className='bgConversation__button' type='submit'>
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BackgroundConversation;
