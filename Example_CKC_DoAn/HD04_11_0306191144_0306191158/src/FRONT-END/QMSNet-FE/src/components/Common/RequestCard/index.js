import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetail, userFollow } from '../../../redux/user/action';
import { RequestCardWrapper } from './RequestCard.style';

const RequestCard = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { followLoading } = useSelector(state => state.user);
  const isFollowed = user?.following?.includes(props?.data?._id);

  const handleOnBtnClick = () => {
    setLoading(true)
    const type = 'follow';
    dispatch(userFollow({
      path: type + '/' + props?.data?._id,
      simple: true
    }))
  }

  useEffect(() => {
    if (loading) {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followLoading])






  return (
    <RequestCardWrapper>
      <img className="avatar" src={props?.data?.avatar?.url} alt={props?.data?.avatar?.url} />
      <div className="actions">
        <div className="name" onClick={() => {
          dispatch(setUserDetail(props?.data))
        }}>{props?.data?.username}</div>
        {isFollowed ? <Button loading={loading} onClick={() => {
          dispatch(setUserDetail(props?.data))
        }} className="q-button" type="primary" >Trang cá nhân</Button> : props.suggestions ? <Button loading={loading} onClick={handleOnBtnClick} className="q-button" type="primary" >Theo dõi</Button> :
          <Button loading={loading} onClick={handleOnBtnClick} className="q-button q-button-outline" >Theo dõi lại</Button>}

      </div>
    </RequestCardWrapper>

  )
}

RequestCard.propTypes = {}

export default RequestCard