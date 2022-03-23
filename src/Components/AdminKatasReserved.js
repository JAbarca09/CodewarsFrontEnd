import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import "./ComponentsStyle.css";

export default function AdminKatasReserved() {
  let exampleUser = {
    Id: 0,
    CohortName: "Season4",
    CodeWarName: "Jabarca435",
    Salt: "",
    Hash: "",
    IsAdmin: true,
    IsDeleted: false,
  };

  //endpoint fetching the cohort by a user's username
  return (
    <Row>
      {/* Replaced x with numbers of reserved by users */}
      <Col md={6} className="px-0">
        <p className="whiteFont">
          Katas Reserved by {exampleUser.CodeWarName} : x/3{" "}
        </p>
      </Col>
      <Col md={6}>
          <p className="mt-1 whiteFont">Cohort: {exampleUser.CohortName}, Level: x</p>
      </Col>

      {/* replace Name of Kata and Kyu level can be accessed through pulled object */}
      <Table bordered className="katasReserved">
        <tbody className="whiteFont">
          <tr>
            <Row>
              <Col md={4} className="mt-1 d-flex justify-content-center">
                <td colSpan={2}>Name of Kata #1</td>
              </Col>
              <Col md={4} className="mt-1 d-flex justify-content-center">
                <td colSpan={2}>Kyu Rank #1</td>
              </Col>
              <Col md={2} className="d-flex justify-content-center">
                <Button variant="success">Completed</Button>
              </Col>
              <Col md={2} className="d-flex justify-content-center">
                <Button variant="danger">Unreserve</Button>
              </Col>
            </Row>
          </tr>
          <tr>
            <Row>
              <Col md={4} className="mt-1 d-flex justify-content-center">
                <td colSpan={2}>Name of Kata #2</td>
              </Col>
              <Col md={4} className="mt-1 d-flex justify-content-center">
                <td colSpan={2}>Kyu Rank #2</td>
              </Col>
              <Col md={2} className="d-flex justify-content-center">
                <Button variant="success">Completed</Button>
                </Col>
                <Col md={2} className="d-flex justify-content-center">
                <Button variant="danger">Unreserve</Button>
                </Col>
            </Row>
          </tr>
          <tr>
            <Row>
              <Col md={4} className="mt-1 d-flex justify-content-center">
                <td colSpan={2}>Name of Kata #3</td>
              </Col>
              <Col md={4} className="mt-1 d-flex justify-content-center">
                <td colSpan={2}>Kyu Rank #3</td>
              </Col>
              <Col md={2} className="d-flex justify-content-center">
                <Button variant="success">Completed</Button>
              </Col>
              <Col md={2} className="d-flex justify-content-center">
                <Button variant="danger">Unreserve</Button>
              </Col>
            </Row>
          </tr>
        </tbody>
      </Table>
    </Row>
  );
}
