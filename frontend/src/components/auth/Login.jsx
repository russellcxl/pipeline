import React from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function Login(props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div>
      <h1 style={{ marginBottom: "1rem", textAlign:"center" }}>LOGIN</h1>
      <Row className="flex-center">
        <Form className="d-flex flex-column align-items-center">
          <Form.Control
            type="text"
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
            onClick={() => props.handleLogin({ email, password })}
          >
            Sign in
          </Button>
        </Form>
      </Row>
    </div>
  );
}