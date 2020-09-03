import React from 'react';
import { useParams } from "react-router-dom";

export default function ViewDoc(props) {

  let {id} = useParams();

  return (
    <div>
      <h1>View Document</h1>
      <div>ID: {id}</div>
    </div>
  );
};