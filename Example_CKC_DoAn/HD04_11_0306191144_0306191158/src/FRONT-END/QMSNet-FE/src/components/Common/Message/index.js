import { MoreOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Image, Modal, Popover, Row } from 'antd'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MoreIcon, UnlikeIcon } from '../../../assets/icon';
import { deleteMessage } from '../../../redux/conversation/action';
import { download } from '../../../utils/image_utils';
import { dateTime } from '../../../utils/time_utils';
import { copyToClipboard } from '../../../utils/word_utils';
import { MessageWrapper } from './Message.style'

const Message = props => {
  const { type } = props;
  const messageRef = useRef();
  const dispatch = useDispatch();
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const styleProps = type === 'me' ? {
    ['attr-type']: type,
    ['attr-background']: '#1877F2',
    ['attr-color']: 'white',

  } : {
    ['attr-type']: type,
    ['attr-background']: '#E4E6EB',
    ['attr-color']: 'initial',

  }


  return (
    <>
      <Modal centered bodyStyle={{
        fontSize: '16px'
      }} visible={showConfirmDelete} footer={<Row justify="end">
        <Button size="large" onClick={() => {
          setShowConfirmDelete(null)
        }} style={{
          fontWeight: '600'
        }} type="link">Hủy</Button>
        <Button size="large" className="q-button" onClick={() => {
          dispatch(deleteMessage(showConfirmDelete))
          setShowConfirmDelete(null);
        }} type="primary">Xóa</Button>
      </Row>} onCancel={() => {
        setShowConfirmDelete(null)
      }} destroyOnClose={true} title="Bạn có muốn xóa tin nhắn này">
        Chúng tôi sẽ gỡ tin nhắn này khỏi cuộc trò chuyện bạn và thành viên khác trong đoạn chat sẽ không thể thấy tin nhắn này.
      </Modal>
      <MessageWrapper {...styleProps} ref={messageRef} className={type}>

        {type === 'friend' && <Avatar style={{
          opacity: props?.nextMess?.sender !== props?.data?.sender ? '1' : '0'
        }} src={props?.recipient?.avatar?.url} />}

        {props?.data?.deleted ? <div className="content deleted" style={{
          order: type === 'me' ? '2' : 'unset'
        }}>
          Tin nhắn đã bị thu hồi.
        </div> : <>{props?.data?.media && props.data?.media?.url?.match('/image/') && <Image className="image" src={props?.data?.media?.url} />}

          {props?.data?.text && <div className="content" style={{
            order: type === 'me' ? '2' : 'unset'
          }}>
            {props.data.text}
          </div>}
          {props?.data?.icon && <UnlikeIcon className="like" style={{
            order: type === 'me' ? '2' : 'unset'
          }} />}
          <Popover className="more-icon" placement={type === 'me' ? "topRight" : "topLeft"} overlayClassName="message-action-more more-icon" trigger="click" content={<Row gutter={15}>
            {type === 'me' && <Col onClick={() => {
              setShowConfirmDelete(props?.data);

            }}>Xóa</Col>}
            {props?.data?.media && <a style={{
              color: 'white',
            }} href={`${props?.data?.media?.url}`} target="_blank">            Tải xuống
            </a>} {props?.data?.text && <Col onClick={() => {
              copyToClipboard(props?.data?.text)
            }}>Sao chép</Col>}
          </Row>} >
            <MoreOutlined style={{
              transform: 'rotate(-90deg)',
              order: type === 'me' ? '1' : 'unset'

            }} />
          </Popover></>}

      </MessageWrapper>
      {((Date.parse(props?.data?.createdAt) - Date.parse(props?.prevMess?.createdAt)) >=
        3600000 ||
        !props?.prevMess?.createdAt) && <div style={{
          textAlign: 'center',
          fontSize: '12px',
          marginBottom: '1rem',
        }} className="createdAt">{dateTime(props?.data?.createdAt)}</div>}
    </>
  )
}

Message.propTypes = {}

export default Message