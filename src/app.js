import React from 'react';
import loadable from 'loadable-components';
import './app.less';
import './app.scss';

const AsyncComponent = loadable(() => import(/* webpackChunkName: `asyncComponent` */ './async-component'));

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Rift</h1>
        <AsyncComponent />
      </div>
    );
  }
}

export default App;
