import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Axios from "axios";
import dotenv from "dotenv";

// ------------------------------------ config  ------------------------------------ //

dotenv.config();
let url = process.env.REACT_APP_URL;

// ------------------------------------ component  ------------------------------------ //

export default function NewDoc(props) {

  // const [title, setTitle] = useState();
  // const [text, setText] = useState();
  // const [deadline, setDeadline] = useState();
  // const [accessibleBy, setAccessibleBy] = useState();
  // const [requiredInputs, setRequiredInputs] = useState();
  // const [requiredApprovals, setRequiredApprovals] = useState();

  const title = useFormInput("");
  const text = useFormInput("");
  const deadline = useFormInput("");
  const accessibleBy = useFormInput([]);
  const requiredInputs = useFormInput([]);
  const requiredApprovals = useFormInput([]);

  async function handleSubmit() {
    console.log({title: title.value});
    console.log(requiredApprovals)
    // let res = await Axios.post(`${url}/api/documents/new`);
    // console.log(res.data);
  }

  const [test, setTest] = useState([]);

  function testChange(e) {
    setTest(...test, e.target.value);
    console.log(test);
  }
  
  return (
    <div>
      <h1>Create New Document</h1>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" type="text" placeholder="Title" {...title} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Text</Form.Label>
          <Form.Control name="text" as="textarea" rows="3" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Deadline</Form.Label>
          <Form.Control name="deadline" type="date" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Access rights:</Form.Label>
            <Form.Control name="accessibleBy" as="select" multiple>
              {props.users.map((user, i) => (
                <option key={i} value={user._id}>{user.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Require input from:</Form.Label>
            <Form.Control name="requiredInputs" as="select" multiple>
              {props.users.map((user, i) => (
                <option key={i} value={user._id}>{user.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Require approval from:</Form.Label>
            <Form.Control name="requiredApprovals" as="select" multiple onChange={testChange} value={test}>
              {props.users.map((user, i) => (
                <option key={i} value={user._id}>{user.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

        </Form.Row>
      </Form>
      <Button onClick={() => handleSubmit(title)}>Create document</Button>
    </div>
  );
}

// ------------------------------------ custom effect ------------------------------------ //

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onInput: handleChange,
  };
}