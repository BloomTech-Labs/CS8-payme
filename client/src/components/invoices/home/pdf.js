import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { resetCurrInv } from '../../../actions/invoices';

class Pdf extends Component {

  render() {
    let url;
    if (this.props.invoice) {
      const { _id } = this.props.invoice;
      console.log(_id);
      url = `http://localhost:5000/api/getpdf/${_id}`;
    };
    return (
      <div className='doc-preview'>
        <div className='doc-content'>
          {/* <div className="loader change" styles={{marginRight:'10rem'}}>Loading..</div>  */}
          <p className="pasdda" onClick={() => this.props.togglePdf()}>x</p>
          {this.props.invoice ?
            <img className="doc-image"src={url} alt='img'/>
            : <div className="loader change" styles={{marginRight:'10rem'}}>Loading..</div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    invoice: state.invoice.currentInvoice,
  };
};

export default connect(mapStateToProps, { resetCurrInv })(Pdf);
