import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CodewarsLogo from "../images/codestack-logo.svg";
import "./PagesStyle.css";

export default function LoginPage() {
  return (
    <Container fluid className="backgroundColor d-flex align-items-center justify-content-center">



        <Row>
          <Col>
            
          </Col>
        </Row>
      <Row>
        <Col>
          <Form>
            <span className="d-flex justify-content-center mb-5">

            <Form.Group><img src={CodewarsLogo} className="logo" /></Form.Group>
            </span>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="whiteFont1 ms-2">Username</Form.Label>
              <Form.Control
                className="inputWidth ms-2"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="whiteFont1 ms-2">Password</Form.Label>
              <Form.Control
                className="inputWidth ms-2"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <span className="d-flex justify-content-center mt-4">
            <Button variant="primary" type="submit" className="ButtonStyle">
              Log In
            </Button>
            </span>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
