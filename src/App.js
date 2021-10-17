import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AuthContextProvider, { useAuth } from "./contexts/AuthContext";
import StudiesContextProvider from "./contexts/StudiesContext";

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <AuthContextProvider>
      <StudiesContextProvider>
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/admin" render={() => isLoggedIn ? <Admin /> : <Redirect to="/" />} />
            <Route exact path="/" render={() => isLoggedIn ? <Redirect to="/admin" /> : <Home />} />
          </Switch>
        </Router>
      </StudiesContextProvider>
    </AuthContextProvider>
  );
}
