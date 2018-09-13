import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import landPic from './coins.jpg';
import logo from './giveMe.png';
import { autoLogin } from '../../actions/auth';
import Auth from '../Auth/Auth';
// import givme from './giveMe.png';

// const styles = {
// backgroundImage: `url(${landPic})`,
// backgroundSize: 'cover',
// };
const auth = new Auth();

class Landing extends Component {
  componentDidMount() {
    // const auth = new Auth();
    // const token = localStorage.getItem('id');
    // if (token) {
    //   this.props.autoLogin(token, this.props.history);
    // }
    auth.handleAuthentication();
  }

  render() {
    // const auth = new Auth();
    return (
      <div className="landing">
        <div className="landing-container">
          {/* <img src={landPic} style={styles} alt="SideLogo" className="landing-image" /> */}
          {/* <img src={givme} className="landing-logo" alt="logo" /> */}
          <div className="landing-logo">
            {/* <p className="landing-title">
              giveMe
              <span style={{ color: '#22CFB1' }}>.</span>
              <h1 className="landing-slogan">myMoney</h1>
            </p> */}
            <img src={logo} alt="logo" className="landing-logo_pic" />
            <div className="landing-buttons">
              <Link to="/signin">
                <button className="landing-signin">Sign In</button>
              </Link>
              <Link to="/signup">
                <button className="landing-signup">Sign up</button>
              </Link>

              <button onClick={() => auth.login()}>Auth0</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { autoLogin },
)(Landing);
