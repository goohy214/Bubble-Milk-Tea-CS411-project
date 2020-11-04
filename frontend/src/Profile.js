import React, { Component } from 'react';
import Axios from 'axios';
import pic from './milktea.svg';
import UserProfile from 'react-user-profile';
import Navbar from "./components/navbar";
import {Card, Container, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const base_url = 'http://127.0.0.1:8000/';
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserLoggedin : localStorage.getItem('user_id') ? true : false,
      birthday: '',
      userName: '',
      gender: '',
      height: '',
      weight: '',
      dieting_status: '',
    }
  }

  componentDidMount() {
    this.setState({userName: localStorage.getItem('username')});
    if(this.state.isUserLoggedin) {
      Axios.post(base_url + 'profile', {
        'username' : `${localStorage.getItem('username')}`,
      })
      .then(response => {
        console.log(response)
        console.log(response.status + " " + response.statusText)
        const res = response.data[0];
        this.setState({
          birthday : res.birthdate,
          gender : res.gender,
          height : res.height,
          weight : res.weight,
          dieting_status: res.dieting_status,
        });
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  render() {
    const photo = pic;
    const location = 'Illinois, USA';
    const {userName, birthday, gender, height, weight, dieting_status} = this.state;
    return (
      <div>
        <Navbar name="profile"/>

        <div className="container-fluid mt-4">
          <Container fluid="md">
            <Card style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '60rem' }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <UserProfile photo={photo} userName={userName} location={location} initialLikesCount={100} initialFollowingCount={200} initialFollowersCount={200} />
                <div style ={{margin: "20px 20px 10px 20px"}}>
                  birthday: {birthday}
                </div>
                <div style ={{margin: "20px 20px 10px 20px"}}>
                  gender: {gender}
                </div>
                <div style ={{margin: "10px 20px"}}>
                  height: {height}
                </div>
                <div style ={{margin: "10px 20px"}}>
                  weight: {weight} lbs
                </div>
                <div style ={{margin: "10px 20px"}}>
                  dieting status: {dieting_status}
                </div>
                <Link to="/edit">
                <Button variant="primary">Edit</Button>
                </Link>
              </Card.Body>
            </Card>
          </Container> 
        </div> 
      </div>
    )
  }
}

export default Profile;
