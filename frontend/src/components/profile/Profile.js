import React, { Component } from 'react';
import Axios from 'axios';
import pic from '../../milktea.svg';
import Navbar from "../navbar";
import {Card, Container} from "react-bootstrap";
import MyProfile from './myProfile';

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
          birthday : res.age,
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

  handleRequest1 = () => {
    Axios.post(base_url + 'profile/delete', {
      'username' : `${localStorage.getItem('username')}`,
    })
    .then(response => {
      console.log(response)
      console.log(response.status + " " + response.statusText)
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleRequest2 = () => {
    Axios.post(base_url + 'user/delete', {
      'username' : `${localStorage.getItem('username')}`,
    })
    .then(response => {
      console.log(response)
      console.log(response.status + " " + response.statusText)
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleDeletion = () => {
    this.handleRequest1();
    this.handleRequest2();
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
  }

  render() {
    const photo = pic;
    const location = 'Illinois, USA';
    const {isUserLoggedin, userName, birthday, gender, height, weight, dieting_status} = this.state;
    return (
      <div>
        <Navbar name="profile"/>

        <div className="container-fluid mt-4">
          <Container fluid="md">
            <Card style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '60rem' }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                {isUserLoggedin && (
                  <MyProfile
                    photo={photo}
                    userName={userName}
                    location={location}
                    birthday={birthday}
                    gender={gender}
                    height={height}
                    weight={weight}
                    dieting_status={dieting_status}
                    handleDeletion={this.handleDeletion}
                    />
                )}
                {!isUserLoggedin && (
                  <Card.Text>
                    Please Login First
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Container> 
        </div> 
      </div>
    )
  }
}

export default Profile;
