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
import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { onSnapshot, collection } from "@firebase/firestore";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [studies, setStudies] = useState([]);
  const [newStudy, setNewStudy] = useState({});

  useEffect(() => {
    onSnapshot(collection(db, "studies"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStudies(data);
    });
  }, [setStudies]);

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
              <Admin
                studies={studies}
                newStudy={newStudy}
                setNewStudy={setNewStudy}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            )}
          </Route>
          <Route path="/">
            <Home
              studies={studies}
              newStudy={newStudy}
              setNewStudy={setNewStudy}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}
