import React, {ReactNode} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {isAuthenticated} from "./utils/methods";

import Home from "./containers/Home";
import Result from "./containers/Result";
import Login from "./containers/Login";

interface IProps {
  children: ReactNode;
  exact: boolean;
  path: string | string[];
  // any other props that come into the component
}

function PrivateRoute({children, ...props}: IProps) {
  return (
    <Route
      {...props}
      render={({location}) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: location}
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={["/"]}>
            <Redirect to={isAuthenticated() ? "/home" : "/login"}/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <PrivateRoute exact path="/result">
            <Result/>
          </PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
