import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './configs/theme';
import SocketClient from './socketClient';

const AppProvider = ({ children }) => {

    return (
        <>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <SocketClient/>
        </>
    );
};

AppProvider.propTypes = {};

export default AppProvider;
