import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ContextProvider } from './actions/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
