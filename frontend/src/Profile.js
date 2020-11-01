import React, { Component } from 'react'
import pic from './p.png'
import UserProfile from 'react-user-profile'

class App extends Component {
  render() {
    const photo = pic
    const userName = 'Johnny Zhou'
    const location = 'Illinois, USA'

    return (
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
    )
  }
}

export default App