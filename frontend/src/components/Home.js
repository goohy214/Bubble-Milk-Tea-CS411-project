import React from 'react';
import p1 from "../images/p1.jpg";
import p2 from "../images/p2.jpg";
import p3 from "../images/p3.jpg";
import Navbar from "./navbar";
import { Button, Card, CardDeck } from "react-bootstrap";

 function Home() {
     return (
       <div>
         <Navbar name="home" />

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