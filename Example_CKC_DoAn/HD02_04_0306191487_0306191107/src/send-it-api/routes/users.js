const router = require('express').Router();
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const multer = require('multer');
const bcrypt = require('bcrypt');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});
const storageBg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/bg_conversation');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fieldNameSize: 100 } });
const uploadBg = multer({ storage: storageBg, limits: { fieldNameSize: 100 } });

//check user
router.post('/getuser', upload.none(), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      res.status(200).json({ mes: 'no' });
    } else {
      res.status(200).json({ mes: 'yes' });
    }
  } catch (error) {
    res.status(500).json(error + "can't get all User");
  }
});

// gets all
router.get('/', async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error + "can't get all User");
  }
});

router.get('/getone/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
    if (user) {
    } else {
      res.status(404).json('User not found');
    }
  } catch (error) {
    res.status(500).json(error + "can't get User");
  }
});

//Updates
router.put('/:id', upload.single('image'), async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const newUser = user;
    const url = req.protocol + '://' + req.get('host');

    if (req.body.full_name !== undefined) {
      newUser.full_name = req.body.full_name;
    }

    if (req.body.phone !== undefined) {
      newUser.phone = req.body.phone;
    }

    if (req.body.password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      newUser.password = hashedPassword;
    }
    if (req.body.check_img) {
      newUser.image = url + '/uploads/' + req.file.filename;
    }
    const newNewUser = await newUser.save();

    res.status(200).json(newNewUser);
  } catch (error) {
    res.status(500).json(error + "can't get all User");
  }
});

router.put(
  '/update_bg/:id',
  uploadBg.single('image'),
  async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      const newUser = user;
      const url = req.protocol + '://' + req.get('host');

      if (req.body.check_img) {
        newUser.dashboard_bg_color =
          url + '/uploads/bg_conversation/' + req.file.filename;
      }
      const newNewUser = await newUser.save();

      res.status(200).json(newNewUser);
    } catch (error) {
      res.status(500).json(error + "can't get all User");
    }
  }
);

//filter by name
router.post('/filter', async (req, res) => {
  const { email, full_name, type, finder } = req.body;
  var message = { mess: 'Nothing found, please try again' };
  const finderUser = User.findOne({ _id: finder });
  try {
    var users;
    const getFieldTypes = '_id full_name email image';
    switch (type) {
      case 'email': {
        users = await User.find(
          { email: { $regex: email } },
          getFieldTypes
        ).exec();
        break;
      }

      case 'name': {
        users = await User.find(
          { full_name: { $regex: full_name } },
          getFieldTypes
        ).exec();
        break;
      }
      default: {
        res.status(200).json(message);
      }
    }

    if (full_name === '') {
      res.status(200).json({ blank: true });
    } else if (users.length > 0) {
      var newUserFilterExceptMe = users.filter((u) => u.id !== finder);
      res.status(200).json(newUserFilterExceptMe);
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    res.status(500).json(error + "can't get user filter");
  }
});

router.get('/userStatistical/:id', async (req, res) => {
  const currentYear = new Date().getFullYear();
  const thisYear = [currentYear, '01', '01'].join('-');

  // total of message that this user have sent before(1)
  const messCount = await Message.find({ user_id: req.params.id }).count();

  //total of message that this user have send today
  const messTodayList = await Message.find({
    user_id: req.params.id,
    $expr: {
      $eq: [
        {
          $dateToString: {
            format: '%Y',
            date: new Date(thisYear),
          },
        },
        { $dateToString: { format: '%Y', date: '$message_date' } },
      ],
    },
  });
  //total of message that this user have send today(2)
  const messTodayCount = messTodayList.length;

  // box chats of this user and toal message of each (only me)
  const counterMessOfEachConversation = await Message.aggregate([
    { $match: { user_id: req.params.id } },
    { $group: { _id: '$conversation_id', count: { $count: {} } } },
  ]);

  const counterMessOfEachConversation2 = await Message.aggregate([
    { $group: { _id: '$conversation_id', count: { $count: {} } } },
  ]);

  //type:object {_id: conversationId,count:messageCount}
  // conversation that thisUser most messaging
  const theGreatestMessageCount = counterMessOfEachConversation.reduce(
    function (prev, current) {
      return prev.count > current.count ? prev : current;
    }
  );

  const theySentTotal = counterMessOfEachConversation2.find(
    (c) => c._id === theGreatestMessageCount._id
  );

  const conversationMostMessaging = await Conversation.findOne({
    _id: theGreatestMessageCount._id,
  });

  //bf name =bestFriendInThisConverSation.fullname (3)
  const bestFriendInThisConverSation = conversationMostMessaging.members.find(
    (m) => m.id !== req.params.id
  );

  const user_Statistical = await User.findOne({ _id: req.params.id });

  const finalStatistical = {
    ...user_Statistical._doc,
    totalMessageSent: messCount,
    todayTotalMessageSent: messTodayCount,

    bestFriend: bestFriendInThisConverSation
      ? {
          name: bestFriendInThisConverSation.fullname,
          email: bestFriendInThisConverSation.email,
          totalMessage: theySentTotal.count,
          noBf: false,
        }
      : {
          name: `Look like ${user_Statistical.full_name} does not have any Best Friend yet!!`,
          noBf: true,
        },
  };

  try {
    res.status(200).json(finalStatistical);
  } catch (error) {
    res.status(500).json(error + "can't get user filter");
  }
});

module.exports = router;
