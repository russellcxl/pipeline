import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, Redirect, withRouter } from "react-router-dom";
import Spinner from '../../Spinner';
import moment from "moment";

// ------------------------------------ config ------------------------------------ //


const url = process.env.REACT_APP_URL;


// ------------------------------------ component ------------------------------------ //


function InputDoc(props) {

  // get document id, document info, current user info
  let {id} = useParams();
  let document = {...props.documents.filter(doc => doc._id === id)[0]};
  let user = props.user;

  // isAllowed checks if current user is allowed to make changes to the document
  const [isAllowed, setAllowed] = useState(false);
  const [history, setHistory] = useState([]);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      text: document.text
    },
  });

  const onSubmit = (data) => {

    if (document.text !== data.text) {  
      let newEdit = {
        user: user._id,
        before: document.text,
        after: data.text
      };
      history.push(newEdit);
    }

    Axios.post(`${url}/api/documents/input/${id}/user/${user._id}`, {...data, history})
      .then((res) => {
        console.log(res.data.message);
        props.history.push("/");
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (document.requiredInputs.map(x => x.user._id).includes(user._id)) {
      setAllowed(true);
      setHistory(document.history);
    }
  }, [props.document, props.user])
  
  
  return (
    <React.Fragment>
      {!isAllowed ? (<Spinner />)
      : (
        <div>
          <h1 className="text-center mb-5">
            DOCUMENT: {document.title}
          </h1>

          <Row>
            {/* edit history */}
            <Col md={4} style={{paddingRight: '150px'}}>
              {timeline(history)}
            </Col>

            {/* content */}
            <Col md={7}>
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

// ------------------------------------  ------------------------------------ //

function timeline(history) {

  return (
    <div class="timeline">
      {history.map((edit, i) => {
        return (
          <div class="container right" key={i}>
            <div class="content ml-2">
              <p style={{marginBottom: '0'}}>{edit.user.name}</p>
              <p><em>{moment(edit.editedOn).format("MMM Do YYYY, h:mm a")}</em></p>
            </div>
          </div>
        );
      })}
      
    </div>
  );
}


export default withRouter(InputDoc);