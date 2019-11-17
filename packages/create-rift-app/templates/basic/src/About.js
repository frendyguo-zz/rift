import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
  static async getInitialProps() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ aboutPayload: 'about payload' });
      }, 1000);
    });
  }

  render() {
    const { aboutPayload, isLoading } = this.props;

    return (
      <div>
        <h2>About Page</h2>
        <Link to="/">Link to Home</Link>
        <p>
          {
            isLoading
              ? 'LOADING'
              : aboutPayload
          }
        </p>
      </div>
    );
  }
}

export default About;
