import React from 'react';
import loadable from 'loadable-components';
import './app.scss';

const AsyncComponent = loadable(() => import(/* webpackChunkName: `asyncComponent` */ './async-component'));

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Rift 123</h1>
        <AsyncComponent />
      </div>
    );
  }
}

export default App;
