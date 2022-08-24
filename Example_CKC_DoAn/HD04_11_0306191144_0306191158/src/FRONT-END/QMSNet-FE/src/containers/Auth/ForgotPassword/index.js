import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../../../api/axiosClient'
import { setNotifyModal } from '../../../redux/app/action'

const ForgotPassword = props => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const FetchForgotPassword = async () => {
            try {
                const res = await axiosClient.get(`/generatePassword/${params?.id}`);
                if (res.success) {
                    navigate('/signin');
                    dispatch(setNotifyModal(res))
                }
            } catch (error) {
                navigate('/signin');
                dispatch(setNotifyModal(error))
            }
        }
        FetchForgotPassword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{
            height: '30rem',
        }}>
        </div>
    )
}

ForgotPassword.propTypes = {}

export default ForgotPassword