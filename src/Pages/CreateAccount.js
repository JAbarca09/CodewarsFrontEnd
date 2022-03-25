import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, ToastContainer, Toast } from "react-bootstrap";
import Navigation from "../Components/Navigation";
import { createAccount, getallCohorts, getAllUsers, getCohortByCohortName } from '../Services/DataContext';
import './PagesStyle.css';
export default function CreateAccount() {

  const [codeWarName, setCodeWarName] = useState("");
  const [cohortName, setCohortName] = useState("");
  const [Password, setPassword] = useState("");
  const [makeAdmin, setMakeAdmin] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [allCohorts, setAllCohorts] = useState([]);
  const [selectCohort, setSelectCohort] = useState("");
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  const handleAddUser = async () => { 
    let userData = {
      Id: 0,
      CodeWarName: codeWarName,
      CohortName: selectCohort,
      Password: Password,
      IsAdmin: makeAdmin,
    };
    console.log(selectCohort);
    let result = await createAccount(userData);
    if(result == false)
    {
      toggleShowA();
    }

    console.log(result);
    console.log(userData);
    let allAddedUsers = await getAllUsers();     
    setAllUsers([...allAddedUsers]);
  };


  const setPrivileges = async (value) => {
      if(value == "1")
      {
        setMakeAdmin(false);
      }
      else if(value == "2")
      {
        setMakeAdmin(true);
      }
      else
      {
        setMakeAdmin();
      }
  }

  useEffect( async() => {
    let displayCohorts = await getallCohorts();
    console.log(displayCohorts);
    setAllCohorts(displayCohorts);
      
  }, [])


  return (
    <>
      <Navigation />
      <Container
        fluid
        className="backgroundColor d-flex justify-content-center"
      >
        <div>
          <Row className="mt-5">
            <Col md={12} className="d-flex justify-content-center">
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label className="whiteFont1 ms-2">CodewarName</Form.Label>
                <Form.Control
                  className="inputWidth ms-2"
                  type="username"
                  placeholder="Enter CodewarName"
                  onChange={({ target: { value } }) => setCodeWarName(value)}
                />
              </Form.Group>
            </Col>
            <Col md={12} className="d-flex justify-content-center">
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label className="whiteFont1 ms-2">Password</Form.Label>
                <Form.Control
                  className="inputWidth ms-2"
                  type="password"
                  placeholder="Password"
                  onChange={({ target: { value } }) => setPassword(value)}
                />
              </Form.Group>
            </Col>

            <Row className="mx-1 mt-2 d-flex justify-content-center">
            <Col md={2} className="">
              <Form.Select aria-label="Default select example"  onChange={({ target: { value } }) => setPrivileges(value)}>
                <option>User Privileges</option>
                <option value="1">Student</option>
                <option value="2">Admin</option>
              </Form.Select>
            </Col>
            
            <Col md={2} className="">
            <Form.Select aria-label="Default select example"  onChange={({ target: { value } }) => setSelectCohort(value)} value={selectCohort}>
                <option>Select a Cohort</option>
                {
                  allCohorts.map((cohort, id) => {
                    return (
                      <>
                        <option value={cohort.cohortName}>{cohort.cohortName}</option>
                      </>
                    ) 
                  })
                }
            </Form.Select>
            </Col>                
            </Row>
            
            <Col md={12} className="d-flex justify-content-center mt-5">
              <Button variant="primary" type="submit" className="ButtonStyle2" onClick={handleAddUser}>
                Create User
              </Button>
            </Col>
          </Row>
          </div>
          <ToastContainer position="top-center" className="mt-5">
          <Toast show={showA} onClose={toggleShowA} delay={5000} autohide>
         <Toast.Header >
           <strong className="me-auto">Unable to Create User</strong>
          </Toast.Header>
         <Toast.Body className="toastBg">User Already Exits, Enter in a new CodewarName</Toast.Body>
         </Toast>
        </ToastContainer>
      </Container>
    </>
  );
}
