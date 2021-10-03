import { FireIcon } from "@heroicons/react/solid";

export default function Study(props) {
  console.log(props.added_at);
  return (
    <article className="flex justify-between rounded px-3 py-2">
      <section className="h-full">
        <div className="flex items-baseline flex-wrap">
          <a
            href={props.link}
            target="_blank"
            rel="noreferrer"
            className="
            mr-1.5
            font-medium
            text-black
            hover:underline
            focus:underline
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
        className={`text-13 -mr-2.5 sm:mr-0 ml-10 
          ${props.isLoggedIn ? "block" : "hidden"}
          ${props.inSuccessMsg && "hidden"}`}
      >
        <button className="-mt-1 transition-colors duration-100 h-10 w-10 flex justify-center  items-center p-2.5 text-red-500  hover:text-red-600 focus:text-red-600 hover:bg-red-100 focus:bg-red-100 active:bg-red-200 rounded-full cursor-pointer">
          <FireIcon className="h-5 w-5 flex-shrink-0 mr-0.5 fill-current " />
        </button>
      </section>
    </article>
  );
}
