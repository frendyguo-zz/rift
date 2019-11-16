import React from 'react';

export default function asyncComponent({
  loader,
  Placeholder,
}) {
  let LoadedComponent = null;

  return class AsyncComponent extends React.Component {
    static load() {
      return loader().then((Comp) => {
        LoadedComponent = Comp.default || Comp;
      });
    }

    static getInitialProps(ctx) {
      if (!LoadedComponent) {
        return null;
      }

      return LoadedComponent.getInitialProps
        ? LoadedComponent.getInitialProps(ctx)
        : Promise.resolve(null);
    }

    constructor(props) {
      super(props);
      this.state = {
        Component: LoadedComponent,
      };
    }

    async componentDidMount() {
      AsyncComponent.load().then(this.updateComp);
    }

    updateComp = () => {
      const { Component } = this.state;
      if (Component !== LoadedComponent) {
        this.setState({ Component: LoadedComponent });
      }
    }

    render() {
      const { Component } = this.state;

      if (Component) {
        return <Component {...this.props} />;
      }

      if (Placeholder) {
        return <Placeholder {...this.props} />;
      }

      return null;
    }
  };
}
