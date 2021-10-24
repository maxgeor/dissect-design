import Study from "./Study";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { useStudies } from "../contexts/StudiesContext";
import { useEffect } from "react";

export default function SuccessCard(props) {
  const { newStudy, setNewStudy } = useStudies();
  let newStudyProps;

  useEffect(() => {
    if (newStudy !== null) {
      newStudyProps = {...newStudy};
    }
  }, [setNewStudy]);


  return (
    <article className={`rounded-lg border border-gray-lighter shadow-sm w-full max-w-md ${props.justAddedNewStudy ? 'block' : 'hidden'}`}>
      <section className="p-4">
        <div className="flex items-center space-x-1.5">
          <BadgeCheckIcon className="h-4 w-4 fill-current text-yellow-600" />
          <p className="font-bold text-13 text-yellow-600">In the screener</p>
        </div>
        {newStudyProps
          ? <Study props={newStudyProps} />
          : ''
        }
      </section>
      <section className="bg-gray-faint border-t border-gray-lighter rounded-b-lg p-4"></section>
    </article>
  );
}
