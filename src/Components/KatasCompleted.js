import React from "react";
import { Row, Col, Table, Button, Accordion } from "react-bootstrap";
import "./ComponentsStyle.css";

export default function KatasCompleted() {
    let exampleUser = {
        Id: 0,
        CohortName: "Season4",
        CodeWarName: "Jabarca435",
        Salt: "",
        Hash: "",
        IsAdmin: true,
        IsDeleted: false,
      };

  return (
    <Row>
        {
        exampleUser.IsAdmin == true ?
      <h5 className="mt-4 d-flex justify-content-center whiteFont2">Katas Completed by {exampleUser.CodeWarName}</h5>
      :
      <h5 className="mt-4 d-flex justify-content-center whiteFont2">Katas Completed</h5>
        }
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
            {
                exampleUser.IsAdmin == true ?
                <Accordion.Header>Katas Completed by {exampleUser.CodeWarName}</Accordion.Header>
                :
                <Accordion.Header>Katas Completed</Accordion.Header>
            }
          <Accordion.Body>
            Here insert the katas that have been completed by x user!
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Row>
  );
}
