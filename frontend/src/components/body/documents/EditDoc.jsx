import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Spinner from '../../Spinner';
import moment from "moment";


// ------------------------------------ config  ------------------------------------ //

let url = process.env.REACT_APP_URL;


// ------------------------------------ component  ------------------------------------ //


// users props for all users, user for me
export default function EditDoc(props) {
  
  let { id } = useParams();
  
  // parse incoming data for populating the form
  let preloadedData = {...props.documents.filter(doc => doc._id === id)[0]};
  preloadedData.deadline = moment(preloadedData.deadline).format("YYYY-MM-DD");
  preloadedData.requiredInputs = preloadedData.requiredInputs.map(x => x.user._id);
  preloadedData.requiredApprovals = preloadedData.requiredApprovals.map(x => x.user._id);

  const [isLoading, setLoading] = useState(true);
  const { register, handleSubmit } = useForm({
    defaultValues: preloadedData
  });

  const onSubmit = (data) => {
    data.requiredInputs = data.requiredInputs.map(x => ({user: x}));
    data.requiredApprovals = data.requiredApprovals.map(x => ({user: x}));
    console.log(data)
    Axios.post(`${url}/api/documents/edit/${id}`, data)
      .then(res => {
        console.log(res.data.message);
      })
      .catch(err => alert(err.data.message));
  }

  useEffect(() => {
    if (props.documents.length > 0) {
      setLoading(false);
    }
    
  }, [props.documents, props.users])

  return (
    <div>
      {isLoading ? <Spinner />
      :
      <React.Fragment>
        <h1 className="text-center">Edit Document</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* TITLE, CONTENT, DEADLINE */}

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Document Title</Form.Label>
            <Form.Control name="title" ref={register} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Document Content</Form.Label>
            <Form.Control name="text" as="textarea" rows="3" ref={register} />
          </Form.Group>

          <Form.Group>
              <Form.Label>Stage:</Form.Label>
              <Form.Control
                name="stage"
                as="select"
                ref={register}
              >
                <option value="in-progress">In-progress</option>
                <option value="review">Review</option>
                <option value="approved">Approved</option>
              </Form.Control>
            </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Deadline</Form.Label>
            <Form.Control name="deadline" type="date" ref={register} />
          </Form.Group>

          {/* MULTI-SELECORS */}

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Access rights:</Form.Label>
              <Form.Control
                name="accessibleBy"
                as="select"
                multiple
                ref={register}
              >
                {props.users.map((user, i) => (
                  <option key={i} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Require input from:</Form.Label>
              <Form.Control
                name="requiredInputs"
                as="select"
                multiple
                ref={register}
              >
                {props.users.map((user, i) => (
                  <option key={i} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Require approval from:</Form.Label>
              <Form.Control
                name="requiredApprovals"
                as="select"
                multiple
                ref={register}
              >
                {props.users.map((user, i) => (
                  <option key={i} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Button type="submit" className="text-right" variant="warning">
            Edit document
          </Button>
        </Form>
      </React.Fragment>
    }
    </div>
  );
}