import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Table, Button, Accordion } from "react-bootstrap";
import "./ComponentsStyle.css";
import { getAllCompletedKatasByCodeWarName } from "../Services/DataContext";
import UserContext from "../Context/UserContext";

export default function KatasCompleted() {

  let { codeWarName, isAdmin } = useContext(UserContext);

  useEffect(async () => {
    let completedKatasByCodeWarsUser = await getAllCompletedKatasByCodeWarName(codeWarName);
    console.log(completedKatasByCodeWarsUser);
    setCompletedKatas(completedKatasByCodeWarsUser);
  }, []);

    let exampleUser = {
        Id: 0,
        CohortName: "Season4",
        CodeWarName: "Jabarca435",
        Salt: "",
        Hash: "",
        IsAdmin: true,
        IsDeleted: false,
      };

      const [completedKatas, setCompletedKatas] = useState([]);


  return (
    
    <Row>
        {
        isAdmin == true ?
      <h5 className="mt-4 d-flex justify-content-center whiteFont2">Katas Completed by {exampleUser.CodeWarName}</h5>
      :
      <h5 className="mt-4 d-flex justify-content-center whiteFont2">Katas Completed</h5>
        }
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
            {
                isAdmin == true ?
                <Accordion.Header>Katas Completed by {exampleUser.CodeWarName}</Accordion.Header>
                :
                <Accordion.Header>Katas Completed</Accordion.Header>
            }
          <Accordion.Body className="katasReserved2 justWhiteFont">
          {
            completedKatas.map((kata, idx) => {
              return (
                <Row key={idx}>
                  <Col md={6} className="d-flex justify-content-center">
                    <a href={kata.kataLink} target="_blank">
                    <td colSpan={2}>{kata.kataName}</td>
                    </a>
                  </Col>
                  <Col md={6} className="d-flex justify-content-center">
                    <td colSpan={2}>{kata.kataRank}</td>
                  </Col>
                </Row>
              )
            })
          }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Row>
  );
}
