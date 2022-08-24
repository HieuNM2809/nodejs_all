import { StopOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userBlock } from '../../../redux/user/action';
import ConfirmModal from '../ConfirmModal';

const BlockBtn = ({ onMouseDown, user }) => {
    const [showConfirmBlock, setShowConfirmBlock] = useState();
    const [showConfirmUnblock, setShowConfirmUnblock] = useState();
    const { user: account } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    return (<>
        <ConfirmModal onMouseDown={() => {
            dispatch(userBlock({ path: `unblock/${showConfirmUnblock}` }))

        }} okText="Hủy chặn" visible={showConfirmUnblock} setVisible={setShowConfirmUnblock} title="Bạn có muốn hủy chặn?" subTitle="Bạn và người dùng này có thể liên lạc và nhìn thấy bài viết của nhau trong tương lai." />
        <Modal centered bodyStyle={{
            fontSize: '16px'
        }} visible={showConfirmBlock} footer={<Row justify="end">
            <Button size="large" onMouseDown={() => {
                setShowConfirmBlock(false);
            }} style={{
                fontWeight: '600'
            }} type="link">Hủy</Button>
            <Button size="large" className="q-button" onMouseDown={() => {
                setShowConfirmBlock(false)
                onMouseDown()
            }} type="primary">Chặn</Button>
        </Row>} onCancel={() => {
            setShowConfirmBlock(false)
        }} destroyOnClose={true} title="Bạn có muốn chặn người dùng này">
            Bạn và người dùng này sẽ hủy theo dõi nhau và không thể liên lạc hay nhìn thấy bài viết của nhau trong tương lai.
        </Modal>

        <Row onMouseDown={() => {
            if (account.blocks.includes(user._id)) {
                setShowConfirmUnblock(user._id)
            } else {
                setShowConfirmBlock(user)
            }

        }}>
            <Col>
                <StopOutlined />
            </Col>
            <Col>
                {account.blocks.includes(user._id) ? 'Mở chặn người dùng' : 'Chặn người dùng'}
            </Col>
        </Row>
    </>
    )
}

export default BlockBtn