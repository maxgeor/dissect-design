import { ExclamationCircleIcon } from "@heroicons/react/solid";
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
      validateOnBlur={true}
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
      {({ values, errors, handleChange, handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          id="new-study-form"
          className={
            "-mt-4.5 border bg-gray-ghost border-gray-lighter rounded-lg w-full max-w-md shadow-sm " +
            (props.showingForm ? "block" : "hidden")
          }
        >
          <section className="rounded-t-lg p-4 border-b border-gray-lighter border-opacity-80">
            <span className="">
              <input
                onChange={handleChange}
                name="title"
                type="text"
                placeholder="Paste the title..."
                className="
                bg-gray-ghost
                placeholder-gray-light
                text-black
                font-semibold
                w-full
                text-18
                truncate
                rounded-md
              "
              />
              <div
                className={`flex items-center text-yellow-600 my-1.5  ${
                  errors.title ? "block" : "hidden"
                }`}
              >
                <ExclamationCircleIcon className="flex-shrink-0 self-start fill-current text-yellow-600 rounded-full h-4 w-4 mr-1" />
                <p className="text-sm font-semibold mr-7">{errors.title}</p>
              </div>
            </span>
            <section className="mt-4 space-y-2">
              <Field
                name={"link"}
                placeholder={"Link"}
                handleChange={handleChange}
                error={errors.link}
              />
              <Field
                name={"adder"}
                placeholder={"Your Name or Twitter handle"}
                handleChange={handleChange}
                error={errors.adder}
              />
            </section>
          </section>
          <section className="p-4 rounded-b-lg bg-gray-faint">
            <p className="text-13 ml-0.5 text-gray tracking-tight mb-2.5 -mt-0.5">
              Before your case study gets added, we'll{" "}
              <span className="font-semibold">screen it for bad stuff</span>.
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
