import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import "./ComponentsStyle.css";
import ReserveContext from "../Context/ReserveContext";
import UserContext from "../Context/UserContext";
import { getReservedKataByCodeWarName, getKataBySlug } from "../Services/DataContext";

export default function KatasReserved() {

  let { userItems,codeWarName } = useContext(UserContext);
  let { searchKata, setSearchKata, kata, setKata, kataSlug, setKataSlug, userRerservedKatas, setDisplayReservebyUser} = useContext(ReserveContext);


  useEffect(async () => {
    let reservedKatas = await getReservedKataByCodeWarName(userItems.codeWarName);
    setDisplayReservebyUser(reservedKatas.filter(kata => kata.isCompleted == false));
  }, []);

  return (
    <>
      <Row>
        <Col md={12} className="px-0">
          <p className="whiteFont">
            Katas Reserved: {userRerservedKatas.length}/3
          </p>
        </Col>

        <Table bordered className="katasReserved">
          <tbody className="whiteFont">
            {
            userRerservedKatas.map((kata, idx) => {
              return (

                <tr key={idx}>
                <Row>
                  <Col md={6} className="d-flex justify-content-center">
                    <a href={kata.kataLink} target="_blank">
                    <td colSpan={2}>{kata.kataName}</td>
                    </a>
                  </Col>
                  <Col md={6} className="d-flex justify-content-center">
                    <td colSpan={2}>{kata.kataRank}</td>
                  </Col>
                </Row>
              </tr>
              )
            })           
            }
          </tbody>
        </Table>
      </Row>
    </>
  );
}
