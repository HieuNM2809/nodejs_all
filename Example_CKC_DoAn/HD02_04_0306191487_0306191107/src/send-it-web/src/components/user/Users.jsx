import './userList.scss';
import { DataGrid } from '@material-ui/data-grid';
import { NotInterested, Visibility } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import UserDetailAdmin from '../userDetailAdmin/UserDetailAdmin';
const Users = () => {
  const user = useSelector((state) => state.usersReducer.users);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (user !== null) {
      setData(
        user.map((user, index) => {
          return {
            id: index,
            idUser: user._id,
            full_name: user.full_name,
            image: user.image,
            conversations: user.conversations.length,
            email: user.email,
            isAdmin: user.isAdmin ? true : false,
          };
        })
      );
    }
  }, [user]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'STT', width: 110 },
    // {
    //   field: 'idUser',
    //   headerName: 'ID User',
    //   width: 250,
    // },
    {
      field: 'user',
      headerName: 'Name',
      width: 230,
      renderCell: (params) => {
        return (
          <div className='userListUser'>
            <img className='userListImg' src={params.row.image} alt='' />
            {params.row.full_name}
          </div>
        );
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
    },
    {
      field: 'conversations',
      headerName: 'Conversations',
      width: 200,
    },
    {
      field: 'isAdmin',
      headerName: 'Role',
      width: 110,
      renderCell: (params) => {
        return <div>{params.row.isAdmin ? 'Admin' : 'Customer'}</div>;
      },
    },

    {
      field: 'detail',
      headerName: 'Detail',
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <Popup
              contentStyle={{
                width: '500px',
                background: 'transparent',
                border: 'none',
              }}
              modal
              trigger={
                <Visibility
                  className='userView'
                  //onClick={() => console.log(params.row.idUser)}
                />
              }
            >
              {(close) => <UserDetailAdmin close={close} user={params.row} />}
            </Popup>
          </>
        );
      },
    },
    // {
    //   field: 'disable',
    //   headerName: 'Disable',
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <NotInterested
    //           className='userListDelete'
    //           onClick={() => handleDelete(params.row._id)}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];
  return (
    <div className='userList'>
      {data && (
        <DataGrid
          //onRowClick={() => console.log('hehehe')}
          rows={data}
          columns={columns}
          pageSize={data.length / 2}
          disableSelectionOnClick
        />
      )}
    </div>
  );
};

export default Users;
