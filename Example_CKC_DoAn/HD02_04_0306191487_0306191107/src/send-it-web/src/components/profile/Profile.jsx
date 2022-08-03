/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/userAction';
import './profile.scss';

const Profile = ({ close }) => {
  const [form, setForm] = useState({ full_name: '', phone: '' });
  const [image, setImage] = useState({ preview: '', data: '' });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.authData);

  const handleInputChange = (e) =>
    setForm({
      ...form,
      full_name: e.target.value,
    });

  const handlePhoneChange = (e) =>
    setForm({
      ...form,
      phone: e.target.value,
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
    if (form.full_name !== '') {
      formData.append('full_name', form.full_name);
    }

    if (form.phone !== '') {
      formData.append('phone', form.phone);
    }

    dispatch(updateUser(formData, user._id));
  };

  const checkInput =
    image.preview || form.full_name ? false : true || form.phone ? false : true;
  //console.log(image.preview);

  return (
    <div className='profile'>
      <div className='container rounded bg-white mt-5 mb-5'>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='row'>
            <div className='col-md-3 border-right'>
              <div className='d-flex flex-column align-items-center text-center p-3 py-0'>
                <label className='pointer_on' htmlFor='change-profile-img'>
                  {!image.preview ? (
                    <img
                      crossOrigin='anonymous'
                      htmlFor='change-profile-img'
                      className='rounded-circle mt-5 mb-3 profile__img'
                      src={user ? user.image : './images/users/noAvatar.png'}
                    />
                  ) : (
                    <img
                      crossOrigin='anonymous'
                      htmlFor='change-profile-img'
                      className='rounded-circle mt-5 mb-3 profile__img'
                      src={user ? image.preview : './images/users/noAvatar.png'}
                    />
                  )}
                </label>
                <input
                  type='file'
                  className='form-control profile__input'
                  name='image'
                  id='change-profile-img'
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <span className='text-black-50 py-2'>
                  {user ? user.email : ''}
                </span>
              </div>
            </div>
            <div className='col-md-8 border-right'>
              <div className='p-3 py-0'>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <h4 className='text-right'>Profile Settings</h4>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-12'>
                    <label className='profile__labels'>Name</label>
                    <input
                      type='text'
                      className='form-control profile__input'
                      placeholder={user.full_name}
                      name='full_name'
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='row mt-3'>
                    <div className='col-md-12'>
                      <label className='profile__labels'>Phone</label>
                      <input
                        type='text'
                        className='form-control profile__input'
                        placeholder={user.phone}
                        name='phone'
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>
                  <div className='mt-5 text-end'>
                    <button className='profile__button mx-3' onClick={close}>
                      Cancel
                    </button>
                    {checkInput ? (
                      <span className='profile__buttonUnhandled' type='text'>
                        Save Profile
                      </span>
                    ) : (
                      <button className='profile__button' type='submit'>
                        Save Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
