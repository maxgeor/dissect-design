import {
  FireIcon,
  BadgeCheckIcon,
  ThumbUpIcon,
  ThumbDownIcon,
} from "@heroicons/react/solid";

export default function AdminButtons(props) {
  return (
    <section
      className={`text-13 flex flex-shrink-0 -mr-2.5 sm:mr-0 ml-10 ${
        props.inSuccessMsg && "hidden"
      }`}
    >
      <button
        className={`transition-colors h-10 w-10 flex justify-center items-center p-2.5 focus:bg-green-100 hover:bg-green-100 text-gray-light focus:text-green-600 hover:text-green-600  active:bg-green-200 rounded-full cursor-pointer ${
          props.isApproved ? "hidden" : "block"
        }`}
      >
        <ThumbUpIcon className="h-5 w-5 flex-shrink-0  fill-current" />
      </button>
      <button className="group transition-colors h-10 w-10 flex justify-center  items-center p-2.5  hover:text-red-600 focus:text-red-600 hover:bg-red-100 focus:bg-red-100 active:bg-red-200 rounded-full cursor-pointer">
        {props.isApproved ? (
          <FireIcon className="text-red-500 hover:text-red-600 focus:text-red-600 h-5 w-5 flex-shrink-0 mr-0.5 fill-current " />
        ) : (
          <ThumbDownIcon className="text-gray-light group-hover:text-red-600 group-focus:text-red-600 h-5 w-5 flex-shrink-0 mr-0.5 fill-current " />
        )}
      </button>
    </section>
  );
}
