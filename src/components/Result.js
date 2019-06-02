import React from "react";

const Result = props => {
  return(
    <p className={props.className}>{props.gameInfo}</p>
  );
};

export default Result;