import React, { useState, useEffect } from 'react';
import axios from "axios";
import dotenv from "dotenv";

// ------------------------------------ config ------------------------------------ //

dotenv.config();
let url = process.env.REACT_APP_URL;

// ------------------------------------ component ------------------------------------ //

export default function Dashboard(props) {

  const [documents, setDocuments] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${url}/api/documents`)
      .then((res) => {
        setDocuments(res.data.documents);
        console.log(res.data.documents);
      })
      .catch((e) => console.log(e));
  }, [url]);

  return (
    <div>
      <h1>LIST OF DOCUMENTS</h1>
      {documents.map(d => (
        <li>{d.title}</li>
      ))}
    </div>
  )
};