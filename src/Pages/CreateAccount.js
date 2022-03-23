import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Navigation from "../Components/Navigation";

export default function CreateAccount() {
  return (
    <>
      <Navigation />
      <Container
        fluid
        className="backgroundColor d-flex justify-content-center"
      >
        <Form>
          <Row className="mt-5">
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

            <Row className="mx-1 mt-2 d-flex justify-content-center">
            <Col md={2} className="">
              <Form.Select aria-label="Default select example">
                <option>User Privileges</option>
                <option value="1">Student</option>
                <option value="2">Admin</option>
              </Form.Select>
            </Col>
            
            <Col md={2} className="">
            <Form.Select aria-label="Default select example">
                <option>Select a Cohort</option>
                <option value="1">Season 1</option>
                <option value="2">Season 2</option>
                <option value="3">Season 3</option>
            </Form.Select>
            </Col>                
            </Row>
            
            <Col md={12} className="d-flex justify-content-center mt-4">
              <Button variant="primary" type="submit" className="ButtonStyle2">
                Create User
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
