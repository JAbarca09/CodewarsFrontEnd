import React from 'react'
import { Row, Col, Table, Button } from "react-bootstrap";
import "./ComponentsStyle.css";

export default function SearchKatas() {
  return (
    <Row>
        <Table bordered className="katasReserved">
          <tbody className="whiteFont">
            <tr>
                <Row>
                <Col md={4} className="d-flex justify-content-center">
              <td colSpan={2}>Name of Kata Searched</td>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                <td colSpan={2}>Kyu Level of Kata Searched</td>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                <td colSpan={2}> <Button variant="success" className="reserveButton">Reserve</Button></td>
                </Col>
                </Row>
            </tr>
          </tbody>
        </Table>
    </Row>
  )
}
