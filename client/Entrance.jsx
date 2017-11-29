import React from 'react'
import spyImage from '../images/spyBluePicTwo.jpg'
import { Link } from 'react-router-dom'

const Entrance = (props) => {
  return (
    <div>
      <img src={spyImage} className="main-image" />
      <Link to="/home">
        <div className="button">Join the agency</div>
      </Link>
    </div>
  )
}

export default Entrance
