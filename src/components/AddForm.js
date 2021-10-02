import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { Formik } from "formik";
import Field from "./Field";
import Button from "./Button";

export default function AddForm(props) {
  const isLinkValid = (link) => {
    try {
      new URL(link);
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  };
  const doesLinkExist = (link) =>
    props.studies.find((study) => study.link === link);
  return (
    <Formik
      initialValues={{ title: "", link: "", adder: "" }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={(values) => {
        const errors = {};
        if (values.title === "") {
          errors.title = "Give your case study a title";
        }
        if (values.link === "") {
          errors.link = "You need to add a link";
        } else if (!isLinkValid(values.link)) {
          errors.link =
            "That doesn't look like a link. Try copy & pasting it again";
        } else if (doesLinkExist(values.link)) {
          errors.link = "Someone already added that one. Got another?";
        }
        if (values.adder === "") {
          errors.adder = "Let people know who your are";
        }
        return errors;
      }}
      onSubmit={(study) => {
        try {
          props.addStudy(study);
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {({ errors, handleChange, handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          id="new-study-form"
          className={
            "bg-gray-faint border border-gray-lighter rounded-lg w-full max-w-md shadow-outer transition-all " +
            (props.showingForm ? "block" : "hidden")
          }
        >
          <section className="rounded-t-lg pt-4 px-4 ">
            <span className="mx-0.5 mb-2">
              <input
                onChange={handleChange}
                name="title"
                type="text"
                placeholder="Paste the title..."
                className="
                  
                  h-8
                  box-border
                  placeholder-gray-light
                  bg-gray-faint
                  text-black
                  rounded-sm
                  font-semibold
                  w-full
                  text-18
                  truncate
                  border-b-2  border-gray-faint focus:border-blue-light
                  focus:outline-none
                  transition-all
                "
              />
              <div
                className={`flex items-center text-yellow-600 mt-1 ${
                  errors.title ? "block" : "hidden"
                }`}
              >
                <ExclamationCircleIcon className="flex-shrink-0 self-start fill-current text-yellow-600 rounded-full h-4 w-4 mr-1" />
                <p className="text-sm font-semibold mr-7">{errors.title}</p>
              </div>
            </span>
            <section className="space-y-2">
              <Field
                name={"link"}
                placeholder={"Link"}
                type={"text"}
                handleChange={handleChange}
                error={errors.link}
              />
              <Field
                name={"adder"}
                placeholder={"Your Name or Twitter handle"}
                type={"text"}
                handleChange={handleChange}
                error={errors.adder}
              />
            </section>
          </section>
          <section className="p-4 mt-4 rounded-b-lg bg-gray-faint">
            <p className="text-13 ml-0.5 text-gray tracking-tight mb-2">
              Before your case study gets added, we'll screen it for bad stuff.
            </p>
            <div className="flex space-x-1.5">
              <Button
                handleClick={props.handleClick}
                id={"add-new-study"}
                type={"submit"}
                isPrimary={true}
                text={"Add"}
              />
              <Button
                handleClick={props.handleClick}
                id={"close-new-study-form"}
                type={"button"}
                isPrimary={false}
                text={"Nevermind"}
              />
            </div>
          </section>
        </form>
      )}
    </Formik>
  );
}
