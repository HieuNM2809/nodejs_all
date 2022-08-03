const router = require('express').Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const { getToday, checkMemberLength } = require('../utils/common');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const checkSavedMessConversation = (memberLength) => {
  if (memberLength === 1) return true;
  return false;
};

const upload = multer({ storage: storage, limits: { fieldNameSize: 100 } });

// create conversation group
router.post('/', async (req, res) => {
  var date = Date.now().toString();
  const url = req.protocol + '://' + req.get('host'); //http://localhost:8800

  //today
  const today = getToday();

  //const field
  const nick_name = '';
  const date_in = today;
  const date_out = '';
  var role = 0;

  var listMember = [];
  req.body.map((user) => {
    listMember.push({
      ...user,
      nick_name,
      date_in,
      date_out,
      role: user.role ? user.role : role,
    });
  });
  //console.log(listMember);

  const isGroup = checkMemberLength(listMember.length);
  const groupImg = isGroup ? url + '/uploads/' + 'members.png' : ''; //isGroup -> http://localhost:8800/uploads/members.png

  var conversationName = '';

  if (isGroup) {
    for (let i = 0; i < listMember.length; i++) {
      const us = await User.findOne({ _id: listMember[i].id });
      if (i === listMember.length - 1) {
        conversationName += `${us.full_name}`;
      } else {
        conversationName += `${us.full_name},`;
      }
    }
  }
  //isGroup -> conversationName= Vinh 1,Vinh 2,Vinh 3,.... etc

  //new Conversation
  const newConversation = new Conversation({
    display_name: isGroup ? conversationName : `Conversation-${date}`,
    members: listMember,
    isGroup: isGroup,
    display_img: groupImg,
    last_sendAt: today,
    status: 1,
  });

  try {
    const savedConversation = await newConversation.save();
    // inserts new conv to each user in this conv
    const conversation_id = savedConversation._id.toString(); //get conv_id from new conv
    req.body.map(async (user) => {
      const usr = await User.findOne({ _id: user.id });
      if (usr) {
        await User.updateOne(
          { _id: user.id },
          {
            conversations: [
              ...usr.conversations,
              {
                id: conversation_id,
                date: today,
                isSilent: false,
                isHide: false,
                isRead: true,
                delete_at: today,
              },
            ],
          }
        );
      }
    });
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error + newConversation);
  }
});

// gets one
router.get('/:id', async (req, res) => {
  try {
    const conversation = await Conversation.find({ _id: req.params.id });
    if (conversation) {
      res.status(200).json(conversation);
    } else {
      res.status(404).json('conversation not found');
    }
  } catch (error) {
    res.status(500).json(error + "can't get conversation");
  }
});

// gets all
router.get('/', async (req, res) => {
  try {
    const conversation = await Conversation.find({});
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error + "can't get all conversation");
  }
});

// gets all conversations by user id -> show on their screen
router.get('/conversation_of/:userId', async (req, res) => {
  var finallyConv = [];
  try {
    const userConversations = await User.findOne({ _id: req.params.userId }); //list conv of user
    var i = 0;
    var convsLength = userConversations.conversations.length;
    userConversations.conversations.map(async (conv) => {
      const thisConv = await Conversation.findOne({ _id: conv.id });
      const listMember = thisConv.members;
      const myPos = listMember.map((mem) => mem.id).indexOf(req.params.userId);
      const partnerPos = myPos == 0 ? 1 : 0; //check position of partner
      const partner = await User.findOne({ _id: listMember[partnerPos]?.id }); // finding Partner successfully
      const partnerName = partner?.full_name; //get partner name (1)
      var partnerAvt = ''; //get partner avatar (2)
      const partnerId = partner?.id;
      const partnerEmail = partner?.email;

      if (listMember.length == 2) {
        partnerAvt = partner.image;
      } else {
        partnerAvt = thisConv.display_img;
      }

      //get isRead status
      const myself = await User.findOne({ _id: listMember[myPos]?.id });
      const currentConversationOfMine = myself.conversations.find(
        (c) => c.id === conv.id
      );
      const isRead = currentConversationOfMine.isRead;

      const lastMessageId = thisConv?.last_message_id;
      const lastMessage = thisConv.last_message; // last message (3)
      const lastSender = thisConv.last_sender;
      const lastSenderId = thisConv.last_senderId;
      const lastSendAt = thisConv.last_sendAt;
      const imageList = thisConv?.image_list;
      const fileList = thisConv?.file_list;
      const isGroup = thisConv.isGroup;

      var conversationsName;

      //get name of conversation
      if (thisConv.isGroup) {
        conversationsName = thisConv.display_name;
      } else if (thisConv.display_name.includes('saved')) {
        conversationsName = 'Saved Messages';
      } else {
        conversationsName = partnerName;
      }

      finallyConv.push({
        ...conv,
        members: listMember,
        isGroup,
        partnerName: conversationsName,
        partnerEmail,
        partnerAvt,
        lastMessageId,
        lastMessage,
        lastSendAt,
        lastSender,
        lastSenderId,
        partnerId: thisConv.isGroup ? undefined : partnerId,
        imageList,
        fileList,
        isRead,
      }); //push to new array -> this array will return to user
      if (i == convsLength - 1) {
        res
          .status(200)
          .json(
            finallyConv.sort(
              (a, b) => Number(b.lastSendAt) - Number(a.lastSendAt)
            )
          ); // GET FINALLY
      }
      i++; //i dont know why dont ask please
    });
  } catch (error) {
    res
      .status(500)
      .json(
        `${error} - can't get conversations of user id${req.params.userId}`
      );
  }
});

router.put('/update/readStatus', async (req, res) => {
  const { conv_id, user_id, isRead } = req.body;

  try {
    const thisConv = await Conversation.findOne({ _id: conv_id });

    const user = await User.findOne({ _id: user_id });
    if (user) {
      await User.updateOne(
        { _id: user_id, 'conversations.id': conv_id },
        { $set: { 'conversations.$.isRead': isRead } }
      );
    }
    res.status(200).json('update isRead Status successfully');
  } catch (e) {
    res.status(500).json('update isRead Status fail' + e);
  }
});

router.put('/addSavedMessConversation/:uid', async (req, res) => {
  var date = Date.now().toString();
  const today = getToday();

  try {
    const user = await User.findOne({ _id: req.params.uid });
    //create saved messages
    const savedMessages = new Conversation({
      display_name: `saved-${date}`,
      members: [{ id: req.params.uid }],
      isGroup: false,
      display_img: 'http://localhost:8800/uploads/savedmess.jpg',
      status: 1,
    });

    const savedMessConversation = await savedMessages.save();
    //update saved messages conversation
    await User.updateOne(
      { _id: req.params.uid },
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
    res.status(200).json('Saved Messages Conversation added successfully');
  } catch (e) {
    res.status(500).json('Saved Messages Conversation added failed' + e);
  }
});

//delete
router.delete('/:id', async (req, res) => {
  try {
    const converss = await Conversation.findOne({ _id: req.params.id });
    if (converss) {
      if (converss.members.length > 0) {
        converss.members.map(async (mem) => {
          var user = await User.findOne({ _id: mem.id });
          var newConvOfUser = user.conversations.filter(
            (conv) => conv.id !== converss.id
          );
          await User.findByIdAndUpdate(
            { _id: mem.id },
            {
              conversations: newConvOfUser,
            }
          );
        });
        await Message.deleteMany({ conversation_id: converss.id });
        await Conversation.findByIdAndDelete({
          _id: req.params.id,
        });
        res.status(200).json('conversation deleted successfully');
      } else {
        res
          .status(200)
          .json(
            `can not delete this conversation, there's ${converss.members.length} member(s) left`
          );
      }
    }
  } catch (error) {
    res
      .status(500)
      .json(error + ' error deleting conversation' + req.params.id);
  }
});

//update

module.exports = router;
