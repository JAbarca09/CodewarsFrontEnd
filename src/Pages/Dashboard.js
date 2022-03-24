import React, { useState, useContext, useEffect } from "react";
import Navigation from "../Components/Navigation";
import KatasReserved from "../Components/KatasReserved";
import KatasCompleted from "../Components/KatasCompleted";
import AdminDashboard from "./AdminDashboard";
import UserContext from "../Context/UserContext";
import ReserveContext from "../Context/ReserveContext";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Toast,
} from "react-bootstrap";
import "./PagesStyle.css";
import {
  getKataBySlug,
  updateReservedKata,
  getAllReservedKatas,
  getAllCompletedKatas,
  getAllCompletedKatasByCodeWarName
} from "../Services/DataContext";

let exampleUser = {
  Id: 0,
  CohortName: "Season4",
  CodeWarName: "Jabarca435",
  Salt: "",
  Hash: "",
  IsAdmin: false,
  IsDeleted: false,
};

export default function Dashboard() {

let {codeWarName, isAdmin, cohortName} = useContext(UserContext);
let {searchKata,setSearchKata, kata, setKata, kataSlug, setKataSlug} = useContext(ReserveContext);

  useEffect(async () => {
    let userCompletedKatas = await getAllCompletedKatasByCodeWarName(codeWarName);
  }, [])

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  
  // const [searchKata, setSearchKata] = useState("");
  // const [kata, setKata] = useState("");
  // const [kataSlug, setKataSlug] = useState("");

  let match = false;

  //button "Search"
  const handleSearch = async () => {
    let allCompletedKata = await getAllCompletedKatas();
    let allReservedKata = await getAllReservedKatas();

    console.log(allReservedKata);

    let theKataSlug = TurnNameToSlugFormat(searchKata);
    setKataSlug(theKataSlug);
    let fetchedKata = await getKataBySlug(theKataSlug);
    setKata(fetchedKata);

    //how many katas can the user reserve
    let allReservedKataNames = [];
    let allCompletedKataNames = [];
    for(let i = 0; i<allReservedKata.length; i++){
      allReservedKataNames.push(allReservedKata[i].kataName);
    }

    for(let j = 0; j<allCompletedKata.length; j++){
      allCompletedKataNames.push(allCompletedKata[j].kataName);
    }
    // console.log(allReservedKataNames);
    console.log(allCompletedKataNames);

    if(allReservedKataNames.includes(kata.name) || allCompletedKataNames.includes(kata.name) || allReservedKata.length == 3){
      setShowA(showA);
      match = true;
    }else{
      match = false;
    }
  };

  //button "reserve"
  const handleReserve = async () => {  
      let kataLanguages = kata.languages;
      let kataLanguagesString = kataLanguages.join(", ");
      const userReservedKata = {
        Id: 0,
        CodeWarName: "Admin",
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

  //only works for words and spaces not special characters and ? / . ,
  function TurnNameToSlugFormat(kataName) {
    let splitArr = kataName.split(" ");
    let finalArr = [];
    for (let i = 0; i < splitArr.length; i++) {
      if (i != splitArr.length - 1) {
        finalArr.push(splitArr[i].toLowerCase());
        finalArr.push("-");
      } else {
        finalArr.push(splitArr[i].toLowerCase());
      }
    }
    return finalArr.join("");
  }

  return (
    <>
      {exampleUser.IsAdmin == true ? (
        <>
          <Navigation />
          <AdminDashboard />
        </>
      ) : (
        <>
          <Navigation />
          <Container fluid className="backgroundColor">
            <Row className="pt-4">
              <Col className="d-flex justify-content-center">
                {/* Cohort displayed based on user */}
                <h3 className="whiteFont2">Cohort: Season 4, 8 Kyu</h3>
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
                  >
                    <Toast.Header>
                      <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>
                      This Kata is already reserved or completed!
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
