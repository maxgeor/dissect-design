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
          <Route exact path="/login">
            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>
          <Route exact path="/admin">
            {!loggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Admin loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            )}
          </Route>
          <Route path="/">
            <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
