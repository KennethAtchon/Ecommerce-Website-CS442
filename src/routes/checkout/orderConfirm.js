import React from 'react';
import AppNavbar from '../../components/navbar'; // Import the AppNavbar component
import { Container, Row, Col, Alert, Button, Card, ListGroup } from 'react-bootstrap'; // Import React Bootstrap components
import './orderConfirm.css'; // Import your custom CSS for additional styling

function OrderConfirm() {
  return (
    <div>
      <AppNavbar />

      <Container className="order-confirmation">
        <Row>
          <Col md={6} className="confirmation-message">
            <h2>Thank You for Your Order</h2>
            <p>Your order has been successfully placed.</p>
            <p>Order Confirmation Number: <span className="order-number">123456</span></p>
          </Col>
          <Col md={6}>
            <Card className="order-details-card">
              <Card.Header className="order-details-header">
                <h3>Order Details</h3>
              </Card.Header>
              <Card.Body>
                <ul>
                  <li>Item 1 - $19.99</li>
                  <li>Item 2 - $29.99</li>
                  {/* Include a list of purchased items */}
                </ul>
                <p>Total: <span className="total">$49.98</span></p>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>Shipping Address</h4>
                    <p>John Doe<br />123 Main St<br />City, State, ZIP<br />Country</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h4>Expected Delivery Date</h4>
                    <p>DD/MM/YYYY</p>
                  </ListGroup.Item>
                </ListGroup>
              
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="next-steps">
        <Row>
          <Col md={6}>
            <h3>What's Next?</h3>
            <p>An email confirmation with your order details and tracking information has been sent to your email address. You can use the provided tracking number to monitor your shipment's progress.</p>
          </Col>
          <Col md={6}>
            <Alert variant="success" className='mt-3'>
              <p>Your order is on its way!</p>
              <p>Track your order using the provided tracking number.</p>
            </Alert>
            <Button href="/">Continue Shopping</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OrderConfirm;