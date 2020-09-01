import React, { useState, useEffect } from 'react';
import axios from "axios";
import dotenv from "dotenv";
import moment from "moment";
import { Row, Col, Card, ListGroup,ListGroupItem, Badge } from 'react-bootstrap';
import {
  CheckCircleOutline as TickIcon,
  Cancel as XIcon,
  RemoveCircleOutline as NullIcon
} from "@material-ui/icons";

// ------------------------------------ config ------------------------------------ //

dotenv.config();
let url = process.env.REACT_APP_URL;

// ------------------------------------ component ------------------------------------ //

export default function Dashboard(props) {

  const documents = useGetDocuments();

  return (
    <div>

      {/* Pipeline arrows */}
      <Row className="overlapping-arrows justify-content-center">
        <Col md={4} style={{ zIndex: 3 }}>
          <h5>IN-PROGRESS ({countDocuments("in-progress", documents)})</h5>
        </Col>
        <Col md={4} style={{ zIndex: 2 }}>
          <h5>REVIEW ({countDocuments("review", documents)})</h5>
        </Col>
        <Col md={4}>
          <h5>APPROVED ({countDocuments("approved", documents)})</h5>
        </Col>
      </Row>

      {/* Document list */}
      <Row className="document-card-container">

        {/* in progress */}
        <Col md={4}>
          {documents.map((d, i) => {

            // only list documents that are statused in-prog
            if (d.stage === "in-progress") {
              return (
                <Row key={i} className="mb-3">
                  <Card className="text-center document-card">
                    <Card.Body>
                      <Card.Title>{d.title}</Card.Title>
                        {d.requiredInputs.map((x) => (
                          isDone(x.user.name, x.isDone)
                        ))}
                    </Card.Body>

                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        {getDaysLeft(d)}
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                </Row>
              );
            }
          })}
        </Col>

        {/* review */}
        <Col md={4}>
          {documents.map((d, i) => {
            if (d.stage === "review") {
              return (
                <Row key={i} className="mb-3">
                  <Card className="text-center document-card">
                  <Card.Body>
                      <Card.Title>{d.title}</Card.Title>
                        {d.requiredApprovals.map((x) => (
                          isDone(x.user.name, x.isApproved)
                        ))}
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>{getDaysLeft(d)}</ListGroupItem>
                    </ListGroup>
                  </Card>
                </Row>
              );
            }
          })}
        </Col>

        {/* approved */}
        <Col md={4}>
          {documents.map((d, i) => {
            if (d.stage === "approved") {
              return (
                <Row key={i} className="mb-3">
                  <Card className="text-center document-card">
                    <Card.Body>
                      <Card.Title>{d.title}</Card.Title>
                      <Card.Text>{d.text}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>{getDaysLeft(d)}</ListGroupItem>
                    </ListGroup>
                  </Card>
                </Row>
              );
            }
          })}
        </Col>
      </Row>
    </div>
  );
};

// ------------------------------------ get documents  ------------------------------------ //

function useGetDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/api/documents`)
      .then((res) => {
        setDocuments(res.data.documents);
      })
      .catch((e) => console.log(e));
  }, [url]); 

  return documents;
}

// ------------------------------------ count documents in particular stage ------------------------------------ //

function countDocuments(stage, docs) {
  return docs.filter(d => d.stage === stage).length
}

// ------------------------------------ get days left badges ------------------------------------ //

function getDaysLeft(document) {
  let daysLeft = moment().diff(document.deadline, 'days') * (-1);
  let variant;
  daysLeft <= 3 ? variant = "danger"
    : daysLeft <= 7 ? variant = "warning"
    : variant = "muted";
  return (
    <Badge variant={variant} className="mr-2">{daysLeft} day(s) left</Badge>
  );
}

// ------------------------------------ isDone ------------------------------------ //

function isDone(name, status) {
  return (
    <div>
      <Card.Text>
        {name}: {status ? <TickIcon /> : <NullIcon color="action" />}
      </Card.Text>
    </div>
  );
}
