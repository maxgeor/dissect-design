import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContextProvider, { useAuth } from "./contexts/AuthContext";
import StudiesContextProvider from "./contexts/StudiesContext";

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="antialiased">
      <AuthContextProvider>
        <StudiesContextProvider>
          <Router>
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              {/* <Route exact path="/admin" render={() => isLoggedIn ? <Admin /> : <Redirect to="/" />} /> */}
              <ProtectedRoute path="/admin">
                <Admin />
              </ProtectedRoute>
              <Route exact path="/" render={() => isLoggedIn ? <Redirect to="/admin" /> : <Home />} />
            </Switch>
          </Router>
        </StudiesContextProvider>
      </AuthContextProvider>
    </div>
  );
}
