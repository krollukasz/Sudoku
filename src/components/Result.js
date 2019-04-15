import React from "react";

const Result = props => {
  return(
    <p className={props.className}>{props.result}</p>
  );
};

export default Result;