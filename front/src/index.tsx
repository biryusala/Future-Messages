import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import createSagaMiddleware from "redux-saga";
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./redux/reducer";
import rootSaga from "./sagas/rootSaga";
import {Provider} from "react-redux";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enchancer = process.env.NODE_ENV === 'development'
  ? composeEnhancers(applyMiddleware(sagaMiddleware))
  : applyMiddleware(sagaMiddleware);

const store = createStore(reducer, enchancer);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
