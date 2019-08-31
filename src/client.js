import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { loadComponents } from 'loadable-components';
import App from './app';

const data = window._INITIAL_DATA_; // eslint-disable-line

const render = (Comp) => {
  loadComponents().then(() => {
    ReactDOM.hydrate(
      <AppContainer>
        <Comp initialData={data} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NewApp = require('./app').default;
    render(NewApp);
  });
}
