import React from "react";
import { css } from "@emotion/core";
import {HashLoader} from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

export default function Spinner() {
  return (
    <div className="sweet-loading" style={{marginTop: '15%'}}>
      <HashLoader
        css={override}
        size={200}
        // color={"#ffc107"}
      />
    </div>
  );
};