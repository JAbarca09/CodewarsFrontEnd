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
import { getUserByUsername, checkToken, updateCohort} from "../Services/DataContext";
import { useNavigate } from "react-router";
import { getUsersByCohortName, updateUser, getallCohorts, getCohortByCohortName, createCohort } from "../Services/DataContext";
// import 'bootstrap/dist/css/bootstrap.min.css';

//The edit cohort button will only display when a cohort has been selected, use a ternary operator
export default function AdminCreateCohort() {
  
  let navigate = useNavigate();
  let {
    userItems,
    kataDifficulty,
    setKataDifficulty
  } = useContext(UserContext);

  const [selectCohort, setSelectCohort] = useState("");
  const [selectCohortRank, setSelectCohortRank] = useState("");
  const [displayUsers, setDisplayUsers] = useState([]);
  const [editCohort, setEditCohort] = useState({});
  const [allCohorts, setAllCohorts] = useState([]);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  
  const handleClose = () => setShow(false);
  
  
  const handleShow = async () => {
    setShow(true);
    let displayRank = await getCohortByCohortName(selectCohort);
    //console.log(displayRank[0].cohortLevelOfDifficulty)
    setKataDifficulty(displayRank[0].cohortLevelOfDifficulty);
    setEditCohort(displayRank[0]);

  }
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  
  const handleCohortSelect = async (e) => {
    setSelectCohort(e.target.value);
    let cohort = e.target.value;
    let seasonUsers = await getUsersByCohortName(cohort);
    setDisplayUsers(seasonUsers);
    //console.log(seasonUsers);
  }
  
  const [cohortRank, setCohortRank] = useState("");
  const handleCohortRank = async (e) => {
    setSelectCohortRank(e.target.value);
    setCohortRank(e.target.value);
  }
  const [cohortNames, setCohortNames] = useState("");
  
  useEffect(async () => {
    if (!checkToken()) {
      navigate("/login");
    } else {
      
      if(!userItems.isAdmin){
        navigate("/dashboard")
      };
      let displayCohorts = await getallCohorts();
      setAllCohorts(displayCohorts);
    }
  }, []);


  const handleCohort = async () => {  
    setShow2(false);
    const AdminMadeCohort = {
      Id: 0,
      CohortName: cohortNames,
      CodeWarName: userItems.codeWarName,
      CohortLevelOfDifficulty: cohortRank,
      DateCreated: new Date(),
      IsArchived: false,
    };
    let results = await createCohort(AdminMadeCohort);
    //console.log(results);
};

  const handleEditCohort = async () => {  
    setShow(false);
    const AdminMadeCohort = {
      Id: editCohort.id,
      CohortName: selectCohort,
      CodeWarName: userItems.codeWarName,
      CohortLevelOfDifficulty: kataDifficulty,
      DateCreated: new Date(),
      IsArchived: false,
    };
  let results = await updateCohort(AdminMadeCohort);
  //console.log(results);
};

  const handleChangeRole = async (item) => {
    item.isAdmin = !item.isAdmin;
    let result = await  updateUser(item.id, item.codeWarName, item.cohortName, item.isAdmin, item.isDeleted);
    if(result){
      let updatedUsers = await getUsersByCohortName(item.cohortName);
      setDisplayUsers(updatedUsers);
    }
  } 

  const handleDelete = async (item) => {
    item.isDeleted = !item.isDeleted;
    let result = await  updateUser(item.id, item.codeWarName, item.cohortName, item.isAdmin, item.isDeleted);
    if(result){
      let updatedUsers = await getUsersByCohortName(item.cohortName);
      setDisplayUsers(updatedUsers);
    }
  }

  return (
    <>
      <Navigation />
      <Container fluid className="backgroundColor">
        <Row className="pt-4 d-flex justify-content-center">
          <Col md={4}>
            <Form.Select onChange={handleCohortSelect} aria-label="Default select example">
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
                {
                  displayUsers.map((user, id) => {
                    return !user.isDeleted ? (
                      <>
                      {
                         
                          <tr className="text-center"  key={id}>
                        <td>{id+1}</td>
                        <td>{user.codeWarName}</td>
                        {
                          user.isAdmin ? <td>Admin</td> : <td>Student</td>
                        }
                        <td>
                          <Button variant="success" onClick={() => handleChangeRole(user)}>Change Role</Button>
                        </td>
                        <td>
                          <Button variant="danger" onClick={() => handleDelete(user)}>Delete User</Button>
                        </td>
                      </tr>
                         
                      } 
                      </>
                    ) : null
                  })
                }
                
              </tbody>
            </Table>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {selectCohort}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <Form.Label htmlFor="CohortName">Edit Cohort Name</Form.Label>
              <Form.Control
                type="text"
                id="EnterCohortName"
                placeholder="Enter Cohort"
                aria-describedby="CohortName"
                onChange={(e) => setSelectCohort(e.target.value)}
                value={selectCohort}
              />
            </>
          </Modal.Body>
          <Modal.Body>
            <Form.Select aria-label="Default select example" onChange={(e) => setKataDifficulty(e.target.value)} value={kataDifficulty}>
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
            <Button variant="primary" onClick={handleEditCohort}>
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
                onChange={(e) => setCohortNames(e.target.value)}
              />
            </>
          </Modal.Body>
          <Modal.Body>
            <Form.Select aria-label="Default select example" onChange={handleCohortRank}>
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
            <Button variant="primary" onClick={handleCohort}>
              Create Cohort
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
