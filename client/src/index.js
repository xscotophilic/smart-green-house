import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';

import reducers from './reducers';

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(reduxThunk)));

ReactDom.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);