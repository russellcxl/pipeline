import React from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function Register(props) {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div>
      <h1 style={{ marginBottom: "1rem", textAlign:"center" }} >REGISTRATION</h1>
      <Row className="d-flex flex-column align-items-center">
        <Form>
          <Form.Control
            type="text"
            placeholder="name"
            style={{ marginBottom: "1rem" }}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            type="email"
            placeholder="email"
            style={{ marginBottom: "1rem" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="password"
            style={{ marginBottom: "1rem" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={() => props.handleRegister({ name, email, password })}
          >
            Sign up
          </Button>
        </Form>
      </Row>
    </div>
  );
}