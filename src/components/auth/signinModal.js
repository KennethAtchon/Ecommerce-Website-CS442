import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { signIn } from '../../actions/authActions';
import LoadingSpinner from '../loading/loadingSpinner';


const SignInModal = ({ show , onHide, signupfunction, forgotpassfunction}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }else{

      setValidated(true);
      setIsLoading(true);

      dispatch(signIn(email, password))
      .then(() => {
        // Sign-up was successful, perform actions like clearing input fields and hiding modals
        
        localStorage.removeItem("shippingInfo")
        setEmail('');
        setPassword('');
        onHide();

      })
      .catch((error) => {
        // Handle the error here (e.g., show an error message to the user)
        console.error('Sign-in failed:', error);
      }).finally(()=> {
        setIsLoading(false);
      })

      setValidated(false);

    }



  };


  return (
    <Modal show={show} onHide={onHide}>        
    { isLoading ? (
        <LoadingSpinner viewport={'30vh'} />
        ): (
      <Form noValidate validated={validated} onSubmit={handleSignIn}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
            You have entered an incorrect email or passowrd.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
            You have entered an incorrect email or passowrd.
            </Form.Control.Feedback>
          </Form.Group>

        
      </Modal.Body>
      <Modal.Footer>

        <Button variant='link'         
        onClick={() => {
            signupfunction(); // Call the function from navbar.js
            onHide(); // Close the modal
          }}>
            Don't have an account?</Button>

          <Button variant='link'
        onClick={() => {
          forgotpassfunction(); // Call the function for Forgot Password
          onHide(); // Close the modal
        }}
        >
          Forgot Password?
        </Button>

        <Button variant="primary" type='submit'>
          Sign In
        </Button>
      </Modal.Footer>
      </Form>
              )}
    </Modal>
  );
};

export default SignInModal;
 