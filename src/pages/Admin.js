import Logo from "../components/Logo";
import StudyList from "../components/StudyList";
import Button from "../components/Button";
import AddForm from "../components/AddForm";
import { ClipboardListIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { db, collection, addDoc, Timestamp } from "../utils/firebase";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useStudies } from "../contexts/StudiesContext";

export default function Admin() {
  const history = useHistory();
  const { setIsLoggedIn } = useAuth();
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

  const logout = () => {
    setIsLoggedIn(false);
    history.push('/')
  }

  function getDomain(link) {
    var a = document.createElement("a");
    a.href = link;
    return a.hostname;
  }

  const addStudy = async (study) => {
    const payload = {
      ...study,
      domain: getDomain(newStudy.link),
      added_at: Timestamp.now(),
      approved: true,
    };
    try {
      await addDoc(collection(db, "studies"), payload);
      setNewStudy(payload);
      setShowingForm(false);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <main
      className={`
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
      <div className={`md:mx-auto max-w-3xl`}>
        <header className={`flex flex-col mx-6 my-6 md:my-9`}>
          <section className={`relative flex items-center justify-between h-9`}>
            <Link to="/">
              <Logo isSmall={true} />
            </Link>
            <div
              className={`-ml-1 absolute left-1/2 transform -translate-x-1/2 ${
                showingForm && "hidden"
              }`}
            >
              <Button
                handleClick={handleClick}
                id={"open-new-study-form"}
                type={"button"}
                isPrimary={false}
                text={"Add a case study"}
              />
            </div>
            <button
              onClick={() => logout()}
              className={`text-13 font-medium text-gray`}
            >
              Log Out
            </button>
          </section>
        </header>
        <section
          className={`mx-auto flex flex-col items-center max-w-2xl`}
        >
          <section className={`mx-6 mb-6 ${!showingForm && "hidden"}`}>
            <AddForm
              showingForm={showingForm}
              handleClick={handleClick}
              addStudy={addStudy}
              studies={studies}
            />
          </section>
          <section>
            <section
              className={`w-full md:w-auto shadow-inset pt-6 pb-3 border border-gray-lighter border-opacity-90 bg-gray-ghost rounded-none md:rounded-lg 
                ${studies.filter(study => study.approved === false).length === 0
                  ? 'hidden'
                  : 'block'
                }
              `}
            >
              <p className="px-6 pb-4 md:-ml-px flex items-center text-sm font-bold text-green-500">
                <ClipboardListIcon className="fill-current h-4 w-4 mr-1 transform rotate-20" />
                <span className="font-bold">
                  You've got some links to screen!
                </span>
              </p>        
              <StudyList
                studies={studies}
                newStudy={newStudy}
                isLoading={isLoading}
                inContainer={true}
                isApprovedList={false}
              />
            </section>
            <section className={`md:px-2 my-3 flex-col items-start`}>
              <StudyList
                studies={studies}
                newStudy={newStudy}
                isLoading={isLoading}
                isApprovedList={true}
              />
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}
