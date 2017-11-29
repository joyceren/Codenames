import React from 'react'
import spyImage from '../images/spyBluePicTwo.jpg'
import { Link } from 'react-router-dom'

const Entrance = (props) => {
  return (
    <div className="main-container">
      <h1 className="main-title">CODENAMES</h1>
      <img src={spyImage} className="main-image" />
      <Link to="/home">
        <div className="start-btn button">Join the agency</div>
      </Link>
    </div>
  )
}

export default Entrance
