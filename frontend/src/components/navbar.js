import React from 'react';
import {Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

function Mynavbar(props) {
    return (
        <div>
            <Navbar bg="light" variant="light">
            <Navbar.Brand href={`/${props.name}`}>{props.name}</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/menu">Menu</Nav.Link>
                <Nav.Link href="/recipe">Recipe</Nav.Link>
                <Nav.Link href="/add">Add Recipe</Nav.Link>
                <Nav.Link href="/search">Recipe Online</Nav.Link>
            </Nav>
            </Navbar>
      </div>
    );
}

export default Mynavbar;