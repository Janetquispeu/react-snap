import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Layout } from './styled';
import configureStore from './store/configureStore';
import { App } from './view';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Layout>
      <App />
    </Layout>
  </Provider>,
  document.getElementById('root')
);