import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [blackCount, setBlackCount] = useState(2);
  const [whiteCount, setWhiteCount] = useState(2);
  const [pass, setPass] = useState(1);
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
  let blackcount = 0;
  let whitecount = 0;
  const onClick = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    //周囲一マスに違う色の駒が無いと置けない 一行目は押した場所に駒があるかどうか
    if (board[y][x] === 3) {
      for (const d of directions) {
        if (
          board[y + d[0]] !== undefined &&
          board[y + d[0]][x + d[1]] !== undefined &&
          board[y + d[0]][x + d[1]] !== 0 &&
          board[y + d[0]][x + d[1]] !== turnColor
        ) {
          if (board[y + d[0]][x + d[1]] !== turnColor && board[y + d[0]][x + d[1]] !== 3) {
            let turn = 2;
            for (let p = 2; p < 8; p++) {
              if (
                board[y + d[0] * p] === undefined ||
                board[y + d[0] * p][x + d[1] * p] === undefined ||
                board[y + d[0] * p][x + d[1] * p] === 0 ||
                board[y + d[0] * p][x + d[1] * p] === 3
              ) {
                break;
              }
              if (board[y + d[0] * p][x + d[1] * p] === turnColor) {
                newBoard[y][x] = turnColor;
                for (let now = 1; now < turn; now++) {
                  newBoard[y + d[0] * (p - now)][x + d[1] * (p - now)] = turnColor;
                }
              }
              turn++;
            }
          }
        }
      }
      const enemyColor = 3 - turnColor;
      setTurnColor(3 - turnColor);
      setBoard(newBoard);
      //処理完了(予測開始)

      for (let tate = 0; tate < 8; tate++) {
        for (let yoko = 0; yoko < 8; yoko++) {
          if (newBoard[tate][yoko] === 3) {
            newBoard[tate][yoko] = 0;
          }
          if (newBoard[tate][yoko] === 0) {
            for (const d of directions) {
              if (
                newBoard[tate + d[0]] !== undefined &&
                newBoard[tate + d[0]][yoko + d[1]] !== undefined &&
                newBoard[tate + d[0]][yoko + d[1]] === 3 - enemyColor
              ) {
                if (newBoard[tate + d[0]][yoko + d[1]] !== enemyColor) {
                  for (let p = 2; p < 8; p++) {
                    if (
                      newBoard[tate + d[0] * p] === undefined ||
                      newBoard[tate + d[0] * p][yoko + d[1] * p] === undefined ||
                      newBoard[tate + d[0] * p][yoko + d[1] * p] === 3 ||
                      newBoard[tate + d[0] * p][yoko + d[1] * p] === 0
                    ) {
                      break;
                    }
                    if (newBoard[tate + d[0] * p][yoko + d[1] * p] === enemyColor) {
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
      if (!newBoard.some((row) => row.includes(3))) {
        console.log('パスです');
        setPass(2);
        setBoard(newBoard);
        setTurnColor(turnColor);
        for (let tate = 0; tate < 8; tate++) {
          for (let yoko = 0; yoko < 8; yoko++) {
            if (newBoard[tate][yoko] === 3) {
              newBoard[tate][yoko] = 0;
            }
            if (newBoard[tate][yoko] === 0) {
              for (const d of directions) {
                if (
                  newBoard[tate + d[0]] !== undefined &&
                  newBoard[tate + d[0]][yoko + d[1]] !== undefined &&
                  newBoard[tate + d[0]][yoko + d[1]] === 3 - turnColor
                ) {
                  if (newBoard[tate + d[0]][yoko + d[1]] !== turnColor) {
                    for (let p = 2; p < 8; p++) {
                      if (
                        newBoard[tate + d[0] * p] === undefined ||
                        newBoard[tate + d[0] * p][yoko + d[1] * p] === undefined ||
                        newBoard[tate + d[0] * p][yoko + d[1] * p] === 0
                      ) {
                        break;
                      }
                      if (newBoard[tate + d[0] * p][yoko + d[1] * p] === turnColor) {
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
      window.setTimeout(function () {
        setPass(1);
      }, 3000);
      for (let p = 0; p < 8; p++) {
        blackcount += newBoard[p].filter((element) => element === 1).length;
        whitecount += newBoard[p].filter((element) => element === 2).length;
      }
      setBlackCount(blackcount);
      setWhiteCount(whitecount);

      if (!newBoard.some((row) => row.includes(3))) {
        console.log('試合終了');
      }

      setBoard(newBoard);
    }
  };

  return (
    <div className={styles.container}>
      <a className={styles.turn}>現在{turnColor === 1 ? '黒' : '白'}のターンです</a>
      <div className={styles.black}>
        <a className={styles.blackname}>黒{blackCount}個</a>
      </div>
      <div className={styles.white}>
        <a className={styles.whitename}>白{whiteCount}個</a>
      </div>
      <div className={styles.board}>
        <div className={styles.pass} style={{ opacity: pass === 2 ? 1 : 0 }}>
          <h1>パス</h1>
        </div>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{
                    background: color === 1 ? '#000' : color === 3 ? '#ccff00' : '#fff',
                    width: color === 3 ? '20%' : '90%',
                    height: color === 3 ? '20%' : '90%',
                  }}
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
