import { XIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function Form(props) {
  const [showingStudyPreview, setShowingStudyPreview] = useState(false);

  return (
    <form
      id="new-study-form"
      className={
        "-mt-4.5 border border-gray-lighter rounded-lg w-full max-w-md shadow-sm " +
        (props.showingForm ? "block" : "hidden")
      }
    >
      <section className="p-4">
        <input
          ref={props.formTitleInput}
          type="text"
          placeholder="Paste the title..."
          className="
          placeholder-gray-light
          my-0.5
          outline-none
          text-black
          font-semibold
          w-full
          text-18
          truncate
        "
        />

        <input
          placeholder="Link"
          type="text"
          className="
          px-2.5
          placeholder-gray
          border border-gray-lighter
          focus:outline-none
          focus:ring-2
          focus:ring-blue-light
          focus:border-blue-light
          rounded-md
          w-full
          text-base
          sm:text-md
          mt-4
          box-border
          h-9
          font-medium
          shadow-inset
        "
        />
        {/* <div className="flex items-center text-yellow-600 my-1.5 ml-1">
          <ExclamationCircleIcon className="flex-shrink-0 self-start fill-current text-yellow-600 rounded-full h-4 w-4 mr-1" />
          <p className="text-sm font-semibold mr-7">
            That doesn't look like a link. Try copy & pasting it again.
          </p>
        </div> */}
        {/* <div className="flex items-center text-yellow-600 my-1.5 ml-1">
          <ExclamationCircleIcon className="flex-shrink-0 self-start fill-current text-yellow-600 rounded-full h-4 w-4 mr-1" />
          <p className="text-sm font-semibold mr-7">
            We already have that one. Got another?
          </p>
        </div> */}

        <input
          type="text"
          placeholder="Your Name or Twitter handle"
          className="
          placeholder-gray
          focus:outline-none
          focus:ring-1
          focus:ring-blue-light
          focus:border-blue-light
          px-2.5
          border border-gray-lighter
          rounded-md
          w-full
          text-base
          sm:text-md
          box-border
          h-9
          font-medium
          shadow-inset
          mt-2
          
        "
        />
      </section>
      <article
        className={
          "hidden relative p-4 bg-white border-t border-gray-lighter border-opacity-70 "
        }
      >
        <button className="group transform translate-x-px absolute top-3 right-3 rounded-full hover:bg-gray-lightest active:bg-gray-lighter text-gray-light">
          <XIcon
            onClick={() => setShowingStudyPreview(false)}
            className="fill-current  group-hover:text-gray  h-6 w-6 p-1"
          />
        </button>
        <div className="flex items-center text-yellow-600 mb-2">
          <ExclamationCircleIcon className="self-start fill-current text-yellow-600 rounded-full h-4 w-4 mr-1" />
          <p className="text-sm font-semibold mr-7">
            We've already got that one
          </p>
        </div>
        <section className="flex items-baseline flex-wrap ">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="
                  mr-1.5
                  font-semibold
                  text-blue
                  visited:text-purple
                  hover:underline
                  focus:underline
                "
          >
            My new case study
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="
                  text-gray text-13
                  hover:underline
                  focus:underline
                  tracking-tight
                "
          >
            maxgee.com
          </a>
        </section>
        <p className="text-gray text-sm tracking-tighter">
          from
          <span className="tracking-tight text-13 ml-1">Phil Neugen</span>
        </p>
      </article>
      <section className="p-4 rounded-b-lg bg-gray-faint border-t border-gray-lighter border-opacity-70">
        <p className="text-13 ml-0.5 text-gray tracking-tight mb-2.5 -mt-0.5">
          Before your case study gets added, we'll{" "}
          <span className="font-semibold">screen it for bad stuff</span>.
        </p>
        <div className="flex">
          <button
            onClick={props.handleNew}
            type="button"
            id="add-new-study"
            className="
               
                border border-blue hover:border-blue-dark
                hover:to-blue-dark
                bg-blue
               hover:bg-blue-dark hover:text-white-blue
                text-white
                font-medium
                px-4
                h-10
                sm:h-9
                h-min
                box-border
                rounded-full
                mr-1.5
                shadow-sm
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
                h-10
                sm:h-9
                h-min
                box-border
                rounded-full
                shadow-sm
              "
          >
            Nevermind
          </button>
        </div>
      </section>
    </form>
  );
}
