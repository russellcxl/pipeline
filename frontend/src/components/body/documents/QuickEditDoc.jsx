import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, Redirect } from "react-router-dom";
import Spinner from '../../Spinner';
import moment from "moment";

// ------------------------------------ config ------------------------------------ //


const url = process.env.REACT_APP_URL;


// ------------------------------------ component ------------------------------------ //


export default function QuickEditDoc(props) {

  // get document id, document info, current user info
  let {id} = useParams();
  let document = {...props.documents.filter(doc => doc._id === id)[0]};
  let user = props.user;

  // isAllowed checks if current user is allowed to make changes to the document
  const [isAllowed, setAllowed] = useState(true);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      text: document.text,
      history: document.history
    },
  });

  const onSubmit = (data) => {
    Axios.post(`${url}/api/documents/update/${id}/user/${user._id}`, data)
      .then((res) => console.log(res.data.message))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (document.accessibleBy.includes(user._id)) {
      setAllowed(true);
    }
  }, [props.document, props.user])
  
  
  return (
    <React.Fragment>
      {!isAllowed ? (<Redirect to="/" />)
      : (
        <div>
          <h1 className="text-center mb-5">
            Document: {document.title.toUpperCase()}
          </h1>

          <Row>
            {/* edit history */}
            <Col md={3}>Edit history here</Col>

            {/* content */}
            <Col md={8}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    name="text"
                    as="textarea"
                    rows="10"
                    ref={register}
                  />
                </Form.Group>

                <Form.Group>
                  <p class="btn-switch">
                    <input
                      type="radio"
                      id="yes"
                      name="isDone"
                      value="1"
                      class="btn-switch__radio btn-switch__radio_yes"
                      ref={register}
                    />
                    <input
                      type="radio"
                      id="no"
                      name="isDone"
                      checked
                      value="0"
                      class="btn-switch__radio btn-switch__radio_no"
                      ref={register}
                    />
                    <label
                      for="yes"
                      class="btn-switch__label btn-switch__label_yes"
                    >
                      <span class="btn-switch__txt">All good</span>
                    </label>{" "}
                    <label
                      for="no"
                      class="btn-switch__label btn-switch__label_no"
                    >
                      <span class="btn-switch__txt">Working on it</span>
                    </label>
                  </p>
                </Form.Group>

                <Button type="submit" className="text-right" variant="dark">
                  Update document
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      )}
    </React.Fragment>
  );
};