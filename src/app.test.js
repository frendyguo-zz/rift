import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

it('renders without crashing', () => {
  /* global document */
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('1 + 1 = 2', () => {
  expect(1 + 1).toEqual(2);
});
