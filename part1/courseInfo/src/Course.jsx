import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total total={total} />
    </div>
  );
};

export default Course;
