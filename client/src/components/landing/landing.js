import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import landPic from './landing.jpg';
import { autoLogin } from '../../actions/auth';

const styles = {
  backgroundImage: `url(${landPic})`,
  backgroundSize: 'cover',
  // backgroundPosition: 'center',
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
        <div className="landing-container">
          <img src={landPic} style={styles} alt="SideLogo" className="landing-image" />
          <p className="landing-title">giveMe<span style={{ color: '#22CFB1' }}>.</span></p>
          <h1 className="landing-slogan">myMoney</h1>
          <Link to="/signin">
            <button className="landing-signin">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="landing-signup">Sign up</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { autoLogin },
)(Landing);
