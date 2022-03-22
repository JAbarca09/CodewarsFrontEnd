import React from "react";
import Navigation from "../Components/Navigation";
import KatasReserved from "../Components/KatasReserved";
import SearchKatas from "../Components/SearchKatas";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./PagesStyle.css";

export default function Dashboard() {
  return (
    <>
      <Navigation />
      <Container fluid className="backgroundColor">
        <Row className="pt-4">
          <Col className="d-flex justify-content-center">
            {/* Cohort displayed based on user */}
            <h3 className="whiteFont2">Cohort: Season 4, 8 Kyu</h3>
          </Col>
        </Row>
        <Container>
        <KatasReserved/>

        <Row>
          <Col>
            <Form>
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3" controlId="formBasicKata">
                    <Form.Label className="whiteFont1">
                      <h6>Search a Kata</h6>
                    </Form.Label>
                    <Form.Control className="kataSearchBar curveRadius" type="text" placeholder="Kata's Name or ID" />
                  </Form.Group>
                </Col>
                <Col md={4} className="mt-4">
                  <Button className="searchButton">Search</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <SearchKatas/>
        
        </Container>

      </Container>
    </>
  );
}
