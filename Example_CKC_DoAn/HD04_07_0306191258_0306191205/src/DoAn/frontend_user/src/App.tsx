import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Home from './pages/Home';
import Routers from './routers';
import RoutersAdmin from 'routers/Admin';
import AdminPage from 'pages/Admin';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
  <>
        <Routers></Routers>
   
      {/* <AdminPage></AdminPage> */}
  </>

 
  );
}

export default App;
