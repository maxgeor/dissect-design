import { FireIcon, ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";
import { db, doc, deleteDoc, updateDoc } from "../utils/firebase";
import { useAuth } from "../contexts/AuthContext";

export default function Study(props) {
  const { isLoggedIn } = useAuth();

  const deleteStudy = async () => {
    try {
      await deleteDoc(doc(db, 'studies', props.id))
    } catch (error) {
      console.log(error)
    }
  }

  const approveStudy = async () => {
    try {
      await updateDoc(doc(db, 'studies', props.id), {approved: true})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <article
      className={`transition-all duration-700 flex justify-between md:rounded
        ${!props.inContainer && !props.inSuccessCard ? 'md:px-4' : 'px-0'}
        ${props.inSuccessCard ? 'p-0' : 'py-3 px-6'}
      `}
    >
      <a
        href={props.link}
        target="_blank"
        rel="noreferrer"
        className={`w-full group h-full cursor-pointer text-black mr-6 md:mr-24 ${props.inSuccessCard ? 'visited:text-black' : 'visited:text-gray-light'}`}
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
            leading-5
            py-0.5
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
      <section className={`text-13 -mr-2.5 ${!isLoggedIn ? "hidden" : props.inSuccessCard ? "hidden" : "block"}`}>
        <button 
          onClick={deleteStudy} 
          className={`-mt-1.5 md:-mt-1 transition-all duration-100 h-10 w-10 flex justify-center items-center border-0 p-2.5 text-red-500 hover:text-red-600 focus:text-red-600 hover:bg-red-100 focus:bg-red-100 active:bg-red-200 rounded-full cursor-pointer
                   ${props.approved ? 'block' : 'hidden'}
          `}
        >
          <FireIcon className="h-5 w-5 flex-shrink-0 mr-0.5 fill-current" />
        </button> 
        <div className={`flex items-center ${props.approved ? 'hidden' : 'block'} `}>
          <button 
            onClick={approveStudy} 
            className={`-mt-1.5 md:-mt-1 transition-all duration-100 h-10 w-10 flex justify-center items-center border-0 p-2.5 text-gray-light hover:text-green-600 focus:text-green-600 hover:bg-green-100 focus:bg-green-100 active:bg-green-200 rounded-full cursor-pointer`}
          >
            <ThumbUpIcon className="h-5 w-5 flex-shrink-0 mr-0.5 fill-current " />
          </button>
          <button 
            onClick={deleteStudy} 
            className="-mt-1.5 md:-mt-1 transition-all duration-100 h-10 w-10 flex justify-center items-center border-0 p-2.5 text-gray-light hover:text-red-600 focus:text-red-600 hover:bg-red-100 focus:bg-red-100 active:bg-red-200 rounded-full cursor-pointer"
          >
            <ThumbDownIcon className="h-5 w-5 flex-shrink-0 mr-0.5 fill-current " />
          </button>
        </div>
      </section>
    </article>
  );
}
