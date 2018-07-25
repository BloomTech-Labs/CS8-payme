import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

const DropdownExampleSearchSelectionTwo = (props) => (
  <Dropdown 
    placeholder='Invoices'
    search
    selection
    options={
      props.invoices.map((invoice) => {
        return (
          <p onClick={() => props.getInvoice(invoice.number)}>{invoice.number}</p>
        );
      })
    }
  />
);

export default DropdownExampleSearchSelectionTwo;
