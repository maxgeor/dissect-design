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
import StudyContextProvider, {useStudies} from "./contexts/StudyContext";
import _ from 'lodash';

export default function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { studies, newStudy, setNewStudy, isLoading } = useStudies();

  // useEffect(() => {
  //   setIsLoading(true);
  //   try {
  //     onSnapshot(collection(db, "studies"), (snapshot) => {
  //       const data = snapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setStudies(data);
  //       setIsLoading(false);
  //       // const sortedStudies = studies.sort(study => study.added_at)
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     setIsLoading(false);
  //   }
  // }, [setStudies]);

  return (
    <AuthContextProvider>
      <StudyContextProvider>
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
        </Router>`
      </StudyContextProvider>
    </AuthContextProvider>
  );
}
