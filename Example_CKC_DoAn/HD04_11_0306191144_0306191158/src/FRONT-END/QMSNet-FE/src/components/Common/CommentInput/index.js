import { Button, Form, Input, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { POST } from '../../../constants'
import { comment } from '../../../redux/post/action'
import ChooseEmoji from '../ChooseEmoji'
import { CommentInputWrapper } from './CommentInput.style'

const CommentInput = props => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [form] = Form.useForm();
  const inputRef = useRef();
  const [isDisableButton, setIsDisableButton] = useState(true);

  const isFollowing = user?._id === props?.post?.user?._id || user?.following?.includes(props?.post?.user?._id);

  const handleOnSubmit = (values) => {
    if (!props?.post?.disableComment && isFollowing) {

      dispatch(comment({
        link: 'create',
        data: {
          ...values,
          tag: props?.reply?.user || null,
          reply: props?.reply?._id || null,
        },
        method: POST,
        isPostDetail: props?.isPostDetail
      }))
      if (props.reply) {
        props.setReply(null);
      }
      form.setFieldsValue({
        content: ""
      })
    } else {

      message.warning('Bạn chưa theo dõi người dùng này, hoặc bài đăng này đã tắt bình luận.')
    }
  }

  const setContent = (values) => {
    if (!props?.post?.disableComment && isFollowing) {

      if (isDisableButton) {
        setIsDisableButton(false)
      }
      form.setFieldsValue({
        content: (form.getFieldValue('content') || "") + values
      })
    }

  }

  useEffect(() => {
    if (props?.reply) {
      setIsDisableButton(false);
      form.setFieldsValue({
        content: `@${props.reply.user.username} `
      })
      inputRef?.current?.focus();
    } else {
      form.resetFields();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.reply])


  return (
    <CommentInputWrapper className="comment-input">
      <Form form={form} initialValues={{
        postId: props?.post?._id
      }} onFinish={handleOnSubmit}>
        <Form.Item hidden name="postId" >
          <Input></Input>
        </Form.Item>
        <Form.Item style={{
          marginBottom: '0'
        }} name="content" rules={[
          {
            validator: (_, values) => {
              if (!values.trim()) {
                if (!isDisableButton) {

                  setIsDisableButton(true)
                }
              } else {
                if (isDisableButton) {
                  setIsDisableButton(false)
                }
              }
              return Promise.resolve();
            }
          }
        ]}>
          <Input className={(props?.post?.disableComment || !isFollowing) && 'disable-comment'} readOnly={props?.post?.disableComment || !isFollowing} ref={inputRef} bordered={false} required placeholder={props?.post?.disableComment ? 'Bài viết đã tắt bình luận' : isFollowing ? "Thêm bình luận" : 'Vui lòng theo dõi để bình luận!'} prefix={<ChooseEmoji id={`comment-emoji-${props?.post?._id + Math.random()}`} setContent={setContent} />} suffix={<Button htmlType="submit" disabled={isDisableButton} type="link">Đăng</Button>}></Input>
        </Form.Item>
      </Form>
    </CommentInputWrapper >
  )
}

CommentInput.propTypes = {
}


export default CommentInput