import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { useDispatch } from 'react-redux';
import { INITIAL_STATE, LOGIN } from '../../actions/actionType';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import GoogleLogin from 'react-google-login';
import { signIn } from '../../actions/authAction';
import { gapi } from 'gapi-script';
import * as api from '../../API/indexAPI';
import { toast } from 'wc-toast';

const Login = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  // const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (e) => {
    e.preventDefault();

    return setShowPassword(!showPassword);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          '838859453967-o3nau895e7bqis1pko7uuhjfqc7vl43r.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  // const switchMode = () => {
  //   setForm(INITIAL_STATE);
  //   setIsSignup((prevIsSignup) => !prevIsSignup);
  //   setShowPassword(false);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(form);

    dispatch(signIn(form, history));
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      //console.log(result.email);
      const ress = await api.checkUser({ email: result.email });

      //console.log(ress.data.mes);
      if (ress.data.mes === 'yes') {
        // console.log('yes');
        dispatch({ type: LOGIN, data: result });
      }

      if (ress.data.mes === 'no') {
        console.log('no');
        localStorage.setItem('profile', JSON.stringify({ result }));
        await api.signUp({
          email: result.email,
          password: result.googleId,
          full_name: result.displayName,
        });
        // signUp(
        //   {
        //     email: result.email,
        //     password: result.googleId,
        //     full_name: result.displayName,
        //   },
        //   history
        // );
      }
      // return history('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => {
    console.log(error);
    //console.log('Google Sign In was unsuccessful. Try again later');
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // const google = () => {
  //   window.open('http://localhost:8800/auth/google', '_self');
  // };

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   loginCall(
  //     { email: email.current.value, password: password.current.value },
  //     dispatch
  //   );
  // };
  // const { user } = useSelector((state) => state.authData);

  return (
    <>
      <wc-toast />
      <img className='bg-sign-up' src='./images/login-bg.gif' alt='loginbg' />
      <div className='login'>
        <div className='login__wrapper p-3'>
          <div className='login__title'>
            <h2>Login</h2>
          </div>
          {/* <img
            className='login__logo'
            src='./images/logo.png'
            alt='./images/logo.png'
          /> */}
          <form className='login__box' onSubmit={handleSubmit}>
            <input
              placeholder='Email'
              type='email'
              required
              className='login__input'
              onChange={handleChange}
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

            <div className='login__navLinkContainer'>
              <span>
                {/* <Link to='/forgot' className='login__navLinkContainer--title'>
                  Forgot Password?
                </Link> */}
              </span>
              {/* <span className='login__navLink'>
                <GoogleLogin
                  clientId='838859453967-o3nau895e7bqis1pko7uuhjfqc7vl43r.apps.googleusercontent.com'
                  render={(renderProps) => (
                    <div
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='login__navLinkContainer--title'
                    >
                      Login with Google
                    </div>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy='single_host_origin'
                />
              </span> */}
            </div>

            <button
              className='login__button'
              type='submit'
              // disabled={isFetching}
            >
              Log In
            </button>
            <span className='login__createAccount'>
              Don&#39;t have account
              <Link to='/register' className='login__navLinkContainer--title'>
                &nbsp;Create account
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

// const Loading = () => {
//   return (
//     <Spinner animation='border' role='status'>
//       <span className='visually-hidden'>Loading...</span>
//     </Spinner>
//   );
// };

export default Login;
