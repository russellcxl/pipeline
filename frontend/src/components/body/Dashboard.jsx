import React, { useState, useEffect } from 'react';
import axios from "axios";
import dotenv from "dotenv";
import { Row, Col, Card, ListGroup,ListGroupItem } from 'react-bootstrap';

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
  }, []); 

  function countDocuments(stage) {
    return documents.filter(d => d.stage === stage).length
  }

  return (
    <div>
      {/* Pipeline arrows */}
      <Row className="overlapping-arrows justify-content-center">
        <Col md={4} style={{ zIndex: 3 }}>
          <h5>IN-PROGRESS ({countDocuments("in-progress")})</h5>
        </Col>
        <Col md={4} style={{ zIndex: 2 }}>
          <h5>REVIEW ({countDocuments("review")})</h5>
        </Col>
        <Col md={4}>
          <h5>APPROVED ({countDocuments("approved")})</h5>
        </Col>
      </Row>

      {/* Document list */}
      <Row className="document-card-container">

        {/* in progress */}
        <Col md={4}>
          {documents.map((d, i) => {
            if (d.stage === "in-progress") {
              return (
                <Row key={i} className="mb-3">
                  <Card className="text-center document-card">
                    <Card.Body>
                      <Card.Title>{d.title}</Card.Title>
                      <Card.Text>{d.text.slice(0, 20)}...</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>Input: {d.requiredInputs}</ListGroupItem>
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
                      <Card.Text>{d.text}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>Reviewers</ListGroupItem>
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
                      <ListGroupItem>Input</ListGroupItem>
                      <ListGroupItem>Reviewers</ListGroupItem>
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

