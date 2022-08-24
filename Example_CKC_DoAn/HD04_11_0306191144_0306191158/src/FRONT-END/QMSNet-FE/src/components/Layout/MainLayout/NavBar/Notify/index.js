import { Avatar, Col, message, Popover, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { setReportModal } from '../../../../../redux/app/action';
import { deleteNotify, readNotify, unreadNotify } from '../../../../../redux/notify/action';
import { setDetailModal } from '../../../../../redux/post/action';
import { setUserDetail } from '../../../../../redux/user/action';
import { timeAgo } from '../../../../../utils/time_utils';
import { NotifyWrapper } from './Notify.style';

import { CheckOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { MoreIcon } from '../../../../../assets/icon/index';
const Notify = ({ notify }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    if (!notify?.isRead) {
      dispatch(readNotify(notify._id));
    }
    if (notify?.action !== 6 && !notify?.user) {
      return message.error('Không thể truy cập')
    }

    switch (notify?.action) {
      case 1:
        return dispatch(setUserDetail(notify?.user))
      case 2:
        return dispatch(setDetailModal(notify.postId))
      case 3:
        return dispatch(setDetailModal(notify.postId, notify.commentId))
      case 4:
        return dispatch(setDetailModal(notify.postId, notify.commentId))
      case 5:
        return dispatch(setDetailModal(notify.postId, notify.commentId))
      case 6:
        return dispatch(setReportModal(notify.reportId))
      default:
        break;
    }
  }


  return (
    <>
      <NotifyWrapper onClick={handleOnClick} className={`${notify?.isRead && 'isRead'}`}>
        <Avatar size="large" src={notify?.user?.avatar?.url || '/assets/images/QMNets.png'} />
        <div className="right">
          <div className="content" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px'

          }}>
            <div style={{
              flex: '1',
            }}>
              {notify?.action !== 6 && <span>{notify?.user?.username || 'Người dùng QMNets'}</span>} {notify?.text} <div className="preview-content">
                {notify?.content}
              </div>
            </div>
            {notify?.media?.length > 0 && <div className="notify-media">
              {notify?.media[0]?.url.match('/image/') ? <img src={notify?.media[0]?.url} alt={notify?.media[0]?.url} /> : <video controls={false}  >
                <source src={notify?.media[0]?.url} type="video/mp4" />
              </video>}
            </div>}
          </div>
          <div className="createdAt">
            {timeAgo(notify?.updatedAt, false)}
          </div>
        </div>
        <Popover overlayClassName='postActions' trigger="click" content={<div className="postActions" >
          <Row onClick={(e) => {
            if (notify?.isRead)
              dispatch(unreadNotify(notify?._id))
            else
              dispatch(readNotify(notify?._id))
            e.preventDefault()
            e.stopPropagation()
          }}>
            <Col>
              <CheckOutlined />
            </Col>
            <Col>
              {notify?.isRead ? 'Đánh dấu là chưa đọc' : 'Đánh dấu là đã đọc'}
            </Col>
          </Row>
          <Row onClick={(e) => {
            dispatch(deleteNotify(notify?._id))
            e.preventDefault()
            e.stopPropagation()
          }}>
            <Col>
              <CloseSquareOutlined />
            </Col>
            <Col>
              Gỡ thông báo này
            </Col>
          </Row>



        </div>}>
          <div className="more-action" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

          }}>
            <MoreIcon />
          </div>
        </Popover>

      </NotifyWrapper>
    </>
  )
}

Notify.propTypes = {}

export default Notify