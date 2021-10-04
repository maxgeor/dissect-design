import Logo from "../components/Logo";
import Study from "../components/Study";
import AddForm from "../components/AddForm";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { onSnapshot, collection, addDoc } from "@firebase/firestore";
import { BadgeCheckIcon, SparklesIcon } from "@heroicons/react/solid";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Home() {
  const [showingForm, setShowingForm] = useState(false);
  const [showingSuccessMsg, setShowingSuccessMsg] = useState(false);
  const [studies, setStudies] = useState([]);
  const [newStudy, setNewStudy] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    onSnapshot(collection(db, "studies"), (snapshot) => {
      const studiesData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStudies(studiesData.reverse());
    });
  }, [setStudies]);

  const handleClick = async (e) => {
    const el = e.target;
    if (el.id === "open-new-study-form") {
      if (showingSuccessMsg) setShowingSuccessMsg(false);
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
      setShowingSuccessMsg(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <main
      className="
          text-md
          pt-10
          pb-20
          h-full
          min-h-screen
          flex-col
          items-center
          justify-center
          tracking-regular
          antialiased
        "
    >
      <div className="mx-auto max-w-xl">
        <header className="flex flex-col mx-6 py-6">
          <section className="flex items-center justify-between">
            <Link to="/">
              <Logo />
            </Link>
            <button
              onClick={() => setIsLoggedIn(false)}
              className={`text-13 font-medium text-gray-light ${
                isLoggedIn ? "block" : "hidden"
              }`}
            >
              Log Out
            </button>
          </section>
          <h1 className="text-22 font-bold text-black tracking-wide leading-9 mt-4 ">
            Dissect Design
          </h1>
          <p className=" text-gray-light text-sm mb-3 italic">
            A collection of product design case studies
          </p>
          <p className="text-gray mr-12 md:mr-24 leading-6">
            I love case studies. Seeing the process of wrangling with a design
            problem is facinating. If you've got a good one, add it!
          </p>
        </header>
        <section className="pt-6 mt-4">
          <section className="mx-6 mb-1">
            <div className={`-ml-1 ${showingForm ? "hidden" : "block"}`}>
              <Button
                handleClick={handleClick}
                id={"open-new-study-form"}
                type={"button"}
                isPrimary={false}
                text={
                  showingSuccessMsg
                    ? "Add another case study"
                    : "Add a case study"
                }
              />
            </div>
            <AddForm
              showingForm={showingForm}
              handleClick={handleClick}
              addStudy={addStudy}
              studies={studies}
            />
          </section>
          <section>
            <section
              className={` mt-8 shadow-inset py-4 border border-gray-lighter border-opacity-80  bg-gray-ghost rounded-none md:rounded-lg ${
                isLoggedIn ? "block" : "hidden"
              }`}
            >
              <p className="px-6 mt-2 -ml-0.5 flex items-center text-sm font-bold text-green-500">
                <SparklesIcon className="fill-current h-4 w-4 mr-1" />
                <span className="font-bold">
                  People added new case studies today!
                </span>
              </p>
              <div className="pt-4 md:mx-2">
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
                      isLoggedIn={isLoggedIn}
                    />
                  ))}
              </div>
            </section>
            <section className="md:px-2 py-4">
              {studies.map((study) => (
                <Study
                  key={study.id}
                  title={study.title}
                  link={study.link}
                  domain={study.domain}
                  adder={study.adder}
                  isApproved={true}
                  isLoggedIn={isLoggedIn}
                />
              ))}
            </section>
          </section>
        </section>
      </div>
    </main>
  );
}
