export const APP_ACTION = {
    updateWindowSize: 'UPDATE-WINDOW-SIZE',
    setAppLoading: 'SET-APP-LOADING',
    setTabActive: 'SET-TAB-ACTIVE',
    setNotifyModal: 'SET_NOTIFY_MODAL',
    setReportModal: 'SET_REPORT_MODAL',
};

export const updateWindowSize = (payload) => ({
    type: APP_ACTION.updateWindowSize,
    payload,
});



export const setAppLoading = (payload) => ({
    type: APP_ACTION.setAppLoading,
    payload,
});

export const setNotifyModal = (payload) => ({
    type: APP_ACTION.setNotifyModal,
    payload,
});
export const setTabActive = (payload) => ({
    type: APP_ACTION.setTabActive,
    payload,
});
export const setReportModal = (payload) => ({
    type: APP_ACTION.setReportModal,
    payload,
});
