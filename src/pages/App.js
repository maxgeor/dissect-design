import AddForm from "../components/AddForm";
import Study from "../components/Study";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { onSnapshot, collection, addDoc } from "@firebase/firestore";
import { BadgeCheckIcon, ClipboardListIcon } from "@heroicons/react/solid";
import Button from "../components/Button";
import Login from "./Login";
import { AuthProvider } from "../context/AuthContext";

function App() {
  const [showingForm, setShowingForm] = useState(false);
  const [showingSuccessMsg, setShowingSuccessMsg] = useState(false);
  const [studies, setStudies] = useState([]);
  const [newStudy, setNewStudy] = useState({});

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
          sm:mx-auto
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
        <header className="flex flex-col mx-5 pb-5">
          <a
            href="index.html"
            className="p-3 -ml-3 -mt-3 -mb-3 w-min text-black hover:text-blue"
          >
            <svg
              className="h-6 w-6 fill-current"
              width="450"
              height="450"
              viewBox="0 0 450 450"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="450" height="450" />
              <path
                d="M140.493 137.869C118.477 145.161 98.4675 156.028 75.9016 177.232C74.2888 178.747 74.2536 181.294 75.8239 182.854C106.383 213.2 129.941 219.414 179.055 213.071C179.249 213.046 179.45 213.005 179.639 212.951C214.069 203.164 234.205 194.462 266.805 179.266C269.577 177.974 269.915 174.17 267.395 172.438C236.325 151.083 212.056 142.032 190.941 136.603C174.35 132.337 156.755 132.483 140.493 137.869Z"
                fill="white"
              />
              <path d="M149.524 192.424C136.877 193.542 128.218 179.401 132.404 167.415C134.294 162.002 137.894 157.323 143.053 153.505C149.158 148.988 157.427 147.767 164.538 149.257C173.959 151.231 180.437 161.093 179.003 170.612C178.019 177.151 173.455 181.442 166.825 186.347C161.433 189.812 155.272 191.915 149.524 192.424Z" />
              <path
                d="M216.559 183C182.683 190.856 156.063 200.915 124 232.002C156.028 264.873 179.531 271.634 230.352 265.033C267.09 254.607 287.545 245.435 324 228.372C276.725 194.505 244.871 188.808 216.559 183Z"
                fill="white"
              />
              <path d="M200.524 244.424C187.877 245.542 179.218 231.401 183.404 219.415C185.294 214.002 188.894 209.323 194.053 205.505C200.158 200.988 208.427 199.767 215.538 201.257C224.959 203.231 231.437 213.093 230.003 222.612C229.019 229.151 224.455 233.442 217.825 238.347C212.433 241.812 206.272 243.915 200.524 244.424Z" />
              <path
                d="M268.559 234C234.683 241.856 208.063 251.915 176 283.002C208.028 315.873 231.531 322.634 282.352 316.033C319.09 305.607 339.545 296.435 376 279.372C328.725 245.505 296.871 239.808 268.559 234Z"
                fill="white"
              />
              <path d="M252.524 295.424C239.877 296.542 231.218 282.401 235.404 270.415C237.294 265.002 240.894 260.323 246.053 256.505C252.158 251.988 260.427 250.767 267.538 252.257C276.959 254.231 283.437 264.093 282.003 273.612C281.019 280.151 276.455 284.442 269.825 289.347C264.433 292.812 258.272 294.915 252.524 295.424Z" />
            </svg>
          </a>

          <h1 className="text-18 font-bold text-black tracking-wide leading-7 mt-5 mb-1">
            Product Design Case Studies
          </h1>
          <p className="text-gray mr-16 sm:mr-28 ">
            I love case studies. Seeing the process of wrangling with a design
            problem is facinating. Add your favourites!
          </p>
        </header>
        <section className="pt-5 mt-4">
          <section className="mx-5">
            <article
              id="successful-submit-text"
              className={`
              transition-all
              duration-200
              mb-4
              border border-gray-lighter
              rounded-lg
              w-full
              max-w-md
              shadow-outer
              ${showingSuccessMsg ? "block" : "hidden"}
            `}
            >
              <section className="p-4 bg-white rounded-t-lg border-b border-gray-lighter border-opacity-70">
                <p className="-ml-0.5 flex items-center text-sm font-medium text-yellow-600 mb-3">
                  <BadgeCheckIcon className="fill-current h-4 w-4 mr-1" />
                  <span className="font-semibold">In the screener</span>
                </p>
                <Study
                  title={newStudy.title}
                  link={newStudy.link}
                  domain={newStudy.domain}
                  adder={newStudy.adder}
                  inSuccessMsg={true}
                />
              </section>
              <p className="bg-gray-faint p-4 text-gray rounded-b-lg">
                Thanks for sharing! We'll add your case study after it's
                screened for bad stuff. Check back in a bit.
              </p>
            </article>

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

          <section className="pt-5 mt-2">
            <section className="shadow-inset p-5 border border-gray-lighter border-opacity-80  bg-gray-ghost rounded-none sm:rounded-lg">
              <p className="-ml-0.5 flex items-center text-sm font-bold text-gray-light">
                <ClipboardListIcon className="fill-current h-4 w-4 mr-1" />
                <span className="font-bold">You've got studies to screen</span>
              </p>
              <div className="mt-6 space-y-5">
                {studies
                  .filter((study) => !study.approved)
                  .map((study) => (
                    <Study
                      key={study.id}
                      title={study.title}
                      link={study.link}
                      domain={study.domain}
                      adder={study.adder}
                      isApproved={false}
                    />
                  ))}
              </div>
            </section>
            <section className="m-5 space-y-5">
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
                  />
                ))}
            </section>
          </section>
        </section>
        <footer className="mx-5 mt-7">
          <a
            href="index.html"
            className="text-13 font-medium text-gray-lightish"
          >
            Log In
          </a>
        </footer>
      </main>
    </AuthProvider>
  );
}

export default App;
