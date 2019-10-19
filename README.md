# Tic-Tac-Toe

This post illustrates building a tic-tac-toe game using React (with
**create-react-app**). The post is inspired by a [tutorial](https://reactjs.org/tutorial/tutorial.html)
by **DanAbramov**. It implements, with some
changes, what are discussed in the tutorial; in addition, it includes some of
the suggested practice problems mentioned in the tutorial.

We want to build a tic-tac-toe game that keeps track of all
the moves for us and is able to jump to the state
associated with a particular move (time travel).

Some of the subtle points include handling properly clicks on squares.
`stepNumber` (in `Game`) keeps track of the current step in `history`
(in `Game`) and when there's
a time travel (which means `stepNumber` is not at the latest point in `history`),
all future history has to be discarded.

Play the game [here](https://tuan-ng.github.io/tic-tac-toe/)!

### Highlighting a winner

A win is all `'X'` or all `'O'` in one of the following
configurations

```javasript
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
```

If a win has been detected, we highlight the win line as shown in the
figure below (the win line here is `[0, 4, 8]`).

![a win](/images/win.png)

### Declaring a draw

It's simple if we just want to declare a draw after all the
squares have been clicked. We may write for example:

```javascript
// Inside Game
render() {
  const current = this.state.history[this.state.stepNumber];
  const winner = determineWinner(current.squares);
  const full = current.squares.every(s => s);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!full) {
    status = 'Next player: ' + (current.next === 'X' ? 'X' : 'O');
  } else {
    status = 'A draw!';
  }
```

However, we want to do a little better, i.e. being able to
declare a draw before all the squares have been clicked.
The logic is shown in the function `determineDraw` (`Game.js`).
The idea is
that a draw is predicted when there's no win line left, or
when there's only one win line left
and it's not possible to cover the line with all `'X'` or all
`'O'` anymore. This means one of the three possible situations:

- All three squares in the line have not been clicked, and there are
  not over three more clicks allowed, or
- Two among three squares in the line have not been clicked, and
  there are not over two more clicks allowed, or
- There's only one square in the line that has not been clicked, and
  there's only one click left, but the click is of the opposite kind
  with that of those that have already been on the line.

The figure shows an example.

![a draw](/images/draw.png)
