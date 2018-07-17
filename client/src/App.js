import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/landing';
import Reminders from './components/reminders';
import Invoices from './components/invoices';
import Settings from './components/settings';
import Billing from './components/billing';
import AddInvoice from './components/invoices/addInvoice';

import Signin from './components/Auth/signin';
import Signup from './components/Auth/signup';

import RequireAuth from './HOC/requireAuth';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={(Landing)} />
        <Route path="/reminders" component={RequireAuth(Reminders)} />
        <Route path="/signin" component={(Signin)} />
        <Route path="/signup" component={(Signup)} />
        <Route path="/invoices" component={RequireAuth(Invoices)} />
        <Route path="/settings" component={RequireAuth(Settings)} />
        <Route path="/billing" component={RequireAuth(Billing)} />
        <Route path="/addInvoice" component={RequireAuth(AddInvoice)} />
      </Switch>
    </Router>
  );
};

export default App;
