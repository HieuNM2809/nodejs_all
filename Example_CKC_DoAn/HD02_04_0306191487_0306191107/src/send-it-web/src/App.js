import { React, useEffect } from 'react';
import '../src/scss/app.scss';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/home/Home';
import { useDispatch, useSelector } from 'react-redux';
import Landing from './pages/landing/Landing';
import { getLogin } from './actions/authAction';
import { getUser } from './actions/userAction';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLogin());
    dispatch(getUser());
  });

  const user = useSelector((state) => state.authReducer.check);

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={user ? <Home /> : <Landing />} />
        <Route
          path='/login'
          element={user ? <Navigate replace to='/' /> : <Login />}
        />
        <Route
          path='/register'
          element={user ? <Navigate replace to='/' /> : <Register />}
        />
      </Routes>
    </Router>
  );
}
export default App;
