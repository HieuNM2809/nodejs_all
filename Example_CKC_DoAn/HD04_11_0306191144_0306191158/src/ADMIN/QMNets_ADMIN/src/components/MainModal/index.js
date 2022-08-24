import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal as setToggleModal } from '../../redux/app/action'

const MainModal = ({ loading, form }) => {
    const { dataModal } = useSelector(state => state.app);
    const dispatch = useDispatch();

    const handleOnCancel = () => {
        dispatch(setToggleModal(null))

    }
    return (
        <Modal
            className="main-modal"
            title={typeof dataModal === 'string' ? 'Thêm' : 'Sửa'}
            onCancel={handleOnCancel}
            visible={dataModal}
            destroyOnClose={true}
            footer={null}
            width={1000}
        >
            {form}
        </Modal>
    )
}

MainModal.propTypes = {}

export default MainModal