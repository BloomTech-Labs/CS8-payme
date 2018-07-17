import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/landing/';
import Reminders from './components/reminders/';
import Invoices from './components/invoices/';
import Settings from './components/settings/';
import Billing from './components/billing/';

import Signin from './components/Auth/signin';
import Signup from './components/Auth/signup';

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/reminders" component={Reminders} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/invoices" component={Invoices} />
            <Route path="/settings" component={Settings} />
            <Route path="/billing" component={Billing} />
          </Switch>
      </Router>
    );
  }
}

export default App;
