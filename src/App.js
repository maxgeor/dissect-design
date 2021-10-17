import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { db, onSnapshot, collection } from "./utils/firebase";
import AuthContextProvider, { useAuth } from "./contexts/AuthContext";

export default function App() {
  const [studies, setStudies] = useState([]);
  const [newStudy, setNewStudy] = useState({});
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      onSnapshot(collection(db, "studies"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStudies(data);
        setIsLoading(false);
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, [setStudies]);

  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/login">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
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
    </AuthContextProvider>
  );
}
