import Logo from "../components/Logo";
import Field from "../components/Field";
import Button from "../components/Button";
import { Formik } from "formik";
import { Link, Redirect } from "react-router-dom";
import { useAuth, AuthProvider } from "../context/AuthContext";

export default function Login({ loggedIn, setLoggedIn }) {
  const { login } = useAuth();

  if (loggedIn) {
    return <Redirect to="/admin" />;
  }

  return (
    <AuthProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-ghost pt-20 pb-48">
        <Link to="/">
          <Logo />
        </Link>
        <h1 className="text-balck text-22 font-bold tracking-wide mt-4 mb-8">
          Master Login
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validateOnChange={false}
          validateOnBlur={true}
          validate={(values) => {
            const errors = {};
            if (values.email === "") {
              errors.email = "Gimme an email";
            }
            // else if () {
            //   errors.email = "Hmmm we don't have that one. If you aren't the Master, you won't be able to login.";
            // }
            if (values.password === "") {
              errors.password = "Gimme an password";
            }
            // else if () {
            //   errors.password = "Hmmm we don't have that one. If you aren't the Master, you won't be able to login.";
            // }
            return errors;
          }}
          onSubmit={async (email, password) => {
            try {
              await login(email, password);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} id="login-form" className={"w-56"}>
              <section className="space-y-2 mb-4">
                <Field
                  name={"email"}
                  placeholder={"Email"}
                  type={"text"}
                  handleChange={handleChange}
                />
                <Field
                  name={"password"}
                  placeholder={"Password"}
                  type={"password"}
                  handleChange={handleChange}
                  errors={errors.password}
                />
              </section>
              <Button
                handleClick={handleSubmit}
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
          Only the <span className="font-medium">Master</span> can login.
        </p>
      </div>
    </AuthProvider>
  );
}
