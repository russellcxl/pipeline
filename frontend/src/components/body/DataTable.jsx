import MaterialTable from "material-table";
import React, { useEffect, useState } from 'react';
import moment from "moment";
import axios from "axios";
import Spinner from "../Spinner";

export default function DataTable(props) {

  const [isLoading, setIsLoading] = useState(true);
  const [arr, setArr] = useState([]);

  let modifiedData = [...props.documents];


  useEffect(() => {

    if (modifiedData.length > 0) {

      let tempArr = [];

      modifiedData.forEach((d) => {
        let obj = {...d};

        obj.createdBy = d.createdBy.name || "null";
        obj.createdAt = moment(d.createdAt).format("DD MMM YYYY");
        if (d.deadline) obj.deadline = moment(d.deadline).format("DD MMM YYYY");
        if (d.text.length > 50) obj.text = d.text.slice(0, 50) + " ...";

        tempArr.push(obj)
      });
      setArr(tempArr)
      setIsLoading(false);
    }

  }, [props.documents])

  return (
    <div style={{ maxWidth: "100%" }}>
      {isLoading 
      ?
      <Spinner /> 
      : 
      <MaterialTable
        columns={[
          { title: "Title", field: "title" },
          { title: "Created on", field: "createdAt" },
          { title: "Due date", field: "deadline" },
          { title: "Author", field: "createdBy" },
          { title: "Stage", field: "stage" },
          { title: "Input by", field: "requiredInputs" },
          { title: "Review by", field: "requiredApprovals" },
        ]}
        data={arr}
        title="Document Library"
      />
      }
    </div>
  );
}