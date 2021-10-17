import { createContext, useContext, useEffect, useState } from "react";
import { db, onSnapshot, collection } from "../utils/firebase";

const StudiesContext = createContext({
  studies: [],
  newStudy: null,
});

export const useStudies = () => useContext(StudiesContext);

export default function StudiesContextProvider({ children }) {
  const [studies, setStudies] = useState([]);
  const [newStudy, setNewStudy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      onSnapshot(collection(db, "studies"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStudies(data);
        setIsLoading(false);
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, [setStudies]);

  const value = {
    studies,
    newStudy,
    setNewStudy,
    isLoading,
  };
  return <StudiesContext.Provider value={value}>{children}</StudiesContext.Provider>;
}
