import React from 'react'
import check from '../public/check.png'
import {connect} from 'react-redux'
import {db} from '../fire'

export default function Card({ word, index, handleClick, spyMaster=false }) {
  const classNames = `card ${word.color}`
  return(
    <div id={word.id} onClick={!spyMaster && handleClick} className={classNames}>
      <h2>{word.word}</h2>
      <img src={check} className={`check-${spyMaster && word.flipped}`} />
    </div>
  )
}

// const mapState = state => ({
//   spyMaster:state.spyMaster
// })

// const mapDispatch = (dispatch, {index}) => ({
//   handleClick(e){
//     const wordId = e.target.id
//     dispatch({type: 'PICK', index: index})
//     // const gameId = ownProps.gameId
//     // db.doc(`games/${gameId}/cards/${wordId}`).update("flipped", true)
//     // .then(res => {
//     //   dispatch({type:"FLIP_CARD", card: wordId})
//     // })
//   },
// })

// export default connect(mapState, mapDispatch)(Card)
