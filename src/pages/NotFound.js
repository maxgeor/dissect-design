import Logo from "../components/Logo";
import AddForm from "../components/AddForm";
import StudyList from "../components/StudyList";
import SuccessCard from "../components/SuccessCard";
import Button from "../components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db, collection, addDoc, Timestamp } from "../utils/firebase";
import { useStudies } from "../contexts/StudiesContext";

export default function NotFound() {
  const [showingForm, setShowingForm] = useState(false);
  const [justAddedNewStudy, setJustAddedNewStudy] = useState(false);
  const {studies, newStudy, setNewStudy, isLoading} = useStudies();

  const handleClick = (e) => {
    const el = e.target;
    if (el.id === "open-new-study-form") {
      setShowingForm(true);
    } else if (el.id === "close-new-study-form") {
      setShowingForm(false);
    }
  };

  function getDomain(link) {
    const a = document.createElement("a");
    a.href = link;
    return a.hostname;
  }

  const addStudy = async (study) => {
    const payload = {
      ...study,
      domain: getDomain(study.link),
      added_at: Timestamp.now(),
      approved: false,
    };
    try {
      await addDoc(collection(db, "studies"), payload);
      setNewStudy(payload);
      setShowingForm(false);
      setJustAddedNewStudy(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main
      className={`
        relative
        text-md
        pb-36
        h-full
        min-h-screen
        flex-col
        items-center
        justify-center
        tracking-regular
        bg-white
      `}
    >
      <div className={`md:mx-auto max-w-2xl`}>
        <header className={`flex flex-col mx-6 my-18`}>
          <Link to="/">
            <Logo />
          </Link>
          <h1 className="text-22 font-bold text-black tracking-wide py-1 mb-2 mt-4">
            Hmmm, we couldn't find that page...
          </h1>
          <p className="text-gray mr-12 md:mr-28 leading-6">
            Here's our case study collection anyways        
          </p>
        </header>
        <section>
          <section className={`mx-6 mb-6`}>
            <SuccessCard justAddedNewStudy={justAddedNewStudy} showingForm={showingForm} />
            <div className={`-ml-1 ${showingForm && "hidden"}`}>
              <Button
                handleClick={handleClick}
                id={"open-new-study-form"}
                type={"button"}
                isPrimary={false}
                text={"Add a case study"}
              />
            </div>
            <AddForm
              showingForm={showingForm}
              handleClick={handleClick}
              addStudy={addStudy}
              studies={studies}
            />
            
          </section>
          <section className={`md:px-2 my-4 flex-col items-start`}>
            <StudyList
              studies={studies}
              newStudy={newStudy}
              isLoading={isLoading}
              isApprovedList={true}
            />
          </section>
        </section>
      </div>
    </main>
  );
}
