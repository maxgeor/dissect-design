export default function Form(props) {
  return (
    <form
      id="new-study-form"
      className={`
        -mt-4
        bg-gray-faint
        -mx-1.5
        p-4
        border border-gray-lighter border-opacity-90
        rounded-lg
        w-full
        max-w-sm
        ${props.showingForm ? "block" : "hidden"}
      `}
    >
      <input
        type="text"
        placeholder="Paste the title..."
        className="
          mb-6
          outline-none
          text-black
          font-semibold
          w-full
          text-18
          bg-gray-faint
          truncate
        "
      />

      <input
        placeholder="Link"
        type="text"
        className="
          px-2.5
          placeholder-gray
          border border-gray-lightish
          focus:outline-none
          focus:ring-1
          focus:ring-blue-light
          focus:border-blue-light
          rounded-md
          w-full
          text-base
          sm:text-md
          mb-2
          box-border
          h-10
          sm:h-9
          font-medium
        "
      />
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
          border border-gray-lightish
          rounded-md
          w-full
          text-base
          sm:text-md
          box-border
          h-10
          sm:h-9
          font-medium
        "
      />
      <section className="mt-7">
        <p className="text-13 mb-2.5 mt-0.5 ml-0.5 text-gray tracking-tight">
          Before your case study is added, it'll get screened for bad stuff. It
          shouldn't take long.
        </p>
        <div className="flex">
          <button
            onClick={props.handleClick}
            type="button"
            id="add-new-study"
            className="group py-3 pl-3 -ml-3 -my-1.5"
          >
            <span
              className="
                pointer-events-none
                border border-blue
                hover:to-blue-dark
                bg-blue
                group-hover:bg-blue-dark group-hover:text-white-blue
                text-white
                font-medium
                px-3.5
                py-1.5
                rounded-full
                mr-1.5
              "
            >
              Add
            </span>
          </button>
          <button
            onClick={props.handleClick}
            type="button"
            id="close-new-study-form"
            className="group py-3 pr-6 -my-1.5"
          >
            <span
              className="
                pointer-events-none
                border border-gray-lightish
                bg-white
                group-hover:bg-gray-lightest
                text-black
                font-medium
                px-3.5
                py-1.5
                rounded-full
              "
            >
              Nevermind
            </span>
          </button>
        </div>
      </section>
    </form>
  );
}
