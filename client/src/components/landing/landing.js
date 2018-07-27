import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import landPic from './landing.jpg';
import { autoLogin } from '../../actions/auth';

const styles = {
  backgroundImage: `url(${landPic})`,
  backgroundSize: 'fill',
  backgroundPosition: 'center',
};
class Landing extends Component {
  componentDidMount() {
    const token = localStorage.getItem('id');
    if (token) {
      this.props.autoLogin(token, this.props.history);
    }
  }

  render() {
    return (
      <div className="landing">
        <p className="landing-title">payMe</p>
        <h1 className="landing-slogan">Lorem Ipsum</h1>
        <img src={landPic} style={styles} alt="SideLogo" className="landing-image" />
        <Link to="/signin">
          <button className="landing-signin">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="landing-signup">Sign up</button>
        </Link>
      </div>
    );
  }
}

export default connect(
  null,
  { autoLogin },
)(Landing);
