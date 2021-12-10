import Study from "./Study";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { useStudies } from "../contexts/StudiesContext";

export default function SuccessCard(props) { 
  const {newStudy} = useStudies();
  const {title, domain, link, adder} = newStudy;
  return (
    <article className={`mb-4 rounded-lg border border-gray-lighter shadow-outer w-full max-w-md ${props.justAddedNewStudy ? 'block' : 'hidden'} ${props.showingForm ? 'hidden' : 'block'}`}>
      <section className="p-4 space-y-2">
        <div className="-ml-0.5 flex items-center space-x-1">
          <BadgeCheckIcon className="h-4 w-4 fill-current text-yellow-600" />
          <p className="font-bold text-sm text-yellow-600">In the screener</p>
        </div>
        <Study inSuccessCard={true} title={title} domain={domain} link={link} adder={adder} />
      </section>
      <section className="bg-gray-faint border-t border-gray-lighter rounded-b-lg p-4 text-gray">
        Thanks for sharing! We'll add your case study after it's screened for bad stuff. Check back in a bit.
      </section>
    </article>
  );
}
