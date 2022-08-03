import React from 'react';
import { useSelector } from 'react-redux';
import Chart from '../../components/chart/Chart';
import NewJoinMember from '../../components/new_join_member/NewJoinMember';
import Users from '../../components/user/Users';
import { userData } from '../../static/admin';
import './admin.scss';

const Admin = () => {
  return (
    <div className='admin'>
      {/* <Chart
        data={userData}
        title='User Analytics'
        dataKey='Active user'
        grid
      /> */}
      <div className='homeWidgets'>
        <Users />
        {/* <NewJoinMember /> */}
      </div>
    </div>
  );
};

export default Admin;
