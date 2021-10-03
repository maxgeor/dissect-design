import { FireIcon, ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";

export default function AdminButtons(props) {
  return (
    <section
      className={`text-13 -mr-2.5 sm:mr-0 ml-10 
               ${props.isLoggedIn ? "block" : "hidden"}
               ${props.inSuccessMsg && "hidden"}`}
    >
      <button className=" transition-colors h-10 w-10 flex justify-center  items-center p-2.5 text-red-500  hover:text-red-600 focus:text-red-600 hover:bg-red-100 focus:bg-red-100 active:bg-red-200 rounded-full cursor-pointer">
        <FireIcon className="h-5 w-5 flex-shrink-0 mr-0.5 fill-current " />
      </button>
    </section>
  );
}
