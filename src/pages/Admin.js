import Logo from "../components/Logo";
import Study from "../components/Study";
import AddForm from "../components/AddForm";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { onSnapshot, collection, addDoc } from "@firebase/firestore";
import { SparklesIcon } from "@heroicons/react/solid";
import Button from "../components/Button";
import { Link, Redirect } from "react-router-dom";

export default function Admin({
  loggedIn,
  setLoggedIn,
  studies,
  newStudy,
  setNewStudy,
}) {
  const [showingForm, setShowingForm] = useState(false);

  useEffect(() => {
    !loggedIn && <Redirect to="/" />;
  }, [loggedIn, setLoggedIn]);

  const handleClick = async (e) => {
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

  const addStudy = async (newStudy) => {
    const payload = {
      ...newStudy,
      domain: getDomain(newStudy.link),
      added_at: new Date(),
      approved: false,
    };
    try {
      await addDoc(collection(db, "studies"), payload);
      setNewStudy(payload);
      setShowingForm(false);
      setTimeout(() => {
        setNewStudy({});
      }, 4500);
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
        <header className={`flex flex-col mx-6 my-6 md:my-10`}>
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
              onClick={() => setLoggedIn(false)}
              className={`text-13 font-medium text-gray`}
            >
              Log Out
            </button>
          </section>
        </header>
        <section
          className={`mx-auto flex flex-col items-center max-w-2xl md:max-w-xl`}
        >
          <section className={`mx-6 mb-6`}>
            <AddForm
              showingForm={showingForm}
              handleClick={handleClick}
              addStudy={addStudy}
              studies={studies}
            />
          </section>
          <section className={`-mt-2`}>
            <section
              className={`mt-2 shadow-inset py-6 border border-gray-lighter border-opacity-90 bg-gray-ghost rounded-none md:rounded-lg`}
            >
              <p className="px-6 -ml-px md:ml-0 flex items-center text-sm font-bold text-green-500">
                <SparklesIcon className="fill-current h-4 w-4 mr-1" />
                <span className="font-bold">
                  People added new case studies today!
                </span>
              </p>
              <div className="pt-4">
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
                      loggedIn={loggedIn}
                      justAdded={study.link === newStudy.link}
                      inContainer={true}
                    />
                  ))}
              </div>
            </section>
            <section className={`md:px-2 my-4 flex-col items-start`}>
              {studies.map((study) => (
                <Study
                  key={study.id}
                  title={study.title}
                  link={study.link}
                  domain={study.domain}
                  adder={study.adder}
                  isApproved={true}
                  loggedIn={loggedIn}
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
