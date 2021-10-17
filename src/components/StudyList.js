import React from "react";
import Study from "./Study";
import StudiesSkeleton from "./StudiesSkeleton";

export default function StudyList({
  studies,
  newStudy,
  isLoading,
}) {
  return (
    <div>
      {isLoading ? (
        <StudiesSkeleton />
      ) : (
        studies.map((study) => (
          <Study
            key={study.id}
            id={study.id}
            title={study.title}
            link={study.link}
            domain={study.domain}
            adder={study.adder}
            justAdded={newStudy ? study.link === newStudy.link : false}
          />
        ))
      )}
    </div>
  );
}
