import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import authentication related pages
import Signin from './components/Auth/signin';
import Signup from './components/Auth/signup';
import Landing from './components/landing';
import Settings from './components/settings';

// Import dashboard pages
import Reminders from './components/reminders';
import Invoices from './components/invoices';
import Billing from './components/billing';
import AddInvoice from './components/invoices/addInvoice';
import ViewInvoice from './components/invoices/viewInvoice';

// Import higher order components
import RequireAuth from './hoc/requireAuth';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={(Landing)} />
        <Route path="/signin" component={(Signin)} />
        <Route path="/signup" component={(Signup)} />
     
        <Route path="/reminders" component={RequireAuth(Reminders)} />
        <Route path="/invoices" component={RequireAuth(Invoices)} />
        <Route path="/settings" component={RequireAuth(Settings)} />
        <Route path="/billing" component={RequireAuth(Billing)} />
        <Route path="/addInvoice" component={RequireAuth(AddInvoice)} />
        <Route path="/viewinvoice" component={RequireAuth(ViewInvoice)} />
      </Switch>
    </Router>
  );
};

export default App;
