import "./App.css";
import { Dashboad } from "./View/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routes } from "./View/Routes/routes";
function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => {
          return (
            <Route path={route.path} exact={route.exact}>
              {<route.Component />}
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}

export default App;
