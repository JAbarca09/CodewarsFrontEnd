import React, { useState, useContext } from 'react'
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Navigation from "../Components/Navigation";
import KatasReserved from "../Components/KatasReserved";
import KatasCompleted from "../Components/KatasCompleted";
import AdminKatasReserved from '../Components/AdminKatasReserved';
import { getReservedKataByCodeWarName } from '../Services/DataContext';
import ReserveContext from "../Context/ReserveContext";



export default function AdminDashboard() {
  let { searchKata, setSearchKata, kata, setKata, kataSlug, setKataSlug, userRerservedKatas, setDisplayReservebyUser, adminIncompleteKatas, setAdminIncompleteKatas, userSearch, setUserSearch, setCompletedKatas } = useContext(ReserveContext);


  const handleSearch = async () => {
    let searchedUsersReservedKatas = await getReservedKataByCodeWarName(userSearch);
    console.log(searchedUsersReservedKatas);

    let notCompletedKatas = searchedUsersReservedKatas.filter(kata => kata.isCompleted === false);
    setAdminIncompleteKatas(notCompletedKatas);
  }


  return (
    <Container fluid className="backgroundColor">
        <Row className="pt-4">
            {/* Cohort displayed based on user */}
          {/* <Col className="d-flex justify-content-center">
            <h3 className="whiteFont2">Cohort: Season 4, 8 Kyu</h3>
          </Col> */}
        </Row>
        <Container>
        <Row>
            <Col>
              <Form>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3" controlId="formBasicKata">
                      <Form.Label className="whiteFont1">
                        <h6>Search for a User</h6>
                      </Form.Label>
                      <Form.Control
                        className="kataSearchBar curveRadius"
                        type="text"
                        placeholder="Enter Codewar's Username"
                        onChange={({ target }) => setUserSearch(target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mt-4">
                    <Button onClick={handleSearch} className="searchButton mt-3">Search</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <AdminKatasReserved/>
          <KatasCompleted />
        </Container>
      </Container>
  )
}
