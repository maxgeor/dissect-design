import React from "react";
import Study from "./Study";
import StudiesSkeleton from "./StudiesSkeleton";

export default function StudyList({
  studies,
  isLoading,
  inContainer,
  isApprovedList
}) {
  return (
    <div>
      {isLoading ? (
        <StudiesSkeleton />
      ) : (
        studies
          .filter(study => 
            isApprovedList ? study.approved === true : study.approved === false)
          .map((study) => (
          <Study
            key={study.id}
            id={study.id}
            title={study.title}
            link={study.link}
            domain={study.domain}
            adder={study.adder}
            inContainer={inContainer}
          />
        ))
      )}
    </div>
  );
}
