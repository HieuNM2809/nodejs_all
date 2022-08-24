import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './root-reducer';
import reduxSaga from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleware = reduxSaga();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
export default store;
