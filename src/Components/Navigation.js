import { Container, Navbar, Nav, Row, Col, Button, Form } from "react-bootstrap";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import "./ComponentsStyle.css";
import CodewarsLogo from "../images/codestack-logo.svg";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Container fluid className="px-0">
        <Navbar className="navBG">
          <Container className="d-flex justify-content-center">
              {/* remember to change href */}
              <Row>
                  <Col md={12}>
            <Navbar.Brand href="#home"><img src={CodewarsLogo} /></Navbar.Brand>

                  </Col>
              </Row>
              <Row>
                  <Col md={12}>
            <Nav className="me-auto">
              <Nav.Link href="#home"><span className="whiteFont">Dashboard</span></Nav.Link>
              <Nav.Link href="#home"><span className="whiteFont">Directory</span></Nav.Link>
              <Nav.Link href="#home"><span className="whiteFont">Logout</span></Nav.Link>
            </Nav>
                  </Col>
              </Row>
          </Container>
        </Navbar>
      </Container>
      <Routes>
        {/* <Route path="/" element={<LoginPage/>} key="login"/> */}
      </Routes>
    </BrowserRouter>
  );
}
