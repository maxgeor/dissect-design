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
import StudiesContextProvider, {useStudies} from "./contexts/StudiesContext";

export default function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { studies, newStudy, setNewStudy, isLoading } = useStudies();

  return (
    <AuthContextProvider>
      <StudiesContextProvider>
        <Router>
          <Switch>
            <Route exact path="/login">
              {isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login />
              )}
            </Route>
            <Route exact path="/">
              {isLoggedIn ? (
                <Admin
                  studies={studies}
                  newStudy={newStudy}
                  setNewStudy={setNewStudy}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  isLoading={isLoading}
                />
              ) : (
                <Home
                  studies={studies}
                  newStudy={newStudy}
                  setNewStudy={setNewStudy}
                  isLoading={isLoading}
                />
              )}
            </Route>
          </Switch>
        </Router>
      </StudiesContextProvider>
    </AuthContextProvider>
  );
}
