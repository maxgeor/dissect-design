import {
  ExclamationCircleIcon,
  SparklesIcon,
  FireIcon,
} from "@heroicons/react/solid";
import { Formik } from "formik";
import Field from "../components/Field";
import Button from "../components/Button";
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
            " border bg-gray-faint border-gray-lighter rounded-lg w-full max-w-xs shadow-sm "
          }
        >
          <section className="flex flex-col items-center rounded-t-lg p-4">
            <span className="text-26 mt-1">🧙</span>
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
              Master Log In
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
                  hover:shadow-sm
                  active:shadow-none
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
            <p className="mt-5 mb-1 text-13 text-gray ml-1 tracking-tight">
              Only the <span className="font-bold">Master</span> can login.
            </p>
          </section>
          <section className="flex flex-col sm:flex-row w-min">
            <button className=" w-24 flex justify-center items-center transition-all duration-75 px-1.5 py-1 text-green-500 active:text-green-600 hover:bg-green-100 active:bg-green-200 rounded-md cursor-pointer">
              <SparklesIcon className="h-4 w-4 mr-0.5 fill-current " />
              <p className="mr-0.5 font-bold tracking-tight">Huzah!</p>
            </button>
            <button className="w-24 flex justify-center  items-center px-1.5 py-1  transition-all duration-75 text-red-500 active:text-red-600 hover:bg-red-100 active:bg-red-200 rounded-md cursor-pointer">
              <FireIcon className="h-4 w-4 mr-0.5 fill-current " />
              <p className="mr-0.5 font-bold tracking-tight ">Fwoosh!</p>
            </button>
          </section>
        </form>
      )}
    </Formik>
  );
}
