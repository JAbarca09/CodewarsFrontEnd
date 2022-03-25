import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Table, Button, Accordion } from "react-bootstrap";
import "./ComponentsStyle.css";
import { getAllCompletedKatasByCodeWarName, getReservedKataByCodeWarName } from "../Services/DataContext";
import UserContext from "../Context/UserContext";
import ReserveContext from "../Context/ReserveContext";

export default function KatasCompleted() {

  let { userItems, codeWarName, isAdmin } = useContext(UserContext);
  // let { searchKata, setSearchKata, kata, setKata, kataSlug, setKataSlug, userRerservedKatas, setDisplayReservebyUser, userSearch, searchCompletedKatas, setSearchCompletedKatas} =
  let { searchKata, setSearchKata, kata, setKata, kataSlug, setKataSlug, userRerservedKatas, setDisplayReservebyUser, completedKatas, setCompletedKatas, userSearch, searchCompletedKatas, setSearchCompletedKatas} =
    useContext(ReserveContext);

  

  useEffect(async () => {
    // let completedKatasByCodeWarsUser = await getAllCompletedKatasByCodeWarName(codeWarName);
    let reservedKatas = await getReservedKataByCodeWarName(userItems.codeWarName);
    setCompletedKatas(reservedKatas.filter(kata => kata.isCompleted == true));
    // console.log(completedKatasByCodeWarsUser);
    // setCompletedKatas(completedKatasByCodeWarsUser);
    // let searchCompletedKata = await getReservedKataByCodeWarName(userSearch);
    // setSearchCompletedKatas(searchCompletedKata.filter(kata => kata.isCompleted == true));
   
  }, []);



  return (
    
    <Row>
        {
        isAdmin == true ?
      <h5 className="mt-4 d-flex justify-content-center whiteFont2">Katas Completed by {userSearch}</h5>
      :
      <h5 className="mt-4 d-flex justify-content-center whiteFont2">Katas Completed</h5>
        }
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
            {
                isAdmin == true ?
                <>
                <Accordion.Header>Katas Completed by {userSearch}</Accordion.Header>
                <Accordion.Body className="katasReserved2 justWhiteFont">
          {
            searchCompletedKatas.map((kata, idx) => {
              return (
                <Row key={idx} className="">
                  <Col md={6} className="mb-1 d-flex justify-content-center">
                    <a href={kata.kataLink} target="_blank">
                    <td colSpan={2}>{kata.kataName}</td>
                    </a>
                  </Col>
                  <Col md={6} className="mb-2 d-flex justify-content-center">
                    <td colSpan={2}>{kata.kataRank}</td>
                  </Col>
                  <hr className="mt-2"/>
                </Row>
              )
            })
          }
          </Accordion.Body>
                </>
                :
                <>
                <Accordion.Header>Katas Completed</Accordion.Header>
                <Accordion.Body className="katasReserved2 justWhiteFont">
                {
                  completedKatas.map((kata, idx) => {
                    return (
                      <Row key={idx} className="">
                        <Col md={6} className="mb-1 d-flex justify-content-center">
                          <a href={kata.kataLink} target="_blank">
                          <td colSpan={2}>{kata.kataName}</td>
                          </a>
                        </Col>
                        <Col md={6} className="mb-2 d-flex justify-content-center">
                          <td colSpan={2}>{kata.kataRank}</td>
                        </Col>
                        <hr className="mt-2"/>
                      </Row>
                    )
                  })
                }
                </Accordion.Body>
                </>
            }
        </Accordion.Item>
      </Accordion>
    </Row>
  );
}
