import React, { useState, memo } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import { loginUserRequest } from "../../redux/actions";
import {ROUTES_CONSTANTS} from "../../utils/routerConstants";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [buttonDisabled, setButtonDisable] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (email && password) {
      dispatch(loginUserRequest({ email, password }));
    }
  }

  const onRegisterClick = () => {
    history.push(ROUTES_CONSTANTS.register);
  }

  const isValid = true;

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  return (
    <Row className="my-5">
      <Col md={{ size: 4, offset: 4 }}>
      <Form>
        <FormGroup>
          <Label for="loginEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="loginEmail"
            placeholder="Email"
            onChange={onEmailChange}
            value={email}
          />
        </FormGroup>
        <FormGroup>
          <Label for="loginPassword">Password</Label>
          <Input
            type="password"
            name="email"
            id="loginPassword"
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
          />
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button
            color="secondary"
            onClick={onRegisterClick}
          >
            Registration
          </Button>
          <Button
            color="primary"
            className="ml-2"
            disabled={!isValid}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
      </Col>
    </Row>
  );
}

export default memo(Login);
