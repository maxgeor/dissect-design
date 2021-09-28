import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { Formik } from "formik";

export default function Form(props) {
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
          errors.link = "We already have that one. Got another?";
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
            "-mt-4.5 border border-gray-lighter rounded-lg w-full max-w-md shadow-sm " +
            (props.showingForm ? "block" : "hidden")
          }
        >
          <section className="bg-white rounded-t-lg p-4 border-b border-gray-lighter border-opacity-80">
            <input
              onChange={handleChange}
              name="title"
              ref={props.formTitleInput}
              type="text"
              placeholder="Paste the title..."
              className="
                placeholder-gray-light
                text-black
                font-semibold
                w-full
                text-18
                truncate
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

            <input
              onChange={handleChange}
              name="link"
              placeholder="Link"
              type="text"
              className={`
                px-2.5
                placeholder-gray
                border
                rounded-md
                w-full
                text-base
                sm:text-md
                mt-4
                box-border
                h-9
                shadow-inset 
                truncate
                pr-8
                bg-gray-ghost
                ${
                  errors.link
                    ? "border-yellow-500"
                    : "border-gray-lighter border-opacity-80"
                }
              `}
            />
            <div
              className={`flex items-center text-yellow-600 my-1.5 ml-1 ${
                errors.link ? "block" : "hidden"
              }`}
            >
              <ExclamationCircleIcon className="flex-shrink-0 self-start fill-current text-yellow-600 rounded-full h-4 w-4 mr-1" />
              <p className="text-sm font-semibold mr-7">{errors.link}</p>
            </div>
            <input
              onChange={handleChange}
              name="adder"
              type="text"
              placeholder="Your Name or Twitter handle"
              className={`
                placeholder-gray
                px-2.5
                border 
                rounded-md
                w-full
                text-base
                sm:text-md
                box-border
                h-9
                shadow-inset
                mt-2
                truncate
                pr-8
                bg-gray-ghost
                hover:bg-gray-lightest
                focus:bg-white
                ${
                  errors.adder
                    ? "border-yellow-500"
                    : "border-gray-lighter border-opacity-80"
                }
              `}
            />
            <div
              className={`flex items-center text-yellow-600 my-1.5 ml-1 ${
                errors.adder ? "block" : "hidden"
              }`}
            >
              <ExclamationCircleIcon className="flex-shrink-0 self-start fill-current text-yellow-600 rounded-full h-4 w-4 mr-1" />
              <p className="text-sm font-semibold mr-7">{errors.adder}</p>
            </div>
          </section>
          <section className="p-4 rounded-b-lg bg-gray-faint">
            <p className="text-13 ml-0.5 text-gray tracking-tight mb-2.5 -mt-0.5">
              Before your case study gets added, we'll{" "}
              <span className="font-semibold">screen it for bad stuff</span>.
            </p>
            <div className="flex">
              <button
                type="submit"
                id="add-new-study"
                className="
                  border border-blue hover:border-blue-dark
                  bg-blue
                hover:bg-blue-dark active:text-white-blue
                active:bg-blue-darker
                  text-white
                  font-medium
                  px-4
                  h-9
                  h-min
                  box-border
                  rounded-full
                  mr-1.5
                  hover:shadow-sm
                  active:shadow-none
                "
              >
                Add
              </button>
              <button
                onClick={props.handleClick}
                type="button"
                id="close-new-study-form"
                className="
                border border-gray-lighter
                bg-white
                hover:bg-gray-lightest
                text-black
                font-medium
                px-4
                h-9
                h-min
                box-border
                rounded-full
                hover:shadow-sm
                active:shadow-none
                
              "
              >
                Nevermind
              </button>
            </div>
          </section>
        </form>
      )}
    </Formik>
  );
}
