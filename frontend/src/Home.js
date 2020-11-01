import React from 'react';
import {Navbar, Nav, Form, FormControl, Button, Card, CardDeck} from "react-bootstrap";
import p1 from "./images/p1.jpg";
import p2 from "./images/p2.jpg";
import p3 from "./images/p3.jpg";

 function Home() {
     return (
       <div>
         <div>
          <Navbar bg="light" variant="light">
            <Navbar.Brand href="/home">Home</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Navbar>
        </div>

        <div className="container-fluid mt-4">
          <CardDeck>
            <Card style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '15rem' }}>
              <Card.Img variant="top" src={p1} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>

            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '15rem' }}>
              <Card.Img variant="top" src={p2} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>

            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '15rem' }}>
              <Card.Img variant="top" src={p3} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </CardDeck>
        </div>
      </div>
     );

 }

 export default Home;