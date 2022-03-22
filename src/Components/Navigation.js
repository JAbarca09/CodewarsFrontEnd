import {
  Container,
  Navbar,
  Nav,
  Row,
  Col
} from "react-bootstrap";
import React from "react";
import "./ComponentsStyle.css";
import CodewarsLogo from "../images/codestack-logo.svg";

export default function Navigation() {
  return (
      <Container fluid className="px-0">
        <Navbar className="navBG">
          <Container className="d-flex justify-content-center">
            {/* remember to change href */}
            <Row>
              <Col md={12} className="d-flex justify-content-center">
                <Navbar.Brand href="#dashboard">
                  <img src={CodewarsLogo} className="logo" />
                </Navbar.Brand>
              </Col>

              <Col md={12} >
                <Nav className="me-auto d-flex justify-content-center">
                  <Nav.Link href="#home">
                    <span className="whiteFont">Dashboard</span>
                  </Nav.Link>
                  <Nav.Link href="#home">
                    <span className="whiteFont">Logout</span>
                  </Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </Container>
  );
}
