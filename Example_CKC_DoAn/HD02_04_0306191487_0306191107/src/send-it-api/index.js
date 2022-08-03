const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoute = require('./routes/auth');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');


const conversationRoute = require('./routes/conversations');
const conversationDetailRoute = require('./routes/conversationDetails');
const messageRoute = require('./routes/messages');
const userRoute = require('./routes/users');

dotenv.config();

require('./services/passport');

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan('common'));
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB');
  }
);

//routes
app.use('/uploads', express.static('uploads'));
app.use(authRoute);
app.use('/api/user', userRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/conversationdetail', conversationDetailRoute);
app.use('/api/message', messageRoute);

app.listen(8800, () => {
  console.log('Backend server is running!');
});
