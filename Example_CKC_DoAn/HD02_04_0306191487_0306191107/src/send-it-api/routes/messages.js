const router = require('express').Router();
const Message = require('../models/Message');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const { getToday } = require('../utils/common');
const formidable = require('formidable');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/messages');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fieldNameSize: 100 } });

// create Message
router.post('/', async (req, res) => {
  const today = getToday();
  const sender = await User.findOne({ _id: req.body.user_id });
  const senderImg = sender.image;
  const newMessage = new Message({
    message: req.body.message,
    message_date: today,
    user_id: req.body.user_id,
    user_image: senderImg,
    conversation_id: req.body.conversation_id,
    status: 1,
  });

  try {
    const savedMessage = await newMessage.save();
    await Conversation.findByIdAndUpdate(
      { _id: req.body.conversation_id },
      {
        last_message_id: savedMessage.id,
        last_message: req.body.message,
        last_message_is_image: false,
        last_sender: sender.full_name,
        last_senderId: sender.id,
        last_sendAt: today,
      }
    );
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json(error + newMessage);
  }
});

//send Image Messages
router.post('/sendImageMessage', upload.single('image'), async (req, res) => {
  const today = getToday();
  const sender = await User.findOne({ _id: req.body.user_id });
  const senderImg = sender.image;

  const url = req.protocol + '://' + req.get('host');
  const finalImgName = url + '/uploads/messages/' + req.file.filename;

  const newMessage = new Message({
    message: req.body.message,
    message_date: today,
    user_id: req.body.user_id,
    user_image: senderImg,
    conversation_id: req.body.conversation_id,
    isImage: req.body.isImage,
    isFile: req.body.isFile,
    message_image: finalImgName,
    status: 1,
  });

  const conversation = await Conversation.findOne({
    _id: req.body.conversation_id,
  });

  const listImgOfThisConversation = conversation?.image_list;
  const listFileOfThisConversation = conversation?.file_list;

  const checkType = req.body.isImage;
  console.log(checkType);
  // if (checkType) {
  try {
    const savedMessage = await newMessage.save();

    await Conversation.findByIdAndUpdate(
      { _id: req.body.conversation_id },
      {
        last_message_id: savedMessage.id,
        last_message: `${checkType === 'true' ? '[Photo]' : '[File]'}`,
        last_message_is_image: true,
        last_message_image: finalImgName,
        last_sender: sender.full_name,
        last_senderId: sender.id,
        last_sendAt: today,
      }
    );
    checkType === 'true'
      ? await Conversation.updateOne(
          { _id: req.body.conversation_id },
          {
            image_list: [
              {
                message_id: savedMessage.id,
                image: finalImgName,
                sender: sender.full_name,
                sendAt: today,
              },
              ...listImgOfThisConversation,
            ],
          }
        )
      : // console.log('image')
        //  console.log('file');
        await Conversation.updateOne(
          { _id: req.body.conversation_id },
          {
            file_list: [
              {
                message_id: savedMessage.id,
                file: finalImgName,
                message: req.file.filename,
                sender: sender.full_name,
                sendAt: today,
              },
              ...listFileOfThisConversation,
            ],
          }
        );
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json(error + newMessage);
  }
});

// get all messages from a conversationId (not depend on user)
router.get('/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({
      conversation_id: req.params.conversationId,
    });

    var newGetMessages = [];
    for (let i = 0; i < messages.length; i++) {
      const sender = await User.findOne({ _id: messages[i].user_id });
      newGetMessages = [
        ...newGetMessages,
        { ...messages[i]._doc, senderImg: sender.image },
      ];
    }

    res.status(200).json(newGetMessages);
  } catch (error) {
    res.status(500).json(`error: ${error}`);
  }
});

// gets one
router.get('/:id', async (req, res) => {
  const { conv_id, user_id, isRead } = req.body;

  try {
    const mess = await Message.find({ _id: req.params.id });
    if (mess) {
      res.status(200).json(mess);
    } else {
      res.status(404).json('Message not found');
    }
  } catch (error) {
    res.status(500).json(error + "can't get Message");
  }
});

// gets all
router.get('/', async (req, res) => {
  try {
    const mess = await Message.find({});
    res.status(200).json(mess);
  } catch (error) {
    res.status(500).json(error + "can't get all Message");
  }
});

//delete
router.put('/delete', async (req, res) => {
  const {
    messageId,
    conversationId,
    isImage,
    isFile,
    isLastMessage,
    updateLastMessageId,
    updateLastMessageText,
    updateLastMessageAt,
  } = req.body;
  const conversation = await Conversation.findOne({ _id: conversationId });
  const updateConversationImageList = conversation.image_list;
  const updateConversationFileList = conversation.file_list;

  try {
    if (isImage) {
      await Conversation.findByIdAndUpdate(
        { _id: conversationId },
        {
          image_list: updateConversationImageList.filter(
            (i) => i.message_id !== messageId
          ),
        }
      );
    }
    if (isFile) {
      await Conversation.findByIdAndUpdate(
        { _id: conversationId },
        {
          file_list: updateConversationFileList.filter(
            (i) => i.message_id !== messageId
          ),
        }
      );
    }

    if (isLastMessage) {
      await Conversation.updateOne(
        { _id: conversationId },
        {
          last_message_id: updateLastMessageId,
          last_message: updateLastMessageText,
          last_sendAt: updateLastMessageAt,
        }
      );
    }
    await Message.findByIdAndDelete({
      _id: messageId,
    });
    res.status(200).json('Message deleted successfully');
  } catch (error) {
    res.status(500).json(error + ' error deleting Message');
  }
});

router.put('/emoji', async (req, res) => {
  const { key, author, messId } = req.body;
  const messageWillEmote = await Message.findOne({ _id: messId });
  const messEmoteList = messageWillEmote.quick_emoji;

  if (messEmoteList.length > 0) {
    const emojiied = messEmoteList.find((e) => e.author === author);
    if (emojiied) {
      //same emoji
      if (emojiied.key === key) {
        //remove this emoji
        await Message.updateOne(
          { _id: messId },
          {
            quick_emoji: [...messEmoteList].filter(
              (emote) => emote.key !== key
            ),
          }
        );
      } else {
        //replace emoji
        await Message.updateOne(
          { _id: messId },
          {
            quick_emoji: [...messEmoteList].map((emote) =>
              emote.author === author ? { ...emote, key: key } : emote
            ),
          }
        );
      }
    } else {
      await Message.updateOne(
        { _id: messId },
        {
          quick_emoji: [...messEmoteList, { key, author, messId }],
        }
      );
    }
  } else {
    //this messae have no reacting yet
    await Message.updateOne(
      { _id: messId },
      {
        quick_emoji: [...messEmoteList, { key, author, messId }],
      }
    );
  }

  try {
    res.status(200).json('Message emoji updated successfully');
  } catch (error) {
    res.status(500).json(error + ' error Message emoji updated: ');
  }
});

//delete all mess in a conversation
router.delete('/deleteon/:conversid', async (req, res) => {
  try {
    const messagesWillDelete = await Message.find({
      conversation_id: req.params.conversid,
    });
    messagesWillDelete.map(async (message) => {
      await Message.findByIdAndDelete({ _id: message._id });
    });
    res.status(200).json('Message in this conversation deleted successfully');
  } catch (error) {
    res
      .status(500)
      .json(error + ' error deleting Message in conv: ' + req.params.id);
  }
});

const findUser = async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (user) return userl;
};

module.exports = router;
