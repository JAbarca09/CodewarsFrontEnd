import React, { useState, useContext, useEffect } from "react";
import Navigation from "../Components/Navigation";
import KatasReserved from "../Components/KatasReserved";
import KatasCompleted from "../Components/KatasCompleted";
import AdminDashboard from "./AdminDashboard";
import UserContext from "../Context/UserContext";
import ReserveContext from "../Context/ReserveContext";
import { Container, Row, Col, Button, Form, Table, Toast, } from "react-bootstrap";
import "./PagesStyle.css";
import { getCohortByCohortName, getCohortById, getUserByUsername, getKataBySlug, updateReservedKata, UpdateReservation, getAllReservedKatas, getAllCompletedKatas, getAllCompletedKatasByCodeWarName, getCohortByCodeWarName, getReservedKataByCodeWarName, AddCompletedKata } from "../Services/DataContext";


export default function Dashboard() {
  let { userItems, codeWarName, isAdmin, setIsAdmin, cohortName, setCohortName } = useContext(UserContext);
  let { searchKata, setSearchKata, kata, setKata, kataSlug, setKataSlug, userRerservedKatas, setDisplayReservebyUser } = useContext(ReserveContext);

  let reservedKatasByUser;

  useEffect(async () => {
    let fetchedCurrentUser = await getUserByUsername(userItems.codeWarName);
    setIsAdmin(fetchedCurrentUser.isAdmin);

    let userCohort = await getCohortByCohortName(userItems.cohortName);
    setCohort(userCohort[0].cohortLevelOfDifficulty);
   }, []);

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const [match, setMatch] = useState(false);

  const [cohort, setCohort] = useState(0);
  const [theUsersReservedKatas, setTheUsersReservedKatas] = useState([]);

  //button "Search"
  const handleSearch = async () => {
    reservedKatasByUser = await getReservedKataByCodeWarName(userItems.codeWarName);
    setTheUsersReservedKatas(reservedKatasByUser);

    let allCompletedKata = await getAllCompletedKatas();
    let allReservedKata = await getAllReservedKatas();

    let theKataSlug = TurnNameToSlugFormat(searchKata);
    setKataSlug(theKataSlug);
    let fetchedKata = await getKataBySlug(theKataSlug);
    setKata(fetchedKata);

    let fetchedKataRank = Number(fetchedKata.rank.name[0]);

    let allReservedKataNames = [];
    let allCompletedKataNames = [];
    for (let i = 0; i < allReservedKata.length; i++) {
      allReservedKataNames.push(allReservedKata[i].kataName);
    }

    for (let j = 0; j < allCompletedKata.length; j++) {
      allCompletedKataNames.push(allCompletedKata[j].kataName);
    }

    
    let inRange = false;
    for(let k = 0; k<=Number(cohort); k++){
      if(inRange == false){
        if(k === fetchedKataRank){
          inRange = true;
        }else{
        }
      }
    }
    
    if (allReservedKataNames.includes(fetchedKata.name) || allCompletedKataNames.includes(fetchedKata.name) || inRange === false || theUsersReservedKatas.length === 3) {
      toggleShowA();
      setMatch(true);
    } else {
      setMatch(false);
      let reservedKatas = await getReservedKataByCodeWarName(userItems.codeWarName);
      setDisplayReservebyUser(reservedKatas.filter(kata => kata.isCompleted == false));
    }
  };

  //button "reserve"
  const handleReserve = async () => {
    let kataLanguages = kata.languages;
    let kataLanguagesString = kataLanguages.join(", ");
    const userReservedKata = {
      Id: 0,
      KataRank: kata.rank.name,
      CodeWarName: codeWarName,
      KataName: kata.name,
      KataSlug: kata.slug,
      KataLink: kata.url,
      KataLanguage: kataLanguagesString,
      IsCompleted: false,
      IsDeleted: false,
    };
    let results = await updateReservedKata(userReservedKata);
    console.log(results);
  };

  //better version but still doesn't work for every single kata!
  function TurnNameToSlugFormat(kataName) {
    let kataNameWithNoSpecialChars = kataName.replace(/[^\w\s]/gi, '');
    let wordArr = kataNameWithNoSpecialChars.split(" ");
    let finalArr = [];

    //check for empty spaces
    for(let i = 0; i<wordArr.length; i++){
      if(wordArr[i] === ""){
        wordArr.splice(i, 1);
      }
    }

    for(let j = 0; j<wordArr.length; j++){
      if(j != wordArr.length - 1){
        finalArr.push(wordArr[j].toLowerCase());
        finalArr.push("-");
      }else{
        finalArr.push(wordArr[j].toLowerCase());
      }
    }
    console.log(finalArr.join(""))
    return finalArr.join("");
  }

  return (
    <>
      {isAdmin == true ? (
        <>
          <Navigation />
          <AdminDashboard />
        </>
      ) : (
        <>
          <Navigation />
          <Container fluid className="backgroundColor">
            <Row className="pt-4">
              <Col md={12} className="d-flex justify-content-center">
                {/* Cohort displayed based on user */}
                <h3 className="whiteFont2">Cohort: {userItems.cohortName}</h3>
              </Col>
            </Row>
            <Row className="">
              <Col md={12} className="d-flex justify-content-center">
                {/* Cohort displayed based on user */}
                <h3 className="whiteFont2">Level: {cohort} kyu</h3>
              </Col>
            </Row>
            <Container>
              <KatasReserved />
              <Row>
                <Col>
                  <Form>
                    <Row>
                      <Col md={8}>
                        <Form.Group className="mb-3" controlId="formBasicKata">
                          <Form.Label className="whiteFont1">
                            <h6>Search a Kata</h6>
                          </Form.Label>
                          <Form.Control
                            className="kataSearchBar curveRadius"
                            type="text"
                            placeholder="Kata's Name"
                            onChange={({ target }) =>
                              setSearchKata(target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mt-4">
                        <Button
                          className="searchButton mt-3"
                          onClick={handleSearch}
                        >
                          Search
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>

              <Row>
                <Table bordered className="katasReserved">
                  <tbody className="whiteFont">
                    <tr>
                      <Row>
                        {kata.success == false ? (
                          <Col
                            md={4}
                            className="mt-2 d-flex justify-content-center"
                          >
                            <td colSpan={2}>
                              Kata Not Found. Search for another!
                            </td>
                          </Col>
                        ) : // kata != {} > 0 this logic also works dunno why tho
                        //if the kata slug of the kata is equal to our input then...
                        kata.slug === kataSlug && match === false ? (
                          <>
                            <Col
                              md={4}
                              className="mt-2 d-flex justify-content-center"
                            >
                              <td colSpan={2}>{kata.name}</td>
                            </Col>
                            <Col
                              md={4}
                              className="mt-2 d-flex justify-content-center"
                            >
                              <td colSpan={2}>{kata.rank.name}</td>
                            </Col>
                            <Col
                              md={4}
                              className="d-flex justify-content-center"
                            >
                              <td colSpan={2}>
                                {" "}
                                <Button
                                  onClick={handleReserve}
                                  variant="success"
                                  className="reserveButton"
                                >
                                  Reserve
                                </Button>
                              </td>
                            </Col>
                          </>
                        ) : null}
                      </Row>
                    </tr>
                  </tbody>
                </Table>
              </Row>

              {/* Error Message should only appear when the user clicks on a kata that is already reserved or completed (below) */}

              <Row className="d-flex justify-content-center">
                <Col md={6} className="mb-2 d-flex justify-content-center">
                  <Toast
                    show={!showA}
                    onClose={toggleShowA}
                    className="katasErrorMsg"
                    delay={5000}
                    autohide
                  >
                    <Toast.Header>
                      <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>
                      This Kata is already reserved, completed or you reached the maximum amount of reserves
                    </Toast.Body>
                  </Toast>
                </Col>
              </Row>

              <KatasCompleted />
            </Container>
          </Container>
        </>
      )}
    </>
  );
}
