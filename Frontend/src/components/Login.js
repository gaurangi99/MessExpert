import React from 'react';
import {Card, CardBody, CardFooter, CardTitle, Container, Form, FormGroup, Input, Label} from "reactstrap";

const Login = ({handleLogin, errorMessage}) => {

  return (
      <Container data-testid="login-container"
       style={{marginTop:100,width:"30%"}}>
        <Card style={{backgroundColor: "#212529"}}>
          <Form onSubmit={handleLogin} data-testid="login-form">
            <CardBody style={{color:"#cccccc"}}>
              <h1 style={{color:"#cccccc"}} align="center"> Login </h1>
              <hr/>
              <FormGroup className="mb-3">
                <Label htmlFor="username"><b>User Name</b></Label>
                <Input type="text" placeholder="Enter Username" name="username" id="username" data-testid="username-input"/>
              </FormGroup>

              <FormGroup className="mb-3">
                <Label htmlFor="password"><b>Password</b></Label>
                <Input type="password" placeholder="Password" name="password" id="password" data-testid="password-input"/>
              </FormGroup>
              <FormGroup check className="mb-3">
                <Input type="checkbox" data-testid="remember-me-checkbox" id='remember-me'/>
                <Label htmlFor="remember-me"><b>Remember Me</b></Label>
              </FormGroup>
              {errorMessage && <p style = {{
                color:"red"}} data-testid="error-message"> {errorMessage}</p>}
              <Input type="submit" className="btn btn-primary" defaultValue="Login" data-testid="submit-button"/>

            </CardBody>
          </Form>
        </Card>
      </Container>
  );
};

export default Login;
