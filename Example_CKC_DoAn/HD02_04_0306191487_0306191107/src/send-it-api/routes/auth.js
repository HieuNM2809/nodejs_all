const passport = require('passport');
const router = require('express').Router();
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { getToday, currentHost } = require('../utils/common');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fieldNameSize: 100 } });

//Register
router.post('/api/auth/register', upload.single('image'), async (req, res) => {
  var date = Date.now().toString();
  const today = getToday();

  try {
    //generate new password
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      full_name: req.body.full_name,
      email: req.body.email,
      password: hashedPassword,
      image: 'http://localhost:8800/uploads/unknownUser.png',
      dashboard_bg_color:
        'http://localhost:8800/uploads/bg_conversation/pattern.png',
    });

    //save user and respond
    const user = await newUser.save();

    //create saved messages
    const savedMessages = new Conversation({
      display_name: `saved-${date}`,
      members: [{ id: user._id.toString() }],
      isGroup: false,
      display_img: 'http://localhost:8800/uploads/savedmess.jpg',
      last_sendAt: today,
      status: 1,
    });

    const savedMessConversation = await savedMessages.save();
    //update saved messages conversation
    await User.updateOne(
      { _id: user._id.toString() },
      {
        conversations: [
          ...user.conversations,
          {
            id: savedMessConversation._id.toString(),
            date: today,
            isSilent: false,
            isHide: false,
            delete_at: today,
            last_sendAt: today,
          },
        ],
      }
    );

    res.status(200).json(user);
  } catch (err) {
    res.json(err);
  }
});

//Login
router.post('/api/auth/login', upload.none(), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json('Wrong Email');
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json('Wrong password');
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login with Google
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/success',
    failureRedirect: '/api/failed',
  })
);

router.get('/api/success', (req, res) => res.send(req.user));
router.get('/api/success', (req, res) => res.send('You failed to log in!'));

//Logout
router.get('/logout', function (req, res) {
  req.session.destroy(function (e) {
    req.logout();
    res.redirect('/');
  });
});

module.exports = router;
