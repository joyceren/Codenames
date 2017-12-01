import React from 'react'

export default function({status, resetGame}) {
  var className, message;
  if(status==="red") {
    message="Team Red has succeeded in finding all their members!"
    className="redWin"
  }
  if(status==="blue") {
    message="Team Blue has succeeded in finding all their members!"
    className="blueWin"
  }
  if(status==="red-killed") {
    message="Team Red has been assassinated"
    className="assassinated"
  }
  if(status==="blue-killed") {
    message="Team Red has been assassinated"
    className="assassinated"
  }
  else {
    console.log(status)
    message = status
    className = "assassinated"
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
