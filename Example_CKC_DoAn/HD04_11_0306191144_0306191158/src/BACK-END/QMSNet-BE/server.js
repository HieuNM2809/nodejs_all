require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./app/config/db');
const routes = require('./routes');
const cors = require('cors');
const socketSever = require('./socketSever');
const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect DB
db.connect();

const http = require('http').Server(app);

const io = require('socket.io')(http, {
    cors: {
        // origin: [`${process.env.CLIENT_SERVER}`, `${process.env.BACKEND_SERVER}`, `${process.env.ADMIN_SERVER}`],
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socketSever(socket);
});

// ExpressPeerServer(http, {
//     path: '/',
//     allow_discovery: true,
// });

routes(app);

// Handle 404 errors

app.use((req, res, next) => {
    const error = new Error('NotFound');
    error.status = 404;
    next(error);
})

// Handle Error

app.use((error, req, res, next) => {
    const err = error || {};
    const status = err.status || 500;

    return res.status(status).json({ success: false, message: err.message, code: status, data: err?.data });
})


http.listen(port, () => console.log(`Listening port ${port}`));
