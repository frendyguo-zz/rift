import React from 'react';
import loadable from 'loadable-components';
import ReactLogo from './react.svg';
import './app.scss';

const AsyncComponent = loadable(() => import(/* webpackChunkName: `asyncComponent` */ './async-component'));

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="appMain">
        <img className="appMain-reactLogo" alt="React Logo" src={ReactLogo} />
        <div className="appMain-webpackLogo" />
        <h1>Rift</h1>
        <AsyncComponent />
      </div>
    );
  }
}

export default App;
