import { useAuth } from "../contexts/AuthContext";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ children, ...rest }) {
  let { isLoggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn 
        ? children
        : <Redirect to="/login"/>
      }
    />
  );
}
  