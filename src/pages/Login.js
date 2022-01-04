import Logo from "../components/Logo";
import Field from "../components/Field";
import Button from "../components/Button";
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth, signInWithEmailAndPassword } from "../utils/firebase";

export default function Login() {
  const history = useHistory();
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      history.push('/admin');
    } catch (error) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-password') {
        console.log("We couldn't find that email and password. Give it another go")
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-ghost pt-20 pb-48">
      <Link to="/">
        <Logo />
      </Link>
      <h1 className="text-black text-22 font-bold leading-8 py-0.5 tracking-wide mt-3 mb-6">
        Master Login
      </h1>
      <Formik
        initialValues={{ email: "", password: "", general: "" }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={(values) => {
          const errors = {};
          if (values.email === "" || values.password === "") {
            if (values.email === "") {
              errors.email = "Gimme an email";
            }
            if (values.password === "") {
              errors.password = "Gimme a password";
            }
          }
          return errors;
        }}
        onSubmit={ values => {
          handleLogin(values.email, values.password);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} id="login-form" className="w-56">
            <section className="space-y-2 mb-4">
              <Field
                name={"email"}
                placeholder={"Email"}
                type={"text"}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.email}
              />
              <Field
                name={"password"}
                placeholder={"Password"}
                type={"password"}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.password}
              />
            </section>
            <Button
              id={"log-in"}
              type={"submit"}
              isPrimary={true}
              text={"Log In"}
              isFullWidth={true}
            />
          </form>
        )}
      </Formik>
      <p className="mt-6 text-13 text-gray tracking-tight">
        Only the Master can login.
      </p>
    </div>
  );
}
