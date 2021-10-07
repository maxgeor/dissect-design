import React from "react";
import Study from "./Study";

export default function StudyList({ studies, newStudy, loggedIn }) {
  return (
    <div>
      {studies.map((study) => (
        <Study
          key={study.id}
          title={study.title}
          link={study.link}
          domain={study.domain}
          adder={study.adder}
          loggedIn={loggedIn}
          justAdded={study.link === newStudy.link}
        />
      ))}
    </div>
  );
}
