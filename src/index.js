import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Redux Funtionality and Creating the Store Insatance
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// Redux Functionality
import reducer from './redux/reducers/authReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancer(
  applyMiddleware(thunk)
))

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();