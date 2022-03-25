import React, {useContext, useEffect} from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import "./ComponentsStyle.css";
import UserContext from "../Context/UserContext";
import ReserveContext from "../Context/ReserveContext";
import { getCohortByCohortName, getUserByUsername } from "../Services/DataContext";

export default function AdminKatasReserved() {
  let { searchKata, setSearchKata, kata, setKata, kataSlug, setKataSlug, userRerservedKatas, setDisplayReservebyUser, adminIncompleteKatas, setAdminIncompleteKatas, userSearch, setUserSearch} = useContext(ReserveContext);
  let { codeWarName, cohortName, isAdmin } = useContext(UserContext);

  useEffect(async () => {
    let fetchedSearchUser = await getUserByUsername(userSearch);
    console.log(fetchedSearchUser);
  
    // let userCohort = await getCohortByCohortName(userItems.cohortName);
    // console.log(userItems.cohortName)
    // setCohort();
    // console.log(userCohort.cohortLevelOfDifficulty);
    console.log()
   }, []);

  //endpoint fetching the cohort by a user's username
  return (
    <Row>
      {/* Replaced x with numbers of reserved by users */}
      <Col md={6} className="px-0">
        <p className="whiteFont">
          Katas Reserved by {codeWarName} : {adminIncompleteKatas.length}/3{" "}
        </p>
      </Col>
      <Col md={6}>
          <p className="mt-1 whiteFont">Cohort: {cohortName}, Level: x</p>
      </Col>

      {/* replace Name of Kata and Kyu level can be accessed through pulled object */}
      <Table bordered className="katasReserved">
        <tbody className="whiteFont">
          <tr>
              {
                adminIncompleteKatas.map((kata, idx) => 
            <Row key={idx}>
                  <Col md={4} className="mt-2 d-flex justify-content-center">
                    <td colSpan={2}>{kata.kataName}</td>
                  </Col>
                  <Col md={4} className="mt-2 d-flex justify-content-center">
                    <td colSpan={2}>{kata.kataRank}</td>
                  </Col>
                  <Col md={2} className="mt-1 d-flex justify-content-center">
                    <Button variant="success">Completed</Button>
                  </Col>
                  <Col md={2} className="mt-1 d-flex justify-content-center">
                    <Button variant="danger">Unreserve</Button>
                  </Col>
              </Row>
                )
              }
          </tr>
        </tbody>
      </Table>
    </Row>
  );
}
