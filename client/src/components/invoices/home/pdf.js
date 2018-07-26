import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { resetCurrInv } from '../../../actions/invoices';

class Pdf extends Component {

  render() {
    let url;
    let noimg;
    const { invoice } = this.props;
    if (invoice) {
      const { _id } = this.props.invoice;
      console.log(_id);
      url = `http://localhost:5000/api/getpdf/${_id}`;
    
    if(invoice.img.data === null) {
        noimg= `Your currently do not have a PDF/img for invoice ${invoice.number}`;
    }
  };
    return (
      <div className='doc-preview'>
        <div className='doc-content'>
          {/* <div className="loader change" styles={{marginRight:'10rem'}}>Loading..</div>  */}
          <p className="pasdda" onClick={() => this.props.togglePdf()}><i className="fas fa-arrow-left fa-fw" /></p>
          {this.props.invoice ?
            <img className="doc-image"src={url} alt='img'/>
            : <div className="loader change" style={{color:'white'}}>Loading..</div>
          }
          <p style={{color:'white', margin:'15rem auto', fontSize:'2rem'}}>{noimg}</p>
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
