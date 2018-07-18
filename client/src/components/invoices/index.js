import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar';

class Invoices extends Component {
  state = {
    imageURL: '',
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      });
    });
  }

  render() {
    return (
      <div className="invoice">
        <Sidebar />
        <div className="invoice-search">
          <input
          type="text"
          placeholder="Search Invoices"
          className="invoice-search_input"
          value={this.state.search}
          onChange={this.updateSearch}
          />
        </div>
        <div className="invoice-box">
          <p className="invoice-id">#23242342</p>
          <p>Name</p>
          <p>Company Inc</p>
          <p>Email@gmail.com</p>
          <p>phone number <span className="invoice-pdf"> Invoice PDF</span></p>
          <hr />
          <p>Weekly</p>
          </div>
        <div className="try">
        <Link to="/addinvoice"><p className="invoice-new">Add Invoice<i className="fas fa-plus  fa-fw" /></p></Link>
        </div>
      </div>
    );
  }
}

export default Invoices;
