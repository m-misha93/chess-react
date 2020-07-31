import React, {Component} from 'react';
import Chess from 'chess.js';

import {Chessboard, INPUT_EVENT_TYPE, MOVE_INPUT_MODE, COLOR} from "cm-chessboard"

import "./styles/page.css"
import "./styles/cm-chessboard.css"

class WithMoveValidation extends Component {
  constructor() {
    super();
    this.state = {
      fen: 'start',
      history: [],
    };
  }

  componentDidMount() {
    this.game = new Chess();

    const board = new Chessboard(document.getElementById("board"), {
      position: this.game.fen(),
      orientation: COLOR.white,
      moveInputMode: MOVE_INPUT_MODE.dragPiece,
      responsive: true,
      sprite: {
        url: "./chessboard-sprite.svg", // pieces and markers are stored as svg in the sprite
        grid: 40 // the sprite is tiled with one piece every 40px
      }
    });
    board.enableMoveInput(this.inputHandler);
  }

  inputHandler = (event) => {
    if (event.type === INPUT_EVENT_TYPE.moveDone) {

      const move = this.game.move({
        from: event.squareFrom,
        to: event.squareTo,
        promotion: 'q',
      });

      if (move === null) return;

      this.setState(() => ({
        fen: this.game.fen(),
        history: this.game.history({verbose: true}),
      }));

      setTimeout(() => {
        event.chessboard.setPosition(this.game.fen())
      })
    }
  };

  render() {

    return (
      <div
        id='board'
        style={{
          float: "left",
          maxWidth: '80vh',
          maxHeight: '80vh',
          width: `calc(100vw - 40px)`,
          height: `calc(95vw - 40px)`,
          marginRight: '20p',
          marginBottom: '20px'
        }}
      >
      </div>

    );
  }
}

export default WithMoveValidation;

