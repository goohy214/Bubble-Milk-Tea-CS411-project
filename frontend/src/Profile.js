import React, { Component } from 'react';
import pic from './milktea.svg';
import UserProfile from 'react-user-profile';
import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";

class Profile extends Component {
  render() {
    const photo = pic;
    const userName = 'Johnny Zhou';
    const location = 'Illinois, USA';

    return (
      <div>
        <div>
          <Navbar bg="light" variant="light">
          <Navbar.Brand href="/profile">Profile</Navbar.Brand>
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

        <div style={{ margin: '0 auto', width: '100%' }}>
          <UserProfile photo={photo} userName={userName} location={location} initialLikesCount={100} initialFollowingCount={200} initialFollowersCount={200} />
          <div style ={{margin: "20px 20px 10px 20px"}}>
            gender: male
          </div>
          <div style ={{margin: "10px 20px"}}>
            height: 5'11
          </div>
          <div style ={{margin: "10px 20px"}}>
            weight: 147 lbs
          </div>
          <div style ={{margin: "10px 20px"}}>
            dieting status: normal
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
