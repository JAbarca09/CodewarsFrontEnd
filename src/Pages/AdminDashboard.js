import React, { useState, useContext } from 'react'
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Navigation from "../Components/Navigation";
import KatasReserved from "../Components/KatasReserved";
import KatasCompleted from "../Components/KatasCompleted";
import AdminKatasReserved from '../Components/AdminKatasReserved';
import { getReservedKataByCodeWarName, getUserDataFromCodeWars, getUserByUsername, getCohortByCohortName } from '../Services/DataContext';
import ReserveContext from "../Context/ReserveContext";



export default function AdminDashboard() {
  let { searchKata, setSearchKata, kata, setKata, kataSlug, setKataSlug, userRerservedKatas, setDisplayReservebyUser, adminIncompleteKatas, setAdminIncompleteKatas, userSearch, setUserSearch,searchCompletedKatas, setSearchCompletedKatas, searchCodeWarsUser, setSearchCodeWarsUser,searchedCohortName,setSearchedCohortName,searchedCohortLvl,setSearchedCohortLvl } = useContext(ReserveContext);


  const handleSearch = async () => {

    let userDataFromCodeWars = await getUserDataFromCodeWars(userSearch);
    // console.log(userDataFromCodeWars);
    setSearchCodeWarsUser(userDataFromCodeWars);

    let fetchedSearchUser = await getUserByUsername(userSearch);
    console.log(fetchedSearchUser);
    setSearchedCohortName(fetchedSearchUser.cohortName);
    let fetchedCohort = await getCohortByCohortName(fetchedSearchUser.cohortName);
    setSearchedCohortLvl(fetchedCohort[0].cohortLevelOfDifficulty);

    let searchedUsersReservedKatas = await getReservedKataByCodeWarName(userSearch);
    console.log(searchedUsersReservedKatas);

    let searchCompletedKata = await getReservedKataByCodeWarName(userSearch);
    setSearchCompletedKatas(searchCompletedKata.filter(kata => kata.isCompleted == true));

    let notCompletedKatas = searchedUsersReservedKatas.filter(kata => kata.isCompleted === false);
    setAdminIncompleteKatas(notCompletedKatas);
  }


  return (
    <Container fluid className="backgroundColor">
        <Row className="pt-4">
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
