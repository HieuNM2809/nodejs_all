let http = require("http");
let express = require("express");
const bodyParser = require('body-parser')
const mysql = require('mysql')
let socketIo = require("socket.io");
let path = require("path");
const app = express();
const redis = require('redis')
var CryptoJS = require("crypto-js");
var moment = require('moment');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');
const formatMessage = require('./utils/messages');
const botName = 'ChatRoom Bot';
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'dist')));
let _http = http.createServer(app);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set("port", 'http://192.168.1.109:3000');

_http.listen(port, () => {
  console.log(`start server`, `Running on local : http://192.168.1.109:3000`)
})
const ws = socketIo(_http, {
  serveClient: true,
  // pingInterval: 60000,
  // pingTimeout: 60000000,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: 10,
  cors: {
    origin: "http://192.168.1.109:4200",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: [
    "websocket",
    "polling"
  ]
})
// connect database
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'socket-demo',
  port: 3300
});

con.connect(function (err) {
  if (err) {
    console.log(err);
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
ws.on("connect", socket => {
  // console.log("request", socket);
  console.log("authorization ==>", socket.handshake.auth.authorization);
  if (socket.handshake.auth.authorization && socket.handshake.auth.authorization.length > 13) {
    // console.log(socket);
    listensSocket(socket)
    // console.log("Connected client on port %s.", 'http://192.168.1.109:3000');
  }
  else {
    socket.on('error', (error) => {
      console.log(error);
      // ...
    });
  }
  // listensSocket(socket)

})
async function checkIsUserChat(name) {
  var sql = `SELECT * FROM ` + `user_socket` + ` WHERE ` + `name` + ` = '${name}'`
  return await new Promise((resolve, reject) => {
    con.query(sql.trim(), (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }

    })
  })
}
async function getUserChat(name) {
  var sql = `SELECT * FROM ` + `user_socket` + ` WHERE ` + `name` + ` = '${name}'`
  return await new Promise((resolve, reject) => {
    con.query(sql.trim(), (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }

    })
  })
}
function insertUserChat(id, username, room, s_id) {
  var token = CryptoJS.SHA256(`${id}+${s_id}+${username}`)
  var sql = `INSERT INTO ` + `user_socket` + `(` + `id` + `, ` + `s_id` + `, ` + `name` + `, ` + `access_token` + `, ` + `room` + `,` + `create_time` + `) 
  VALUES ('${id}','${s_id}','${username}','${token}','${room}','${moment().format()}')`
  con.query(sql, function (err, result) {
    if (err) {
      console.log('Query error: ', err);
      return;
    }
    return result
  })
}
function insertMessage(data) {
  var sql = `INSERT INTO ` + `message_socket` + `(` + `id` + `, ` + `room` + `, ` + `name` + `, ` + `text` + `, ` + `type` + `,` + `s_id` + `,` + `time` + `) 
  VALUES ('${data.id}','${data.room}','${data.name}','${data.text}','${data.type}','${data.s_id}','${moment().format()}')`
  con.query(sql, function (err, result) {
    if (err) {
      console.log('Query error: ', err);
      return;
    }
    return result
  })
}
async function getMessages(room) {
  var sql = `SELECT * FROM ` + `message_socket` + ` WHERE ` + `room` + ` = '${room}'`
  return await new Promise((resolve, reject) => {
    con.query(sql.trim(), (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }

    })
  })
}
async function getListUserByRoomName(room) {
  var sql = `SELECT * FROM ` + `user_socket` + ` WHERE ` + `room` + ` = '${room}' AND` + ` status` + ` =1`
  return await new Promise((resolve, reject) => {
    con.query(sql.trim(), (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }

    })
  })
}
async function updateThemeInRoomChat(theme, room) {
  var sql = `UPDATE ` + `room_chat` + ` SET ` + `theme` + `='${theme}' WHERE ` + `name_room` + `='${room}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log('Query error: ', err);
      return;
    }
    return result
  })
}
async function getThemeByRoomName(room) {
  var sql = `SELECT * FROM ` + `room_chat` + ` WHERE ` + `name_room` + ` = '${room}'`
  return await new Promise((resolve, reject) => {
    con.query(sql.trim(), (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }

    })
  })
}
async function updateStatusUserChat(name, status){
  var sql = `UPDATE ` + `user_socket` + ` SET ` + `status` + `=${status} WHERE ` + `name` + `='${name}'`;
  con.query(sql, function (err, result) {
    if (err) {
      console.log('Query error: ', err);
      return;
    }
    return result
  })
}

async function listensSocket(socket) {
  socket.on('join', async ({ username, room }) => {
    const s_id = Math.floor(Math.random() * (10000000)) + 1;
    const isUserChat = await checkIsUserChat(username)
    console.log(isUserChat);
    if (!isUserChat && isUserChat.length === 0) {
      console.log("vao insert");
      console.log(isUserChat);
      // insertUserChat(socket.id, username, room, s_id)
      // console.log(insertUserChat(socket.id, username, room, s_id));
    }
    else{
      console.log("đã tồn tại");
      try {
        await updateStatusUserChat(username)
      } catch (error) {
        console.log(error);
      }
    }
    const user = await getUserChat(username);
    if (user && user.length > 0) {
      socket.emit('/api/getCurrentUser', { "status": 200, "data": await getUserChat(username), "message": "successful" })
      socket.join(user[0].room);
      ws.to(user[0].room).emit('message', await getMessages(user[0].room));

      if (checkIsUserChat(username)) {
        socket.emit('message', formatMessage(botName, botName, 'Welcome to ChatRoom!'));

        socket.broadcast
          .to(user[0].room)
          .emit(
            'message',
            formatMessage(botName, `${user[0].name} has joined the chat`)
          );
      }
      const theme = await getThemeByRoomName(user[0].room)
      if (theme && theme.length > 0) {
        ws.to(user[0].room).emit('color', theme[0].theme);
      }

      // Send users and room info
      ws.to(user[0].room).emit('roomUsers', await getListUserByRoomName(user[0].room));
    }
  })
  socket.on("message", async (m) => {
    console.log("[server](message): %s", JSON.stringify(m));
    const user = await getUserChat(m.user);
    const data = {
      id: new Date().getTime(),
      room: user[0].room,
      name: user[0].name,
      text: m.message,
      type: m.type,
      s_id: user[0].s_id,
      time: moment().format('yyyy-mm-dd hh:mm:ss'),
    }
    insertMessage(data)
    ws.to(user[0].room).emit('message', await getMessages(user[0].room));
    // send to all clients
    // ws.emit("message", m);
    // return to all clients connected
    // socket.emit("message", m)
    // send to all clients except sender
    // socket.broadcast.emit('message', m);


  });
  socket.on('colorThem', async ({ color, name }) => {
    const user = await getUserChat(name);
    if (user && user.length > 0) {
      updateThemeInRoomChat(color, user[0].room)
    }
    // ws.to(user[0].room).emit('message', formatMessage(botName, botName, `${user[0].name} has changed the theme color`));
    // ws.to(user.room).emit('message', formatMessage(botName, `${user.username} has changed the theme color`));
    ws.to(user[0].room).emit('color', color);

  })
  socket.on('leave', () => {
    const user = userLeave(socket.id);
    if (user) {
      ws.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      ws.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
  socket.on('/api/list-room', () => {
    var sql = 'SELECT `id`, `name_room` FROM `room_chat` ORDER BY `room_chat`.`id` ASC'
    con.query(sql, function (err, result) {
      if (err) {
        console.log('Query error: ', err);
        return;
      }
      socket.emit('/api/list-room', { "status": 200, "data": result, "message": "successful" })
    });
  })
  socket.on("disconnect", () => {
    console.log("Client disconnect");
    const user = userLeave(socket.id);

    if (user) {
      ws.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      ws.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
      ws.socket.connect()
    }
  });
}