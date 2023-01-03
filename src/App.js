import React from 'react';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { FirebaseProvider } from './contexts/FirebaseContext';

import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';
import Signup1 from './views/auth/signup/SignUp1';
import SignIn1 from './views/auth/signin/SignIn1';

const App = () => {
  const token = Cookies.get('token');

  if (!token) {
    return (
      <React.Fragment>
        <Router>
          <Route exact path="/auth/signup" component={Signup1} />
          <Route exact path="/auth/signin" component={SignIn1} />
          <Redirect to="/auth/signin" />
        </Router>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
    </React.Fragment>
  );
};

export default App;
