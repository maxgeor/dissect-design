import AddForm from "../components/AddForm";
import Study from "../components/Study";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { onSnapshot, collection, addDoc } from "@firebase/firestore";
import { BadgeCheckIcon, SparklesIcon } from "@heroicons/react/solid";
import Button from "../components/Button";
import Login from "./Login";
import { AuthProvider } from "../context/AuthContext";

function App() {
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
    <AuthProvider>
      <main
        className="
          text-md
          mx-auto
          max-w-xl
          pt-12
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
        <div className="max-w-xl">
          <header className="flex flex-col mx-5 pb-5">
            <a
              href="index.html"
              className="p-3 -ml-3.5 -mt-3 -mb-3 w-min text-black hover:text-blue"
            >
              <svg
                className="h-9 w-9"
                width="440"
                height="440"
                viewBox="0 0 440 440"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="52"
                  y="105.1"
                  width="289.895"
                  height="56.2208"
                  rx="22"
                  transform="rotate(-11.7631 52 105.1)"
                  fill="#0948F2"
                />
                <rect
                  x="111.849"
                  y="393.98"
                  width="190"
                  height="92"
                  rx="22"
                  transform="rotate(-102.275 111.849 393.98)"
                  fill="#04C98C"
                />
                <rect
                  x="207.596"
                  y="162.383"
                  width="172.407"
                  height="172"
                  rx="22"
                  transform="rotate(-2.69376 207.596 162.383)"
                  fill="#F53F5E"
                />
              </svg>
            </a>

            <h1 className="text-22 font-bold text-black tracking-wide leading-9 mt-4 ">
              Dissect Design
            </h1>
            <p className=" text-gray-light text-sm mb-3 italic">
              A collection of product design case studies
            </p>
            <p className="text-gray mr-16 sm:mr-28 ">
              I love case studies. Seeing the process of wrangling with a design
              problem is facinating. If you've got a good one, add it!
            </p>
          </header>
          <section className="pt-5 mt-4">
            <section className="mx-5">
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
            <section className="">
              <section
                className={`mt-5 shadow-inset px-2 py-3 border border-gray-lighter border-opacity-80  bg-gray-ghost rounded-none sm:rounded-lg ${
                  isLoggedIn ? "block" : "hidden"
                }`}
              >
                <p className="px-3 mt-2 mb-1 -ml-0.5 flex items-center text-sm font-bold text-green-500">
                  <SparklesIcon className="fill-current h-4 w-4 mr-1" />
                  <span className="font-bold">
                    People added new case studies today!
                  </span>
                </p>
                <div className="pt-3 space-y-1">
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
              <section className=" mx-2 py-3 space-y-1">
                {studies
                  .filter((study) => study.approved)
                  .map((study) => (
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
          <footer className="mx-5 mt-2">
            <a
              href="index.html"
              className="text-13 font-medium text-gray-lightish"
            >
              {isLoggedIn ? "Log Out" : "Log In"}
            </a>
          </footer>
        </div>
      </main>
    </AuthProvider>
  );
}

export default App;
