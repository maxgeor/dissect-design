import Form from "./components/Form";
import Study from "./components/Study";
import { useState, useEffect, useRef } from "react";
import db from "./firebase";
import { onSnapshot, collection, addDoc } from "@firebase/firestore";
import { BadgeCheckIcon } from "@heroicons/react/solid";

function App() {
  const [showingForm, setShowingForm] = useState(false);
  const [showingSuccessMsg, setShowingSuccessMsg] = useState(false);
  const [studies, setStudies] = useState([]);
  const [newlyAddedStudy, setNewlyAddedStudy] = useState({});
  const formTitleInput = useRef(null);

  useEffect(() => {
    onSnapshot(collection(db, "studies"), (snapshot) => {
      const studiesData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        added_on: new Date(),
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
      formTitleInput.current.focus();
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
      setNewlyAddedStudy(payload);
      setShowingForm(false);
      setShowingSuccessMsg(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-gray-ghost">
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
          mx-6
          tracking-regular
          antialiased
        "
      >
        <header className="flex flex-col mb-16">
          <a
            href="index.html"
            className="p-3 pr-40 -ml-3 -mt-3 mb-2.5 w-min text-black hover:text-blue"
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
          <h1 className="text-18 font-bold text-black tracking-wide leading-6 mb-1.5">
            Product Design Case Studies
          </h1>
          <p className="text-gray mr-16 sm:mr-28 ">
            I love case studies. Seeing the process of wrangling with a design
            problem is facinating. Add your favourites!
          </p>
        </header>

        <section className="mb-16">
          <section
            id="successful-submit-text"
            className={`
              transition-all
              duration-200
              mb-4
              border border-gray-lighter
              rounded-lg
              w-full
              max-w-md
              shadow-sm
              ${showingSuccessMsg ? "block" : "hidden"}
            `}
          >
            <article className=" p-4 bg-white rounded-t-lg border-b border-gray-lighter border-opacity-80">
              <p className="flex items-center text-sm font-medium text-yellow-600 mt-0.5 mb-2.5">
                <BadgeCheckIcon className="fill-current h-4 w-4 mr-1" />
                <span className="font-semibold">In the screener</span>
              </p>
              <section className="flex items-baseline flex-wrap ">
                <a
                  href={`${newlyAddedStudy.link}`}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  mr-1.5
                  font-semibold
                  text-blue
                  visited:text-purple
                  hover:underline
                  focus:underline
                "
                >
                  {newlyAddedStudy.title}
                </a>
                <a
                  href={`${newlyAddedStudy.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  text-gray text-13
                  hover:underline
                  focus:underline
                  tracking-tight
                "
                >
                  {newlyAddedStudy.domain}
                </a>
              </section>
              <p className=" text-gray text-sm tracking-tighter">
                from
                <span className="tracking-tight text-13 ml-1">
                  {newlyAddedStudy.adder}
                </span>
              </p>
            </article>
            <p className="bg-gray-faint p-4 text-gray rounded-b-lg">
              Thanks for sharing! We'll add your case study after it's screened
              for bad stuff. Check back in a bit.
            </p>
          </section>
          <button
            onClick={handleClick}
            type="button"
            id="open-new-study-form"
            className={`
              border border-gray-lighter
              hover:bg-gray-lightest
              bg-white
              text-black
              font-medium
              px-4
              h-9
              h-min
              box-border
              -ml-1
              rounded-full
              hover:shadow-sm
              active:shadow-none
              ${showingForm ? "hidden" : "block"}
              `}
          >
            {showingSuccessMsg ? "Add another case study" : "Add a case study"}
          </button>
          <Form
            showingForm={showingForm}
            handleClick={handleClick}
            formTitleInput={formTitleInput}
            addStudy={addStudy}
            studies={studies}
          />

          <section className="mt-8 space-y-5">
            {studies
              .filter((study) => study.approved)
              .map((study) => (
                <Study
                  key={study.id}
                  title={study.title}
                  link={study.link}
                  domain={study.domain}
                  adder={study.adder}
                  approved={study.approved}
                />
              ))}
          </section>
        </section>
        <footer className="w-full flex  text-gray-lighter">
          <a href="#">Login</a>
        </footer>
      </main>
    </div>
  );
}

export default App;
