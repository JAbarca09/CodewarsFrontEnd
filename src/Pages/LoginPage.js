import React, {useState, useContext} from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CodewarsLogo from "../images/codestack-logo.svg";
import { login, getUserByUsername } from "../Services/DataContext";
import UserContext from "../Context/UserContext";
import "./PagesStyle.css";
import { useNavigate } from "react-router";


export default function LoginPage() {
  let navigate = useNavigate();
  let {
    codeWarName,
    setCodeWarName,
    userItems,
    setUserItems,
  } = useContext(UserContext);

  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    let userData = {
      CodeWarName: codeWarName,
      Password: password,
    };
    console.log(userData);
    let token = await login(userData);
    if (token.token != null) {
      localStorage.setItem("Token", token.token);
      let userItems1 = await getUserByUsername(codeWarName);
      setUserItems(userItems1);
      navigate("/dashboard");
    }else{
      console.log("Not Signed In");
    }
  }; 

  return (
    <Container fluid className="backgroundColor d-flex align-items-center justify-content-center">
      <Form>
        <Row className="">
          <Col md={12} className="d-flex justify-content-center">
          <Form.Group><img src={CodewarsLogo} className="logo" /></Form.Group>
          </Col>
          <Col md={12} className="d-flex justify-content-center whiteFontjustFont">
            <h1>Kata Tracker</h1>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="whiteFont1 ms-2">Username</Form.Label>
              <Form.Control
                className="inputWidth ms-2"
                type="text"
                placeholder="Enter a Username"
                onChange={({ target }) => setCodeWarName(target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="whiteFont1 ms-2">Password</Form.Label>
              <Form.Control
                className="inputWidth ms-2"
                type="password"
                placeholder="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
          <Button variant="primary" type="button" className="ButtonStyle" onClick={handleLogin}>
              Log In
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
