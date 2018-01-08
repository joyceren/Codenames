import React from 'react'

export default function({status, resetGame}) {
  var className = "assassinated"
  var message;
  switch(status){
    case "red":
      message="Team Red has succeeded in finding all their members!"
      className="redWin"
      break;
    case "blue":
      message="Team Blue has succeeded in finding all their members!"
      className="blueWin"
      break;
    case "red-killed":
      message="Team Red has been assassinated"
      break;
    case "blue-killed":
      message="Team Blue has been assassinated"
      break;
    default:
      message = status
      break;
  }

  return (
    <div className={`endscreen ${className}`}>
      <div className="final-view"><h2>{message}</h2></div>
      <div className="button" onClick={resetGame}>
        <h2>Play Again?</h2>
      </div>
    </div>
  )
}
