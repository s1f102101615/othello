import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
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
    console.log(turnColor);
    //周囲一マスに違う色の駒が無いと置けない 一行目は押した場所に駒があるかどうか
    if (board[y][x] === 3) {
      for (let t = 0; t < directions.length; t++) {
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
                newBoard[y][x] = turnColor;
                for (let now = 1; now < turn; now++) {
                  newBoard[y + directions[t][0] * (p - now)][x + directions[t][1] * (p - now)] =
                    turnColor;
                }
                const enemyColor = 3 - turnColor;
                setTurnColor(3 - turnColor);
                setBoard(newBoard);
                //処理完了(予測開始)
                console.log(enemyColor);
                for (let tate = 0; tate < 8; tate++) {
                  for (let yoko = 0; yoko < 8; yoko++) {
                    if (newBoard[tate][yoko] === 3) {
                      newBoard[tate][yoko] = 0;
                    }
                    if (newBoard[tate][yoko] === 0) {
                      for (let t = 0; t < directions.length; t++) {
                        if (
                          newBoard[Math.min(Math.max(tate + directions[t][0], 0), 7)][
                            Math.max(yoko + directions[t][1], 0)
                          ] !== undefined &&
                          newBoard[Math.min(Math.max(tate + directions[t][0], 0), 7)][
                            Math.max(yoko + directions[t][1], 0)
                          ] !== 0 &&
                          newBoard[Math.min(Math.max(tate + directions[t][0], 0), 7)][
                            Math.max(yoko + directions[t][1], 0)
                          ] !== enemyColor &&
                          newBoard[Math.min(Math.max(tate + directions[t][0], 0), 7)][
                            Math.max(yoko + directions[t][1], 0)
                          ] !== 3
                        ) {
                          if (
                            newBoard[Math.min(Math.max(tate + directions[t][0], 0), 7)][
                              Math.max(yoko + directions[t][1], 0)
                            ] !== enemyColor
                          ) {
                            for (let p = 2; p < 8; p++) {
                              if (
                                newBoard[tate + directions[t][0] * p] === undefined ||
                                newBoard[yoko + directions[t][1] * p] === undefined ||
                                newBoard[tate + directions[t][0] * p][
                                  yoko + directions[t][1] * p
                                ] === 0
                              ) {
                                break;
                              }
                              if (
                                newBoard[tate + directions[t][0] * p][
                                  yoko + directions[t][1] * p
                                ] === enemyColor
                              ) {
                                newBoard[tate][yoko] = 3;
                              }
                              setBoard(newBoard);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              turn++;
            }
          }
        }
      }

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
                  style={{ background: color === 1 ? '#000' : color === 3 ? '#ccff00' : '#fff' }}
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
