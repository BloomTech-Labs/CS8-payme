import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Document, Page } from 'react-pdf';
import { getInvoice } from '../../../actions/invoices';

class Pdf extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    loading: true,
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
 
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const array = Array.from(Array(numPages).keys());

    let url;
    let noimg;
    let img;
    let load = 'loader';
    let loading = 'loading...'
    const { invoice } = this.props;
    if (invoice) {
      const { _id } = this.props.invoice;
      url = `http://localhost:5000/api/getpdf/${_id}`;
      if (invoice.img.data === null) {
        noimg = `Your currently do not have a PDF/img for invoice ${invoice.number}`;
        load="null"
        loading=""
      } else {
        img = invoice.img.data
      }
    }
    return (
      <div className='doc-preview'>
        <div className='doc-container'>
          <p className="doc-content_back" onClick={() => this.props.history.push('/invoices')}><i className="fas fa-arrow-left fa-fw" /></p>
          {img ? (
            <React.Fragment>
              <div className="doc-content">
                <a href={url} target="_blank">
	                <button className="doc-content_button">Download</button>
                </a>
                {/* <a className="doc-content_newtab" href={url} target="_blank"> View invoice in a new tab</a> */}
              </div>
                <div>
                  <p>Page {pageNumber} of {numPages}</p>
                  <Document
                    file={url}
                    className="doc-image"
                    onLoadSuccess={this.onDocumentLoadSuccess}
                  >
                  {array.map(page => (
                    <Page pageNumber={page} />
                  ))}

                 </Document>
                </div>
              </React.Fragment>
          ) : <div className={load} style={{ color: 'white' }}>{loading}</div>
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

export default connect(mapStateToProps, { getInvoice })(Pdf);
// <img className="doc-image"src={url} alt='img'/>
