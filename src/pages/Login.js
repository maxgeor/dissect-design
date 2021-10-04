import Logo from "../components/Logo";
import Button from "../components/Button";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { Formik } from "formik";
import Field from "../components/Field";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login(props) {
  const { login } = useAuth();

  return (
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
          <form onSubmit={handleSubmit} className={"w-56"}>
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
        Only the Master can login.
      </p>
    </div>
  );
}
