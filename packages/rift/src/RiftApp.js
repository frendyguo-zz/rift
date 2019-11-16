import React, { Component } from 'react';
import {
  Switch,
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import getInitialData from './getInitialData';

const generateRandomKey = pre => `${pre}_${new Date().getTime() + Math.random()}`;

class RiftApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      isLoading: false,
      randomKey: null,
      prevProps: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps } = prevState;
    // Initially only set prev location
    if (!prevProps.location) {
      return {
        prevProps: {
          location: nextProps.location,
        },
      };
    }

    // Reset all states on route change
    if (prevProps.location !== nextProps.location) {
      return {
        prevProps: {
          location: nextProps.location,
        },
        data: null,
        isLoading: true,
        randomKey: generateRandomKey(nextProps.location.pathname),
      };
    }

    return null;
  }

  async componentDidUpdate(prevProps) {
    const {
      location,
      history,
      routes,
      ...rest
    } = this.props;

    const navigated = prevProps.location !== location;
    if (navigated) {
      const { randomKey } = this.state;
      const key = randomKey;
      const { data } = await getInitialData(routes, location.pathname, {
        location,
        history,
        ...rest,
      });

      // Prevent updating past, irrelevant data
      const { randomKey: postFetchKey } = this.state;
      if (postFetchKey === key) {
        this.setState({
          data,
          isLoading: false,
        });
      }
    }
  }

  render() {
    const {
      data,
      isLoading,
    } = this.state;
    const {
      location,
      routes,
    } = this.props;

    const initialData = data;

    return (
      <Switch>
        {data && data.statusCode && data.statusCode === 404
          && <Route component={this.NotfoundComponent} path={location.pathname} />}
        {data && data.redirectTo && <Redirect to={data.redirectTo} />}
        {
          routes.map((route, index) => {
            const key = `route-${index}`;
            return (
              <Route
                key={key}
                path={route.path}
                exact={route.exact}
                location={location}
                render={props => React.createElement(route.component, {
                  ...initialData,
                  isLoading,
                  history: props.history,
                  location,
                  match: props.match,
                })}
              />
            );
          })
        }
      </Switch>
    );
  }
}

export default withRouter(RiftApp);
