import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { Formik } from "formik";
import Field from "../components/Field";
import { useAuth } from "../context/AuthContext";

export default function Login(props) {
  const { login } = useAuth();

  return (
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
        <form
          onSubmit={handleSubmit}
          className={
            " border bg-gray-faint border-gray-lighter rounded-lg w-full max-w-xs shadow-outer "
          }
        >
          <section className="flex flex-col items-center rounded-t-lg p-4">
            <span className="text-26 mt-3">🧙</span>
            <h2
              className="
                text-black
                font-bold
                w-full
                text-26
                truncate
                rounded-md
                text-center
                mt-2 mb-4
              "
            >
              Master Login
            </h2>
            <section className="w-full mt-4 space-y-2">
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
            <button
              onClick="handleClick"
              type="submit"
              className={`
                mt-4
                  w-full
                  border 
                  font-medium
                  px-4
                  h-9
                  h-min
                  box-border
                  rounded-full
                  hover:shadow-outer
                border-blue 
                hover:border-blue-dark 
                bg-blue 
                hover:bg-blue-dark 
                active:text-white-blue 
                active:bg-blue-darker 
                text-white  

                `}
            >
              Log In
            </button>
            <p className="mt-6 mb-3 text-13 text-gray ml-1 tracking-tight">
              Only the <span className="font-bold">Master</span> can login.
            </p>
          </section>
        </form>
      )}
    </Formik>
  );
}
