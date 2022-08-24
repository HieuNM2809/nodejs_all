import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { SettingWrapper } from './Setting.style'
import { Tabs } from 'antd'
import Layout from '../../components/Common/Layout'
import Information from '../User/Profile/Form/Infomation'
import Service from './Tabs/Service'
import Privacy from './Tabs/Privacy'
import Block from './Tabs/Block'
import { useLocation } from 'react-router-dom'
import UseWindow from '../../hooks/useWindowResize'
import Support from './Tabs/Support'
const TabPane = Tabs.TabPane

const Settings = props => {
    const [key, setKey] = useState('profile')
    const location = useLocation();
    const [sizes] = UseWindow()




    useEffect(() => {
        if (location.state) {
            setKey(location.state)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Layout>
            <SettingWrapper>
                <Tabs activeKey={key} onTabClick={(key) => {
                    setKey(key)

                }} tabPosition={sizes.width >= 800 ? "left" : "top"}>
                    <TabPane tab={<>
                        <img src="/assets/images/setting.png" alt="" />
                        Chỉnh sửa trang cá nhân
                    </>} key="profile">
                        <Information />
                    </TabPane>
                    <TabPane tab={
                        <>
                            <img src="/assets/images/service.png" alt="" />
                            Đổi mật khẩu
                        </>
                    } key="password">
                        <Service />
                    </TabPane>
                    <TabPane tab={
                        <>
                            <img src="/assets/images/private.png" alt="" />
                            Quyền riêng tư
                        </>
                    } key="privacy">
                        <Privacy />
                    </TabPane>
                    <TabPane tab={
                        <>
                            <img src="/assets/images/user-block.png" alt="" />
                            Chặn
                        </>
                    } key="block">
                        <Block />
                    </TabPane>
                    <TabPane tab={
                        <>
                            <img src="/assets/images/support.png" alt="" />
                            Hộp thư liên hệ, hỗ trợ
                        </>
                    } key="support">
                        <Support />
                    </TabPane>
                </Tabs>
            </SettingWrapper>
        </Layout>
    )
}

Settings.propTypes = {}

export default Settings