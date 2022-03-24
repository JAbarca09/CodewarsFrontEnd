import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import Navigation from "../Components/Navigation";
import UserContext from "../Context/UserContext";
import { getUserByUsername, checkToken } from "../Services/DataContext";
import { useNavigate } from "react-router";
// import 'bootstrap/dist/css/bootstrap.min.css';

//The edit cohort button will only display when a cohort has been selected, use a ternary operator
export default function AdminCreateCohort() {
  
  let navigate = useNavigate();
  let {
    userItems
  } = useContext(UserContext);

  const [selectCohort, setSelectCohort] = useState("");

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleCohortSelect = (e) => {
      setSelectCohort(e.target.value);
  }

  useEffect(async () => {
    if (!checkToken()) {
      navigate("/login");
    } else {
      
      if(!userItems.isAdmin){
        navigate("/dashboard")
      };
    }
  }, []);

  return (
    <>
      <Navigation />
      <Container fluid className="backgroundColor">
        <Row className="pt-4 d-flex justify-content-center">
          <Col md={4}>
            <Form.Select onChange={handleCohortSelect} aria-label="Default select example">
              <option>Select a Cohort</option>
              <option value="Season 1">Cohort One</option>
              <option value="Season 2">Cohort Two</option>
              <option value="Season 3">Cohort Three</option>
            </Form.Select>
          </Col>
          <Col md={4} className="d-flex justify-content-center">
            {
              selectCohort === "" ? null 
              :
              <Button onClick={handleShow}>Edit Cohort</Button>
            }
          </Col>
          <Col md={4} className="d-flex justify-content-center">
            <Button onClick={handleShow2}>Create Cohort</Button>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12} className="d-flex justify-content-center">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>CodeWar Username</th>
                  <th>Role</th>
                  <th>Change Role</th>
                  <th>Delete Users</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>1</td>
                  <td>Jabarca435</td>
                  <td>student</td>
                  <td>
                    <Button variant="success">Change Role</Button>
                  </td>
                  <td>
                    <Button variant="danger">Delete User</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Cohort</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <Form.Label htmlFor="CohortName">Enter a Cohort Name</Form.Label>
              <Form.Control
                type="text"
                id="EnterCohortName"
                placeholder="Enter Cohort"
                aria-describedby="CohortName"
              />
            </>
          </Modal.Body>
          <Modal.Body>
            <Form.Select aria-label="Default select example">
              <option>Select Cohort Difficulty</option>
              <option value="8">8 Kyu</option>
              <option value="7">7 Kyu</option>
              <option value="6">6 Kyu</option>
              <option value="5">5 Kyu</option>
              <option value="4">4 Kyu</option>
              <option value="3">3 Kyu</option>
              <option value="2">2 Kyu</option>
              <option value="1">1 Kyu</option>
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Cohort</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <Form.Label htmlFor="CohortName">Enter a Cohort Name</Form.Label>
              <Form.Control
                type="text"
                id="EnterCohortName"
                placeholder="Enter Cohort"
                aria-describedby="CohortName"
              />
            </>
          </Modal.Body>
          <Modal.Body>
            <Form.Select aria-label="Default select example">
              <option>Select Cohort Difficulty</option>
              <option value="8">8 Kyu</option>
              <option value="7">7 Kyu</option>
              <option value="6">6 Kyu</option>
              <option value="5">5 Kyu</option>
              <option value="4">4 Kyu</option>
              <option value="3">3 Kyu</option>
              <option value="2">2 Kyu</option>
              <option value="1">1 Kyu</option>
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose2}>
              Save Updates To Cohort
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
