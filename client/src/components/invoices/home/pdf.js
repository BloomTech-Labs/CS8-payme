import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// import { getPdf } from '../../../actions/invoices';

class Pdf extends Component {
  state = { }

  // componentDidMount() {
  //   this.getPdf(this.props.id);
  // }

  // getpdf = () => {
  //   axios.get(`/api/getpdf/${id}`,
  //     { headers: { Authorization: `bearer ${localStorage.getItem('id')}` } })
  //     .then(res => {
  //       console.log(res.data);
  //     // dispatch({ type: 'CURRENT_INVOICE', payload: res.data });
  //     // history.push({ pathname: `/invoice/${res.data.number}` });
  //     })
  //     .catch(err => {
  //       if (err) console.log('error: ', err);
  //     });
  // }

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

export default connect(mapStateToProps)(Pdf);
