import * as api from '../API/indexAPI';
import {
  GET_ARRIVAL_MESSAGES,
  GET_MESSAGES,
  MESSAGES_LOADING,
  DELETE_MESSAGE,
  SET_CURRENT_CHAT,
  GET_CONVERSATION,
  EMOJING,
} from './actionType';

export const getMessages = (conversationId) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGES_LOADING });

    const res = await api.getMessages(conversationId);

    dispatch({
      type: GET_MESSAGES,
      data: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getArrivalMessages =
  (currentMessages, arrivalMessage) => async (dispatch) => {
    try {
      dispatch({
        type: GET_ARRIVAL_MESSAGES,
        data: [...currentMessages, arrivalMessage],
      });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteMessage =
  (listConversation, currentBoxChat, currentMessages, mess) =>
  async (dispatch) => {
    const messageId = mess?._id;
    const updateLastMessage = currentMessages[currentMessages.length - 2];
    const isLastMessage = currentBoxChat?.lastMessageId === messageId;

    try {
      dispatch({
        type: DELETE_MESSAGE,
        data: [...currentMessages].filter((m) => m._id !== messageId),
      });

      if (mess.isImage) {
        dispatch({
          type: SET_CURRENT_CHAT,
          data: {
            ...currentBoxChat,
            imageList: [...currentBoxChat.imageList].filter(
              (m) => m.message_id !== messageId
            ),
          },
        });

        dispatch({
          type: GET_CONVERSATION,
          data: [...listConversation]?.map((conv) =>
            conv.id === currentBoxChat.id
              ? {
                  ...conv,
                  lastMessage: updateLastMessage.isImage
                    ? '[Photo]'
                    : updateLastMessage.isFile
                    ? '[File]'
                    : updateLastMessage.message,
                  lastMessageId: updateLastMessage._id,
                  lastSendAt: updateLastMessage.createdAt,
                }
              : conv
          ),
        });
      }
      if (mess.isFile) {
        dispatch({
          type: SET_CURRENT_CHAT,
          data: {
            ...currentBoxChat,
            fileList: [...currentBoxChat.fileList].filter(
              (m) => m.message_id !== messageId
            ),
          },
        });

        dispatch({
          type: GET_CONVERSATION,
          data: [...listConversation]?.map((conv) =>
            conv.id === currentBoxChat.id
              ? {
                  ...conv,
                  lastMessage: updateLastMessage.isImage
                    ? '[Photo]'
                    : updateLastMessage.isFile
                    ? '[File]'
                    : updateLastMessage.message,
                  lastMessageId: updateLastMessage._id,
                  lastSendAt: updateLastMessage.createdAt,
                }
              : conv
          ),
        });
      }

      if (isLastMessage) {
        dispatch({
          type: GET_CONVERSATION,
          data: [...listConversation]?.map((conv) =>
            conv.id === currentBoxChat.id
              ? {
                  ...conv,
                  lastMessage: updateLastMessage.isImage
                    ? '[Photo]'
                    : updateLastMessage.isFile
                    ? '[File]'
                    : updateLastMessage.message,
                  lastMessageId: updateLastMessage._id,
                  lastSendAt: updateLastMessage.createdAt,
                }
              : conv
          ),
        });

        dispatch({
          type: SET_CURRENT_CHAT,
          data: {
            ...currentBoxChat,
            lastMessage: updateLastMessage.isImage
              ? '[Photo]'
              : updateLastMessage.isFile
              ? '[File]'
              : updateLastMessage.message,
            lastMessageId: updateLastMessage._id,
            lastSendAt: updateLastMessage.createdAt,
          },
        });

        if (mess.isImage) {
          dispatch({
            type: SET_CURRENT_CHAT,
            data: {
              ...currentBoxChat,
              imageList: [...currentBoxChat.imageList].filter(
                (m) => m.message_id !== messageId
              ),
            },
          });

          dispatch({
            type: GET_CONVERSATION,
            data: [...listConversation]?.map((conv) =>
              conv.id === currentBoxChat.id
                ? {
                    ...conv,
                    lastMessage: updateLastMessage.isImage
                      ? '[Photo]'
                      : updateLastMessage.isFile
                      ? '[File]'
                      : updateLastMessage.message,
                    lastMessageId: updateLastMessage._id,
                    lastSendAt: updateLastMessage.createdAt,
                  }
                : conv
            ),
          });
        }
        if (mess.isFile) {
          dispatch({
            type: SET_CURRENT_CHAT,
            data: {
              ...currentBoxChat,
              fileList: [...currentBoxChat.fileList].filter(
                (m) => m.message_id !== messageId
              ),
            },
          });

          dispatch({
            type: GET_CONVERSATION,
            data: [...listConversation]?.map((conv) =>
              conv.id === currentBoxChat.id
                ? {
                    ...conv,
                    lastMessage: updateLastMessage.isImage
                      ? '[Photo]'
                      : updateLastMessage.isFile
                      ? '[File]'
                      : updateLastMessage.message,
                    lastMessageId: updateLastMessage._id,
                    lastSendAt: updateLastMessage.createdAt,
                  }
                : conv
            ),
          });
        }
      }
      //call api delete
      await api.deleteMessage({
        messageId: messageId,
        isImage: mess.isImage,
        isFile: mess.isFile,
        conversationId: currentBoxChat.id,
        isLastMessage,
        updateLastMessageId: updateLastMessage._id,
        updateLastMessageText: updateLastMessage?.isImage
          ? '[Photo]'
          : updateLastMessage.isFile
          ? '[File]'
          : updateLastMessage?.message,
        updateLastMessageAt: updateLastMessage.createdAt,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const emojingMessage = (currentMessages, emote) => async (dispatch) => {
  try {
    const { key, author, messId } = emote;
    const mess = currentMessages.find((m) => m._id === messId);
    //array
    const messEmoji = mess.quick_emoji;
    if (messEmoji.length > 0) {
      const emojiied = messEmoji.find((e) => e.author === author);
      if (emojiied) {
        //same emoji
        if (emojiied.key === key) {
          //remove this emoji
          dispatch({
            type: EMOJING,
            data: [...currentMessages].map((mess) =>
              mess._id === messId
                ? {
                    ...mess,
                    quick_emoji: [...messEmoji].filter((e) => e.key !== key),
                  }
                : mess
            ),
          });
        } else {
          //replace emoji
          dispatch({
            type: EMOJING,
            data: [...currentMessages].map((mess) =>
              mess._id === messId
                ? {
                    ...mess,
                    quick_emoji: [...messEmoji].map((emote) =>
                      emote.author === author
                        ? {
                            ...emote,
                            key: key,
                          }
                        : emote
                    ),
                  }
                : mess
            ),
          });
        }
      } else {
        dispatch({
          type: EMOJING,
          data: [...currentMessages]?.map((mess) =>
            mess._id === messId
              ? {
                  ...mess,
                  quick_emoji: [
                    ...messEmoji,
                    { key: key, author: author, messId },
                  ],
                }
              : mess
          ),
        });
      }
    } else {
      dispatch({
        type: EMOJING,
        data: [...currentMessages]?.map((mess) =>
          mess._id === messId
            ? {
                ...mess,
                quick_emoji: [
                  ...messEmoji,
                  { key: key, author: author, messId },
                ],
              }
            : mess
        ),
      });
    }

    //call api
    if (!emote.receiverId) {
      await api.emojiMessageApi(emote);
    }
  } catch (error) {
    console.log(error);
  }
};
