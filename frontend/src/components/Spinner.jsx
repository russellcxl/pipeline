import React from "react";
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

export default function Spinner() {
  return (
    <div className="sweet-loading">
      <ScaleLoader
        css={override}
        size={200}
        color={"#123abc"}
      />
    </div>
  );
};