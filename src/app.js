import React from 'react';
import './app.scss';

// const LoadingComponent = () => (
//   <div>IS LOADING....</div>
// );

// const AsyncComponent = () => Loadable({
//   loader: () => import('./async-component' /* webpackChunkName: `asyncComponent` */),
//   loading: LoadingComponent,
// });

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Rift 123</h1>
      </div>
    );
  }
}

export default App;
