import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileSuccess } from './redux/auth/action';
import { deleteMessage, updateConversation } from './redux/conversation/action';
import { getNotify } from './redux/notify/action';
import { setOnline } from './redux/online/action';
import { setPostDetail, updatePost } from './redux/post/action';

const SocketClient = () => {
    const { auth, socket, post, conversation, online } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        socket?.data?.emit('joinUser', auth?.user?._id);
    }, [socket?.data, auth?.user?._id]);


    useEffect(() => {
        socket?.data?.on('followToClient', (data) => {
            dispatch(updateProfileSuccess(data));
        })
        return () => socket?.data?.off('followToClient');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket?.data])

    useEffect(() => {
        socket?.data?.on('likeToClient', (newPost => {
            if (post?.postDetail?._id === newPost?._id) {
                dispatch(setPostDetail(newPost))
            }
            dispatch(updatePost(newPost))
        }))
        return () => socket?.data?.off('likeToClient');
    }, [socket?.data, post?.postDetail, dispatch])

    useEffect(() => {
        socket?.data?.on('commentToClient', (newPost => {
            if (post?.postDetail?._id === newPost?._id) {
                dispatch(setPostDetail(newPost))
            }
            dispatch(updatePost(newPost))
        }))
        return () => socket?.data?.off('commentToClient');
    }, [socket?.data, post?.postDetail, dispatch])

    useEffect(() => {
        socket?.data?.on('messageToClient', (data => {
            dispatch(updateConversation(data))
        }))
        return () => socket?.data?.off('messageToClient');
    }, [socket?.data, dispatch])

    useEffect(() => {
        socket?.data?.on('deleteMessageToClient', (data => {
            dispatch(deleteMessage(data, true))
        }))
        return () => socket?.data?.off('messageToClient');
    }, [socket?.data, dispatch])

    useEffect(() => {
        socket?.data?.on('notifyToClient', (() => {
            dispatch(getNotify())
        }))
        return () => socket?.data?.off('notifyToClient');
    }, [socket?.data, dispatch])

    useEffect(() => {
        const friends = conversation?.conversations?.map((cv) => cv?.participants?.find((p) => p?._id !== auth?.user?._id && !p?.blocks?.includes(auth?.user?._id) && !auth?.user?.blocks?.includes(p?._id))?._id);
        socket?.data?.emit('checkUserOnline', {
            user_id: auth?.user?._id,
            friends,
        });
        return () => socket?.data?.off('checkUserOnline');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket.data, conversation, auth?.user?._id]);

    useEffect(() => {
        socket?.data?.on('checkUserOnlineToMe', (async (data) => {
            const select = await conversation?.conversations?.reduce((prev, cv) => {
                const isExist = cv.participants?.some((p) => data.includes(p._id));
                if (isExist) {
                    return [...prev, cv];
                }

                return prev;
            }
                , []);
            dispatch(setOnline(select))
        }))
        return () => socket?.data?.off('checkUserOnlineToMe');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket?.data, conversation, dispatch])
    useEffect(() => {
        socket?.data?.on('checkUserOnlineToClient', ((data) => {
            const newConversation = conversation?.conversations?.find((cv) => cv?.participants?.some((p) => p._id === data && !auth?.user?.blocks?.includes(data) && !p?.blocks.includes(auth?.user?._id)));
            console.log(newConversation)
            if (newConversation) {
                const isExist = online?.data?.find((cv) => cv?._id === newConversation?._id);
                if (!isExist) {
                    const current = online?.data || [];
                    dispatch(setOnline([...current, newConversation]))
                }
            }


        }))
        return () => socket?.data?.off('checkUserOnlineToClient');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket?.data, conversation, dispatch])


    return <></>;
};

export default SocketClient;