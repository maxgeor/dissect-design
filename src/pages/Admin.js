import Logo from "../components/Logo";
import Study from "../components/Study";
import Button from "../components/Button";
import AddForm from "../components/AddForm";
import { SparklesIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { db, collection, addDoc, Timestamp } from "../utils/firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useStudies } from "../contexts/StudiesContext";

export default function Admin() {
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

  function getDomain(link) {
    var a = document.createElement("a");
    a.href = link;
    return a.hostname;
  }

  const addStudy = async (study) => {
    const payload = {
      ...newStudy,
      domain: getDomain(newStudy.link),
      added_at: new Timestamp(),
      approved: true,
    };
    try {
      await addDoc(collection(db, "studies"), payload);
      setNewStudy(payload);
      setShowingForm(false);
      setTimeout(() => {
        setNewStudy({});
      }, 3000);
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
          antialiased
          bg-white
          dark:bg-gray-darker
        `}
    >
      <div className={`md:mx-auto max-w-2xl`}>
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
              onClick={() => setIsLoggedIn(false)}
              className={`text-13 font-medium text-gray`}
            >
              Log Out
            </button>
          </section>
        </header>
        <section
          className={`mx-auto flex flex-col items-center max-w-2xl md:max-w-xl`}
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
              className={`w-full md:w-auto shadow-inset pt-6 pb-3 border border-gray-lighter border-opacity-90 bg-gray-ghost rounded-none md:rounded-lg`}
            >
              <p className="px-6 pb-4 md:-ml-px flex items-center text-sm font-bold text-green-500">
                <SparklesIcon className="fill-current h-4 w-4 mr-1" />
                <span className="font-bold">
                  People added new case studies today!
                </span>
              </p>
              <div className="">
                {studies
                  .filter((study) => !study.approved)
                  .map((study) => (
                    <Study
                      key={study.id}
                      title={study.title}
                      link={study.link}
                      domain={study.domain}
                      adder={study.adder}
                      added_at={study.added_at}
                      isApproved={false}
                      justAdded={study.link === newStudy.link}
                      inContainer={true}
                    />
                  ))}
              </div>
            </section>
            <section className={`md:px-2 my-3 flex-col items-start`}>
              {studies.map((study) => (
                <Study
                  key={study.id}
                  title={study.title}
                  link={study.link}
                  domain={study.domain}
                  adder={study.adder}
                  isApproved={true}
                  justAdded={study.link === newStudy.link}
                />
              ))}
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}
