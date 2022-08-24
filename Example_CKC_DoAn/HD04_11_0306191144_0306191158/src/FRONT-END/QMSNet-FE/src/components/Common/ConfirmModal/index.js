import { Button, Modal, Row } from 'antd';
import { useState } from 'react';

const ConfirmModal = ({
    title,
    subTitle,
    onMouseDown,
    okText,
    visible,
    setVisible,
    cancelText
}) => {
    return (
        <Modal centered bodyStyle={{
            fontSize: '16px'
        }} visible={visible} footer={<Row justify="end">
            <Button size="large" onMouseDown={() => {
                setVisible(false);
            }} style={{
                fontWeight: '600'
            }} type="link">{cancelText || 'Hủy'}</Button>
            <Button size="large" className="q-button" onMouseDown={() => {
                setVisible(false)
                onMouseDown()
            }} type="primary">{okText}</Button>
        </Row>} onCancel={() => {
            setVisible(false)
        }} destroyOnClose={true} title={title}>
            {subTitle}
        </Modal>
    )
}

ConfirmModal.propTypes = {}

export default ConfirmModal