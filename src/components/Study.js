import { FireIcon } from "@heroicons/react/solid";

export default function Study(props) {
  return (
    // <article className="flex justify-between py-3 px-6 md:rounded-md md:px-4">
    <article
      className={`transition-colors duration-1000 flex justify-between py-3 px-6 
        ${!props.inContainer && "md:px-4 md:rounded"}
        ${props.justAdded && "bg-green-100"}`}
    >
      <a
        href={props.link}
        target="_blank"
        rel="noreferrer"
        className="group h-full cursor-pointer text-gray-dark visited:text-gray-light"
      >
        <div className="flex items-baseline flex-wrap">
          <p
            className="
            mr-1.5
            font-medium
            group-hover:text-black
            group-focus:text-black
            group-hover:underline
            group-focus:underline
          "
          >
            {props.title}
          </p>
          <span
            className="
            text-gray text-13
            tracking-tight
            font-normal
            hover:no-underline
          "
          >
            {props.domain}
          </span>
        </div>
        <p className="text-gray text-sm tracking-tighter truncate flex-shrink min-w-0 flex-1">
          from
          <span className="tracking-tight text-13 ml-1 truncate min-w-0 flex-shrink overflow-hidden">
            {props.adder}
          </span>
        </p>
      </a>
      <section
        className={`text-13 -mr-2.5 ml-10 md:ml-24
          ${props.isLoggedIn ? "block" : "hidden"}`}
      >
        <button className="-mt-1 transition-all duration-100 h-10 w-10 flex justify-center  items-center border-0 p-2.5 text-red-500 hover:text-red-600 focus:text-red-600 hover:bg-red-100 focus:bg-red-100 active:bg-red-200 rounded-full cursor-pointer">
          <FireIcon className="h-5 w-5 flex-shrink-0 mr-0.5 fill-current " />
        </button>
      </section>
    </article>
  );
}
