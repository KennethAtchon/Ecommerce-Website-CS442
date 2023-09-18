import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

function ProductCard() {
  const globalRating = 4.0;
  return (
    <Card style={{ width: '15rem'}}>
      <Link  to={`/product/2324`} >
      <Card.Img variant="top" src="football.jpg" alt="Product" />
      </Link>
      
      <Card.Body style={{ fontSize: '13px' }}>
        <Card.Title style={{ fontSize: '16px' }}>Product Name</Card.Title>

        <div className="rating-container">  
                <Rating
                  value={globalRating}
                  edit={false}
                  isHalf={true}
                  activeColor="#FFD700"
                /> &nbsp; {globalRating}
              </div>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula justo id.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" style={{ fontSize: '13px' }}>
        <ListGroup.Item>Price: $19.99</ListGroup.Item>
        <ListGroup.Item>Tags: Electronics, Gadgets, Sale</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <Button variant="primary" size="sm">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
