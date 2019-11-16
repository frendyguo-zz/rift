import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class NotFound extends Component {
  state = {};

  render() {
    return (
      <Route
        render={({ staticContext }) => {
          if (staticContext) staticContext.statusCode = 404;
          return <div>404 Page Not Found</div>;
        }}
      />
    );
  }
}

export default NotFound;
