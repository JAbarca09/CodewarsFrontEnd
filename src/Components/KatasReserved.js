import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import "./ComponentsStyle.css";

let exampleUser = {
  Id: 0,
  CohortName: "Season4",
  CodeWarName: "Jabarca435",
  Salt: "",
  Hash: "",
  IsAdmin: true,
  IsDeleted: false,
};

export default function KatasReserved() {
  return (
    <>
      <Row>
          {/* Replaced x with numbers of reserved by users */}
        <Col md={12} className="px-0">
          <p className="whiteFont">Katas Reserved: x/3</p>
        </Col>

            {/* replace Name of Kata and Kyu level can be accessed through pulled object */}
        <Table bordered className="katasReserved">
          <tbody className="whiteFont">
            <tr>
                <Row>
                <Col md={6} className="d-flex justify-content-center">
              <td colSpan={2}>Name of Kata #1</td>
                </Col>
                <Col md={6} className="d-flex justify-content-center">
                <td colSpan={2}>Kyu Rank #1</td>
                </Col>
                </Row>
            </tr>
            <tr>
                <Row>
                <Col md={6} className="d-flex justify-content-center">
              <td colSpan={2}>Name of Kata #2</td>
                </Col>
                <Col md={6} className="d-flex justify-content-center">
                <td colSpan={2}>Kyu Rank #2</td>
                </Col>
                </Row>
            </tr>
            <tr>
                <Row>
                <Col md={6} className="d-flex justify-content-center">
              <td colSpan={2}>Name of Kata #3</td>
                </Col>
                <Col md={6} className="d-flex justify-content-center">
                <td colSpan={2}>Kyu Rank #3</td>
                </Col>
                </Row>
            </tr>
          </tbody>
        </Table>
      </Row>
    </>
  );
}
