import React, { useState, memo } from 'react'
import { useDispatch } from 'react-redux';
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap';
import {loginUserRequest, registrationUserRequest} from "../../redux/actions";

const Registration = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [buttonDisabled, setButtonDisable] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (email && password) {
      dispatch(registrationUserRequest({ email, password }));
    }
  }

  const isValid = true;

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

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
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={onPasswordChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="repeatPassword">Confirm password</Label>
            <Input
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
            />
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button
              color={isValid ? "primary" : "secondary"}
              disabled={!isValid}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default memo(Registration);
