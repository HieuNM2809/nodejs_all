import React from 'react';
import { useSelector } from 'react-redux';
import { ContextProvider } from '../../actions/context';
import Topbar from '../../components/topbar/Topbar';
import Admin from '../admin/Admin';
import Messenger from '../messenger/Messenger';

const Home = () => {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <>
      <Topbar />
      {user.isAdmin ? (
        <Admin />
      ) : (
        <ContextProvider>
          <Messenger />
        </ContextProvider>
      )}
      {/* <ContextProvider>
        <Messenger />
      </ContextProvider> */}
    </>
  );
};

export default Home;
