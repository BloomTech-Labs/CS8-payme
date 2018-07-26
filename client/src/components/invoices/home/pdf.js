import React, { Component } from 'react';

class Pdf extends Component {
  state = {  }

  render() { 
    return (
      <div className='doc-preview'>
        <div className='doc-structure'>
        <div className="loader change" styles={{marginRight:'10rem'}}>Loading..</div> 
          <p className="pasdda" onClick={() => this.props.showImg}>x</p>
        </div>
      </div>
    );
  }
}
 
export default Pdf;
