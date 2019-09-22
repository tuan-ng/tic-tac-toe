import React from "react";
import "./Game.css";

import Board from "./Board";

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const determineWinner = squares => {
  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { who: squares[a], win: wins[i] };
    }
  }
  return null;
};

const determineDraw = (squares, next) => {
  let left = wins.length;
  let last, j; // when there's only one win line left, get its index and content
  let a, b, c;
  for (let i = 0; i < wins.length; i++) {
    [a, b, c] = wins[i];
    const status = [squares[a], squares[b], squares[c]];
    if (status.includes("X") && status.includes("O")) {
      left--;
    } else {
      j = i;
    }
  }
  if (left === 1) {
    [a, b, c] = wins[j];
    last = [squares[a], squares[b], squares[c]];
  }
  const n = last ? last.filter(s => !s).length : null;
  const m = squares.filter(s => !s).length;
  return (
    left === 0 ||
    (left === 1 && ((n > 1 && m <= 2) || (n === m && !last.includes(next))))
  );
};

// ========================================================

class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
        next: "X"
      }
    ],
    stepNumber: 0
  };

  squareClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (
      determineWinner(squares) || // if there's a winner or a draw no future click
      squares[i] || // is possible; no double-click on a square
      determineDraw(squares, current.next)
    ) {
      return;
    }

    squares[i] = current.next === "X" ? "X" : "O";
    this.setState({
      history: [
        ...history,
        {
          squares: squares,
          next: current.next === "X" ? "O" : "X"
        }
      ],
      stepNumber: history.length
    });
  };

  jumpTo = step => {
    this.setState({
      stepNumber: step
    });
  };

  render() {
    const current = this.state.history[this.state.stepNumber];
    const winner = determineWinner(current.squares);
    const drawn = determineDraw(current.squares, current.next);

    let status,
      hl = null; // hl has the indices of the squares to be highlighted
    if (winner) {
      let { who, win } = winner;
      hl = win;
      status = "Winner: " + who;
    } else if (!drawn) {
      status = "Next player: " + (current.next === "X" ? "X" : "O");
    } else {
      status = "A draw!";
    }

    const moves = this.state.history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            hl={hl}
            squares={current.squares}
            onClick={i => this.squareClick(i)}
          />
        </div>

        <div className="game-info">
          <div> {status} </div>
          <ol> {moves} </ol>
        </div>
      </div>
    );
  }
}

export default Game;
