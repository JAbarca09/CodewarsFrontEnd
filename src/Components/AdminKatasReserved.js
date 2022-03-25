import React, {useContext, useEffect, useState} from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import "./ComponentsStyle.css";
import UserContext from "../Context/UserContext";
import ReserveContext from "../Context/ReserveContext";
import { getCohortByCohortName, getUserByUsername, UpdateReservation, getAllCompletedKatasByCodeWarName } from "../Services/DataContext";

export default function AdminKatasReserved() {
  let {searchKata,setSearchKata, kata, setKata, kataSlug, setKataSlug, userRerservedKatas, setDisplayReservebyUser, adminIncompleteKatas, setAdminIncompleteKatas, userSearch, setUserSearch,searchCompletedKatas, setSearchCompletedKatas,searchedCohortName,setSearchedCohortName,searchedCohortLvl,setSearchedCohortLvl, completedKatas,setCompletedKatas} = useContext(ReserveContext);
  let { codeWarName, cohortName, isAdmin } = useContext(UserContext);

  const [completeButtonKataValue, setCompleteButtonKataValue] = useState("");

   
   const handleCompleted = async (item) => {
     item.isCompleted = !item.isCompleted;
     console.log(item);
  
    let KataPassedIn = await UpdateReservation(item.id, item.isCompleted);
    console.log(KataPassedIn);

    if(KataPassedIn){
      let completedKatas = await getAllCompletedKatasByCodeWarName(item.codeWarName);
      console.log(completedKatas);
      setCompletedKatas(completedKatas);
    }

   }

   const handleUnreserve = (item) => {

      
   }


  return (
    <Row>
      <Col md={6} className="px-0">
        <p className="whiteFont">
          Katas Reserved by {userSearch} : {adminIncompleteKatas.length}/3{" "}
        </p>
      </Col>
      <Col md={6}>
          <p className="mt-1 whiteFont">Cohort: {searchedCohortName}, Level: {searchedCohortLvl}</p>
      </Col>

      <Table bordered className="katasReserved">
        <tbody className="whiteFont">
          <tr>
              {
                adminIncompleteKatas.map((kata, idx) => 
                <>
            <Row key={idx}>
                  <Col md={4} className="mt-2 d-flex justify-content-center">
                    <td onChange={(e) => setCompleteButtonKataValue(e.target.value)} colSpan={2}>{kata.kataName}</td>
                  </Col>
                  <Col md={4} className="mt-2 d-flex justify-content-center">
                    <td colSpan={2}>{kata.kataRank}</td>
                  </Col>
                  <Col md={2} className="mt-1 d-flex justify-content-center">
                    <Button variant="success" onClick={() => handleCompleted(kata)}>Completed</Button>
                  </Col>
                  <Col md={2} className="mt-1 d-flex justify-content-center">
                    <Button variant="danger" onClick={handleUnreserve}>Unreserve</Button>
                  </Col>
              </Row>
                </>
                )
              }
          </tr>
        </tbody>
      </Table>
    </Row>
  );
}
