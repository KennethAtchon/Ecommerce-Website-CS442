import React, { useState } from 'react';
import { Card, Row, Col, FloatingLabel, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updatePaymentInfo } from '../../actions/orderActions';


function PaymentInformationForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [validated, setValidated] = useState(false);


  const handlePaymentInfo = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
  
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      const { cardNumber, expirationDate, cvv, cardholderName, 
        billingAddress, billingCity, billingState, billingZip } = formData;

      const paymentInfo = {
        cardNumber,
        expirationDate,
        cvv,
        cardholderName,
      };

      const billingInfo = {
        billingAddress,
        billingCity,
        billingState,
        billingZip,
      };

      dispatch(updatePaymentInfo({ userId: user ? user.user_id : undefined, billingInfo, paymentInfo}))
        
    }
  };
  

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-center align-items-center">
          Payment Information
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <Form noValidate validated={validated} onSubmit={handlePaymentInfo}>
              {/* Card Details */}
              <Row className="mb-3">
                <Col>
                  <FloatingLabel controlId="cardNumber" label="Card #" className='label-sm'>
                    <Form.Control
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="Enter card number"
                      required
                      className="label-sm"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid card number.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="expirationDate" label="Exp Date">
                    <Form.Control
                      type="text"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid expiration date.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="cvv" label="CVV">
                    <Form.Control
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="CVV"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid CVV.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="cardholderName" label="CardHolder">
                    <Form.Control
                      type="text"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="Enter cardholder name"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the cardholder's name.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              {/* Billing Address */}
              <Row className="mb-3">
                <Col>
                  <FloatingLabel controlId="billingAddress" label="Billing Address">
                    <Form.Control
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      placeholder="Enter billing address"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the billing address.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              {/* Billing City, State, and ZIP Code */}
              <Row className="mb-3">
                <Col>
                  <FloatingLabel controlId="billingCity" label="City">
                    <Form.Control
                      type="text"
                      name="billingCity"
                      value={formData.billingCity}
                      onChange={handleInputChange}
                      placeholder="Enter billing city"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the billing city.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="billingState" label="State">
                    <Form.Control
                      type="text"
                      name="billingState"
                      value={formData.billingState}
                      onChange={handleInputChange}
                      placeholder="Enter billing state"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the billing state.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="billingZip" label="ZIP">
                    <Form.Control
                      type="text"
                      name="billingZip"
                      value={formData.billingZip}
                      onChange={handleInputChange}
                      placeholder="Enter billing ZIP code"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid billing ZIP code.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>

              {/* Accepted Payment Cards */}
              <Row className="mb-3">
              <Col>
                <p>Accepted Payment Cards:</p>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <img src="/images/visa.png" alt="Visa" style={{ height: '30px' }} />              
                <img src="/images/mastercard.png" alt="Master Card" style={{ height: '40px' }} />
              <img src="/images/amex.png" alt="American Express" style={{ height: '40px' }} />

            </div>

              </Col>
            </Row>
              {/* Submit Button */}
              <Row>
                <Col className="d-flex justify-content-center py-3">
                  <Button type="submit" variant="primary">
                    Submit Payment
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default PaymentInformationForm;
