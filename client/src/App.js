import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import authentication related pages
import Landing from './components/landing';
import Signin from './components/Auth/signin';
import Signup from './components/Auth/signup';
import Settings from './components/settings';

// Import dashboard pages
import Reminders from './components/reminders';
import Invoices from './components/invoices';
import Billing from './components/billing';
import AddInvoice from './components/invoices/addInvoice';
import ViewInvoice from './components/invoices/viewInvoice';
import UpdateInvoice from './components/invoices/updateInvoice';

// Import higher order components
import RequireAuth from './HOC/requireAuth';

const App = () => {
  return (
    <Router>
      <Switch>
<<<<<<< HEAD
<<<<<<< HEAD
        <Route exact path="/" component={Landing} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />

=======
        <Route exact path="/" component={(Landing)} />
        <Route path="/signin" component={(Signin)} />
        <Route path="/signup" component={(Signup)} />
>>>>>>> master
=======
        <Route exact path="/" component={Landing} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={(Landing)} />
        <Route path="/signin" component={(Signin)} />
        <Route path="/signup" component={(Signup)} />
>>>>>>> refs/remotes/origin/luis-branch
        <Route path="/reminders" component={RequireAuth(Reminders)} />
        <Route path="/settings" component={RequireAuth(Settings)} />
        <Route path="/billing" component={RequireAuth(Billing)} />
        <Route path="/invoices" component={RequireAuth(Invoices)} />
        <Route path="/addInvoice" component={RequireAuth(AddInvoice)} />
        <Route path="/viewinvoice" component={RequireAuth(ViewInvoice)} />
        <Route path="/updateinvoice" component={RequireAuth(UpdateInvoice)} />
      </Switch>
    </Router>
  );
};

export default App;
