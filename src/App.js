import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            exact
            path="/login"
          >
            <Login />
          </Route>
          <Route
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            exact
            path="/admin"
          >
            {loggedIn ? <Admin /> : <Redirect to="/" />}
          </Route>
          <Route loggedIn={loggedIn} setLoggedIn={setLoggedIn} path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
