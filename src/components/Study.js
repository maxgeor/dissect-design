import { FireIcon } from "@heroicons/react/solid";
import { useRef } from "react";

export default function Study(props) {
  const link = useRef(null);
  return (
    <article className="flex justify-between py-3 px-6 md:rounded-md md:px-4">
      <section
        onClick={() => link.current.click()}
        className="group h-full cursor-pointer"
      >
        <div className="flex items-baseline flex-wrap">
          <a
            ref={link}
            href={props.link}
            target="_blank"
            rel="noreferrer"
            className="
            mr-1.5
            font-medium
            text-gray-dark
            group-hover:text-black
            group-focus:text-black
            visited:text-gray-light
            group-hover:underline
            group-focus:underline
          "
          >
            {props.title}
          </a>
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
      </section>
      <section
        className={`text-13 -mr-2.5 md:mr-0 ml-12 
          ${props.isLoggedIn ? "block" : "hidden"}
          ${props.inSuccessMsg && "hidden"}`}
      >
        <button className="-mt-1 transition-all duration-100 h-10 w-10 flex justify-center  items-center border-0 focus:border border-red-300 p-2.5 text-red-500  hover:text-red-600 focus:text-red-600 outline-none focus:ring-1 focus:ring-red-300 hover:bg-red-100 focus:bg-red-100 rounded-full cursor-pointer">
          <FireIcon className="h-5 w-5 flex-shrink-0 mr-0.5 fill-current " />
        </button>
      </section>
    </article>
  );
}
