import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './AppProvider';
import AppRoutes from './containers/AppRoutes';
import store from './redux/store';
import { GlobalStyle } from './styles';

function App() {
    return (
        <Provider store={store}>
            <AppProvider>
                <BrowserRouter>
                    <GlobalStyle />
                    <AppRoutes />
                </BrowserRouter>
            </AppProvider>
        </Provider>
    );
}

export default App;
