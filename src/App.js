import React from 'react'
import "./assets/css/sb-admin-2.min.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from './routes'

require('dotenv').config()

function App() {
  return (
    <Router>
      {showContentMenus(routes)}

    </Router>
  )

  function showContentMenus(routes){
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  }
}

export default App
