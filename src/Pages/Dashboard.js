import React, { useState } from "react";
import Navigation from "../Components/Navigation";
import KatasReserved from "../Components/KatasReserved";
import SearchKatas from "../Components/SearchKatas";
import KatasCompleted from "../Components/KatasCompleted";
import AdminDashboard from "./AdminDashboard";
import { Container, Row, Col, Button, Form, Table, Toast } from "react-bootstrap";
import "./PagesStyle.css";
import {getKataBySlug} from "../Services/DataContext";
 
let exampleUser = {
  Id: 0,
  CohortName: "Season4",
  CodeWarName: "Jabarca435",
  Salt: "",
  Hash: "",
  IsAdmin: false,
  IsDeleted: false,  
};

//Model for the Reservation
// public int Id { get; set; }
// public int CohortId { get; set; }
// public string? CodeWarName { get; set; }
// public string? KataName { get; set; }
// public string? KataSlug { get; set; }
// public string? KataLink { get; set; }
// public string? KataLanguage { get; set; }
// public bool IsCompleted { get; set; }
// public bool IsDeleted { get; set; }


export default function Dashboard() {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const [searchKata, setSearchKata] = useState("");
  const [kata, setKata] = useState("");
  const [kataSlug, setKataSlug] = useState("");
  const [reservedKata, setReservedKata] = useState({});
  
  //button "Search"
  const handleSearch = async () => {
    let theKataSlug = TurnNameToSlugFormat(searchKata);
    setKataSlug(theKataSlug);
    let fetchedKata = await getKataBySlug(theKataSlug);
    setKata(fetchedKata);
    reservedKata = {
      Id : 0,
      CohortId : 0,
      CodeWarName : "admin",
      KataName : kata.name,
      KataSlug : kata.slug,
      KataLink : kata.url,
      KataLanguange : kata.languages.join(", "),
      IsCompleted : false,
      IsDeleted : false
    }
  }
  //button "reserve"
  const handleReserve = () => {
    //Reserve a kata to a specific person!
    //only show the toast if the kata has already been reserved or completed
      setShowA(!showA);
      
  }


//only works for words and spaces not special characters and ? / . , 
function TurnNameToSlugFormat(kataName)
{
  let splitArr = kataName.split(" ");
  let finalArr = [];
  for(let i = 0; i<splitArr.length; i++){
    if(i != splitArr.length-1){
      finalArr.push(splitArr[i].toLowerCase());
      finalArr.push("-");
    }else{
      finalArr.push(splitArr[i].toLowerCase());
    }
  }
  return finalArr.join("");
}

  return (
    <>
    { exampleUser.IsAdmin == true ?
    <>
    <Navigation />
    <AdminDashboard/>
    </>
    :
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
                        onChange={({target})=>setSearchKata(target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mt-4">
                    <Button className="searchButton mt-3" onClick={handleSearch}>Search</Button>
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
                {
                  kata.success == false ? 
                <Col md={4} className="mt-2 d-flex justify-content-center">
                  <td colSpan={2}>Kata Not Found</td>
                </Col>
                : 
                // kata != {} > 0 this logic also works dunno why tho
                //if the kata slug of the kata is equal to our input then...
                kata.slug === kataSlug
                ?
                <>
                <Col md={4} className="mt-2 d-flex justify-content-center">
                  <td colSpan={2}>{kata.name}</td>
                </Col>
                <Col md={4} className="mt-2 d-flex justify-content-center">
                  <td colSpan={2}>{kata.rank.name}</td>
                </Col>                
                <Col md={4} className="d-flex justify-content-center">
                  <td colSpan={2}>
                    {" "}
                    <Button onClick={handleReserve} variant="success" className="reserveButton">
                      Reserve
                    </Button>
                  </td>
                </Col>
                </>                
                :
                 null 
                }
              </Row>
            </tr>
          </tbody>
        </Table>
      </Row>

      {/* Error Message should only appear when the user clicks on a kata that is already reserved or completed (below) */}

    <Row className="d-flex justify-content-center">
      <Col md={6} className="mb-2 d-flex justify-content-center">       
        <Toast show={showA} onClose={toggleShowA} className="katasErrorMsg">
          <Toast.Header> 
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>This Kata is already reserved or completed!</Toast.Body>
        </Toast>
      </Col>
    </Row>



          <KatasCompleted />
        </Container>
      </Container>
    </>
    }
    </>
  );
}
