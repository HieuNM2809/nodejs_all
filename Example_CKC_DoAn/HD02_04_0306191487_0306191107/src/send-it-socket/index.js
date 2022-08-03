const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

const PORT = process.env.PORT || 8900;
app.get('/', (req, res) => {
  res.send('Running');
});

var listUser = [];

const addUser = (userId, socketId) => {
  !listUser.some((user) => user.userId === userId) &&
    listUser.push({ userId, socketId });
};
const handleIdCall = (userId, socketId) => {
  !idCall.some((user) => user.userId === userId) &&
    idCall.push({ userId, socketId });
};

const removeUser = (socketId) => {
  listUser = listUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  const findUser = listUser.find((user) => user.userId === userId);
  return findUser;
};

io.on('connection', (socket) => {
  //when something connect
  console.log('Users connected!');

  //take user from client
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', listUser);
  });

  //send and get message
  socket.on('sendMessage', (data) => {
    if (!data.isGroup) {
      const users = getUser(data.receiverId);
      if (users) {
        io.to(users.socketId).emit('getMessage', data);
      }
    } else {
      for (let i = 0; i < data.receiverId.length; i++) {
        const users = getUser(data.receiverId[i].id);
        if (users) {
          io.to(users.socketId).emit('getMessage', data);
        }
      }
    }
  });

  //create new group chat
  socket.on('createNewGroupChat', (data) => {
    for (let i = 0; i < data.receivers.length; i++) {
      const users = getUser(data.receivers[i].id);
      if (users) {
        io.to(users.socketId).emit('getNewGroupChat', {
          conversationId: data.conversationId,
        });
      }
    }
  });

  // update conversation when its have new private chat
  socket.on('sendNewPrivateChat', ({ receiverId, conversationId }) => {
    const users = getUser(receiverId);
    if (users) {
      io.to(users.socketId).emit('getNewPrivateChat', { conversationId });
    }
  });

  //delete message
  socket.on('deleteMessage', (data) => {
    if (!data.isGroup) {
      const users = getUser(data.receiverId);
      if (users) {
        io.to(users.socketId).emit('updateDeletedMessage', data);
      }
    } else {
      for (let i = 0; i < data.receiverId.length; i++) {
        const users = getUser(data.receiverId[i].id);
        if (users) {
          io.to(users.socketId).emit('updateDeletedMessage', data);
        }
      }
    }
  });

  //emoji
  socket.on('emojing', (data) => {
    if (!data.isGroup) {
      const users = getUser(data.receiverId);
      if (users) {
        io.to(users.socketId).emit('getEmojing', data);
      }
    } else {
      for (let i = 0; i < data.receiverId.length; i++) {
        const users = getUser(data.receiverId[i].id);
        if (users) {
          io.to(users.socketId).emit('getEmojing', data);
        }
      }
    }
  });

  //when something disconnect
  socket.on('disconnect', () => {
    console.log('an user has disconnected');
    removeUser(socket.id);
    io.emit('getUsers', listUser);
  });

  socket.on('callUser', (data) => {
    const users = getUser(data.userToCall);
    if (users) {
      io.to(users.socketId).emit('getCallUser', {
        signal: data.signalData,
        from: data.from,
        name: data.name,
        currentBoxChat: data.currentBoxChat,
        avatar: data.avatar,
      });
    }
  });

  socket.on('answerCall', (data) => {
    const users = getUser(data.to);
    console.log('answerCall');
    console.log(users);

    console.log(data);
    if (users) {
      io.to(users.socketId).emit('callAccepted', data.signal);
    }
  });
  socket.on('leaveCall', (data) => {
    const users = getUser(data.to);
    console.log(users);

    if (users) {
      io.to(users.socketId).emit('leaveCallAccepted');
    }
  });

  //when something disconnect
  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
