import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  // useRouteMatch,
  useLocation,
} from "react-router-dom";
import { Login, Dashboard, Profile, Customers, CustomerDetails } from "../../containers";
import { Header } from '../../components'
import firebase from '../../config/database/firebase'
// ************* Private Route ************

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"          
            }}
          />
        )
      }
    />
  );
}

// ************* Public Route ************

function PublicRoute({ component: Component, auth, ...rest }) {
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={(props) => {
        return auth === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={location.state?.from ? location.state.from : "/dashboard"} />
        );
      }}
    />
  );
}

function AppRouter() {
  const [authed, setAuthed] = useState(false);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    const subscriber = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        setLoader(false)
        setAuthed(false)
      }
      else {
        setLoader(false)
        setAuthed(true)
      }
    });
    return () => subscriber();
  }, [])


  return (
    <Router>
      <Header authed={authed} />
      <Switch>
        {loader ? <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <div class="spinner-border text-dark"></div>
        </div> : <>
          <PrivateRoute auth={authed} exact path="/dashboard" component={Dashboard} />
          <PrivateRoute auth={authed} exact path="/customerDetails/:id" component={CustomerDetails} />
          <PrivateRoute auth={authed} exact path="/profile" component={Profile} />
          <PrivateRoute auth={authed} exact path="/customers" component={Customers} />
          <PublicRoute auth={authed} exact path="/" component={Login} />
        </>}
      </Switch>
    </Router>
  );
}

export default AppRouter;
