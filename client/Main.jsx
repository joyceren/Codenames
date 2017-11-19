import React, { Component } from 'react'
import Card from './Card.jsx'
import stack from '../public/stack.png'

export default class Main extends Component {

  constructor() {
    super()
    this.state={
      testArr:[
        {word: "butterfly", color: "blue", flipped: false},
        {word: "lamp", color: "blue", flipped: false},
        {word: "Germany", color: "blue", flipped: false},
        {word: "lightning", color: "blue", flipped: false},
        {word: "ladder", color: "blue", flipped: false},
        {word: "blanket", color: "blue", flipped: false},
        {word: "flag", color: "blue", flipped: false},
        {word: "grass", color: "blue", flipped: false},

        {word: "needle", color: "red", flipped: false},
        {word: "clock", color: "red", flipped: false},
        {word: "basket", color: "red", flipped: false},
        {word: "medicine", color: "red", flipped: false},
        {word: "bottle", color: "red", flipped: false},
        {word: "cabinet", color: "red", flipped: false},
        {word: "plane", color: "red", flipped: false},
        {word: "brick", color: "blue", flipped: false},

        {word: "television", color: "white", flipped: false},
        {word: "table", color: "white", flipped: false},
        {word: "squirrel", color: "white", flipped: false},
        {word: "xylophone", color: "white", flipped: false},
        {word: "orchid", color: "white", flipped: false},
        {word: "opal", color: "white", flipped: false},
        {word: "chair", color: "white", flipped: false},
        {word: "pillow", color: "white", flipped: false},
        {word: "Indiana", color: "black", flipped: false}
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({testArr: this.state.testArr.map(word => {
      return word.word===e.target.id ? {word:word.word, color:word.color, flipped: true} : word
    })})
  }

  render() {
    const {testArr}=this.state
    return(
      <div>
        <nav>
          <img src={stack} className="hamburger"/>
          <h1>CODENAMES</h1>
          <div></div>
        </nav>
        <div className="board">
        {
          testArr.map(word => {
            return (
              <Card handleClick={this.handleClick} key={word.word} word={word} />
            )
          })
        }
        </div>
      </div>
    )
  }
}
