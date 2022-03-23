import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CodewarsLogo from "../images/codestack-logo.svg";
import "./PagesStyle.css";

export default function LoginPage() {

  return (
    <Container fluid className="backgroundColor d-flex align-items-center justify-content-center">
      <Form>
        <Row clasName="">
          <Col md={12} className="d-flex justify-content-center">
          <Form.Group><img src={CodewarsLogo} className="logo" /></Form.Group>
          </Col>
          <Col md={12} className="d-flex justify-content-center whiteFontjustFont">
            <h1>Kata Tracker</h1>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="whiteFont1 ms-2">Username</Form.Label>
              <Form.Control
                className="inputWidth ms-2"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="whiteFont1 ms-2">Password</Form.Label>
              <Form.Control
                className="inputWidth ms-2"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="ButtonStyle">
              Log In
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
