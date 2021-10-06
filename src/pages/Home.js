import Logo from "../components/Logo";
import Study from "../components/Study";
import AddForm from "../components/AddForm";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { onSnapshot, collection, addDoc } from "@firebase/firestore";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Home(props) {
  const [showingForm, setShowingForm] = useState(false);
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
      <div className={`md:mx-auto max-w-xl`}>
        <header className={`flex flex-col mx-6 my-18`}>
          <Link to="/">
            <Logo />
          </Link>
          <h1 className="text-22 font-bold text-black tracking-wide leading-9 mt-4">
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
        <section>
          <section className={`mx-6 mb-6`}>
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
            {studies.map((study) => (
              <Study
                key={study.id}
                title={study.title}
                link={study.link}
                domain={study.domain}
                adder={study.adder}
                isApproved={true}
                loggedIn={props.loggedIn}
                justAdded={study.link === newStudy.link}
              />
            ))}
          </section>
        </section>
      </div>
    </main>
  );
}
