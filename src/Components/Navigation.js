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

let exampleUser = {
  Id: 0,
  CohortName: "Season4",
  CodeWarName: "Jabarca435",
  Salt: "",
  Hash: "",
  IsAdmin: true,
  IsDeleted: false,
};

export default function Navigation() {
  return (
    
      <Container fluid className="px-0">
        <Navbar className="navBG">
          <Container className="d-flex justify-content-center">
            {/* remember to change href */}
            <Row>
              <Col md={12} className="d-flex justify-content-center">
                <Navbar.Brand href="dashboard">
                  <img src={CodewarsLogo} className="logo" />
                  <h1 className="justWhiteFont d-flex justify-content-center">Kata Tracker</h1>
                </Navbar.Brand>
              </Col>

              <Col md={12} >
                <Nav className="me-auto d-flex justify-content-center">
                  <Nav.Link href="dashboard">
                    <span className="whiteFont">Dashboard</span>
                  </Nav.Link>
                  {/* Below only appears for admins */}
                {exampleUser.IsAdmin == true ?
                <>
                  <Nav.Link href="creataccount">
                    <span className="whiteFont">Create User</span>
                  </Nav.Link>
                  <Nav.Link href="createcohort">
                    <span className="whiteFont">Cohorts</span>
                  </Nav.Link>
                </>
                  :
                  null
                }
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
