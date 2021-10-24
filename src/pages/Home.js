import Logo from "../components/Logo";
import AddForm from "../components/AddForm";
import StudyList from "../components/StudyList";
import Button from "../components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db, collection, addDoc, Timestamp } from "../utils/firebase";
import { useStudies } from "../contexts/StudiesContext";

export default function Home() {
  const [showingForm, setShowingForm] = useState(false);

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
      setTimeout(() => {
        setNewStudy({});
      }, 4000);
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
        antialiased
        bg-white
        dark:bg-gray-darker
      `}
    >
      <div className={`md:mx-auto max-w-2xl`}>
        <header className={`flex flex-col mx-6 my-18`}>
          <div className="w-full flex justify-between items-center">
            <Link to="/">
              <Logo />
            </Link>
            <button className="text-gray text-13 font-medium hover:underline hover:text-black py-4">Log In</button>  
          </div>
          <h1 className="text-22 font-bold text-black tracking-wide leading-9 mt-4">
            Dissect Design
          </h1>
          <p className="text-gray text-13 mb-3 italic">
            A collection of product design case studies
          </p>
          <p className="text-gray mr-14 md:mr-32 leading-6">
            I love case studies. Seeing the process of wrangling with a design
            problem is facinating. If you've got a good one, add it!
          </p>
        </header>
        <section>
          <section className={`mx-6 mb-6`}>
            <div className={`-ml-1 ${showingForm && "hidden"}`}>
              <Button
                handleClick={handleClick}
                id={"open-new-study-form"}
                type={"button"}
                isPrimary={false}
                text={"Sign in to add a case study"}
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
            />
          </section>
        </section>
      </div>
    </main>
  );
}
