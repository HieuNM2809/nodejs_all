import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { message } from 'antd'

const useScrollInfinity = (page, action, ref, isOver, scrollRef) => {
    const current = useRef();
    const dispatch = useDispatch();
    const handleScroll = useCallback(async () => {
        if (
            scrollRef?.innerHeight + scrollRef?.pageYOffset >=
            ref?.current?.offsetHeight - (!isOver ? 2000 : 0)
        ) {
            if (!isOver && (!current.current || Number(page) === Number(current.current))) {
                if (!current.current) {
                    current.current = 2;
                } else {
                    current.current = current.current + 1;
                }

                dispatch(action())
            }
            if (isOver) {
                message.info('Bạn đã xem hết bài viết')
                window.removeEventListener('scroll', handleScroll);
            }


        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

}

useScrollInfinity.propTypes = {}

export default useScrollInfinity