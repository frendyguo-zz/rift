import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

class Home extends Component {
  static async getInitialProps() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ stuff: 'foo: bar' });
        // return { stuff: 'whatevs' };
      }, 1000);
    });
  }

  render() {
    const { stuff, isLoading } = this.props;

    return (
      <div className="Home">
        <h2>Welcome to Rift.js</h2>
        <Link to="/about">Link to about page</Link>
        <p>
          {
            isLoading
              ? 'LOADING'
              : stuff
          }
        </p>
      </div>
    );
  }
}

export default Home;
