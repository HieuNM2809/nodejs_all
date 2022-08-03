import React, { useState } from 'react';
import './register.scss';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { signUp } from '../../actions/authAction';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { INITIAL_STATE } from '../../actions/actionType';

export default function Register() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState(INITIAL_STATE);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();

    return setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(form);
    dispatch(signUp(form, history));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   if (passwordAgain.current.value !== password.current.value) {
  //     passwordAgain.current.setCustomValidity("Passwords don't match!");
  //   } else {
  //     const user = {
  //       uid: uuidv4(),
  //       email: email.current.value,
  //       password: password.current.value,
  //       phone: phoneNumbers.current.value,
  //     };
  //     try {
  //       await axios.post('/auth/register', user);
  //       history('/login');
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  return (
    <>
      <img class='bg-sign-up' src='./images/login-bg.gif' alt='loginbg' />
      <div className='register'>
        <div className='register__wrapper'>
          <div className='register__title'>
            <h2>Register</h2>
          </div>
          <form className='register__box' onSubmit={handleSubmit}>
            <input
              placeholder='Full Name'
              required
              onChange={handleChange}
              className='register__input'
              type='text'
              name='full_name'
            />
            <input
              placeholder='Email'
              required
              onChange={handleChange}
              className='register__input'
              type='email'
              name='email'
            />
            <div className='login__inputPassword'>
              <input
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                required
                minLength='6'
                className='login__input login__inputPass'
                onChange={handleChange}
                name='password'
              />
              <button
                className='login__buttonPass'
                onClick={handleShowPassword}
                type='button'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
            <input
              placeholder='Confirm Password'
              required
              // onChange={handleChange}
              className='register__input'
              type='password'
            />
            <button className='register__button' type='submit'>
              Create Account
            </button>
            <span className='register__linkTag'>
              You have account
              <Link to='/login' className='register__linkTag--title'>
                &nbsp;Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
