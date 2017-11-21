import React, { Component } from 'react'
import { connect } from 'react-redux';

const Start = (props) => {
  return(
    <div className="main-container">
      <div className="button"><h2>START GAME</h2></div>
      <div className="button"><h2>JOIN GAME</h2></div>
    </div>
  )
}

export default Start
