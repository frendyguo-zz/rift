import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter, matchPath } from 'react-router-dom';
import routes from './routes';
import RiftApp from '../lib/_app';

/* global document */
/* global window */
const awaitData = async () => {
  await Promise.all(
    routes.map((route) => {
      const match = matchPath(window.location.pathname, route);
      if (match && route.component && route.component.load) {
        return route.component.load();
      }
      return undefined;
    }),
  );

  let data;
  // eslint-disable-next-line valid-typeof
  if (typeof window !== undefined && !!document) {
    // Deserializing data
    data = eval(`(${document.getElementById('__RIFT_DATA__').textContent})`); // eslint-disable-line
  }
  return Promise.resolve(data);
};

awaitData().then(data => ReactDOM.hydrate(
  <AppContainer>
    <BrowserRouter>
      <RiftApp data={data} routes={routes} />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('root'),
));

if (module.hot) {
  module.hot.accept();
}
