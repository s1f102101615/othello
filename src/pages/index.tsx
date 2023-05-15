import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  //
  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ];
  //
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    //これから予測
    for (let tate=0 ; tate<7;tate++) {
      for (let yoko = 0 ; yoko<7;yoko++)  {
        if (board[tate][yoko] === 0) {
          for (let t = 0; t < directions.length; t++) {
            console.log(Math.max(yoko + directions[t][1], 0), Math.max(tate + directions[t][0], 0));
            if (
              board[Math.min(Math.max(tate + directions[t][0], 0), 7)][
                Math.max(yoko + directions[t][1], 0)
              ] !== undefined &&
              board[Math.min(Math.max(tate + directions[t][0], 0), 7)][
                Math.max(yoko + directions[t][1], 0)
              ] !== 0 &&
              board[Math.min(Math.max(tate + directions[t][0], 0), 7)][
                Math.max(yoko + directions[t][1], 0)
              ] !== turnColor
            ) {
              if (
                board[Math.min(Math.max(tate + directions[t][0], 0), 7)][
                  Math.max(yoko + directions[t][1], 0)
                ] !== turnColor
              ) {
                for (let p = 2; p < 8; p++) {
                  if (
                    board[tate + directions[t][0] * p] === undefined ||
                    board[yoko + directions[t][1] * p] === undefined ||
                    board[tate + directions[t][0] * p][yoko + directions[t][1] * p] === 0
                  ) {
                    break;
                  }
                  if (board[tate + directions[t][0] * p][yoko + directions[t][1] * p] === turnColor) {
                    newBoard[tate][yoko] = 3
                  }
                }
              }}
      }
    }
    //周囲一マスに違う色の駒が無いと置けない 一行目は押した場所に駒があるかどうか
    if (board[y][x] === 0) {
      for (let t = 0; t < directions.length; t++) {
        console.log(Math.max(x + directions[t][1], 0), Math.max(y + directions[t][0], 0));
        if (
          board[Math.min(Math.max(y + directions[t][0], 0), 7)][
            Math.max(x + directions[t][1], 0)
          ] !== undefined &&
          board[Math.min(Math.max(y + directions[t][0], 0), 7)][
            Math.max(x + directions[t][1], 0)
          ] !== 0 &&
          board[Math.min(Math.max(y + directions[t][0], 0), 7)][
            Math.max(x + directions[t][1], 0)
          ] !== turnColor
        ) {
          if (
            board[Math.min(Math.max(y + directions[t][0], 0), 7)][
              Math.max(x + directions[t][1], 0)
            ] !== turnColor
          ) {
            let turn = 2;
            for (let p = 2; p < 8; p++) {
              if (
                board[y + directions[t][0] * p] === undefined ||
                board[x + directions[t][1] * p] === undefined ||
                board[y + directions[t][0] * p][x + directions[t][1] * p] === 0
              ) {
                break;
              }
              if (board[y + directions[t][0] * p][x + directions[t][1] * p] === turnColor) {
                console.log('aa');
                newBoard[y][x] = turnColor;
                for (let now = 1; now < turn; now++) {
                  console.log(now);
                  newBoard[y + directions[t][0] * (p - now)][x + directions[t][1] * (p - now)] =
                    turnColor;
                }

                setTurnColor(3 - turnColor);
              }
              turn++;
            }
          }
        }
      }
      //
      //if (board[y + 1] !== undefined && board[y + 1][x] !== 0 && board[y + 1][x] !== turnColor) {
      //  newBoard[y][x] = turnColor;
      //  setTurnColor(3 - turnColor);
      //}

      setBoard(newBoard);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : (color === 3 ? '#ccff00' : '#fff') }}


                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
