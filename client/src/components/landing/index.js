import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import landPic from './landing.jpg';
// import { Input, Button } from 'semantic-ui-react';

// See if we can import bebas font 
const styles = {
  backgroundImage: `url(${landPic})`,
};

class Landing extends Component {
  state = {}
  render() { 
    return ( 
      <div className="landing">
        <p className="landing-title">payMe</p>
        <h1 className="landing-slogan">Lorem Ipsum</h1>
        <img src={landPic} style={styles} alt="SideLogo" className="landing-image" />
        <Link to="/signin"> 
          <button className="landing-signin">
            Sign In
          </button>
        </Link>
        <Link to="/signup"> 
          <button className="landing-signup">
            Sign up 
          </button>
        </Link>
      </div> 
    )
  }
}
 
export default Landing;