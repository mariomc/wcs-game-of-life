/*
    Any live cell with two or three neighbors survives.
    Any dead cell with three live neighbors becomes a live cell.
    All other live cells die in the next generation. Similarly, all other dead cells stay dead.

    const board = [
        [0,0,1], 
        [0,1,0],
        [1,1,0]
    ]

*/

const nextCellState = (aliveNeighbors, isAlive) => {
  if (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
    return 1; // 1 means alive
  }
  if (!isAlive && aliveNeighbors === 3) {
    return 1;
  }
  return 0;
};

const safeGet = (arr, index) => {
  if (arr && arr[index]) {
    return arr[index];
  }
  return 0;
};

const getNeighbors = (board, x, y) => {
  return [
    safeGet(board[x - 1], y - 1), // -1,-1
    safeGet(board[x - 1], y), // -1,0
    safeGet(board[x - 1], y + 1), // -1,+1
    safeGet(board[x], y - 1), // 0,-1
    // safeGet(board[x], y),
    safeGet(board[x], y + 1), // 0,+1
    safeGet(board[x + 1], y - 1), // +1,-1
    safeGet(board[x + 1], y), // +1,0
    safeGet(board[x + 1], y + 1) // +1,+1
  ];
};

const countNeighbors = neighbors =>
  neighbors.reduce((prev, curr) => prev + curr, 0);

const getNextBoard = board => {
  const newBoard = [];
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    const newRow = [];
    for (let j = 0; j < row.length; j++) {
      const currentCell = board[i][j];
      const numNeighbors = countNeighbors(getNeighbors(board, i, j));
      const newCellState = nextCellState(numNeighbors, currentCell === 1);
      newRow.push(newCellState);
    }
    newBoard.push(newRow);
  }
  return newBoard;
};

const getRandomNumber = max => Math.round(Math.random() * max);

const fillBoardRandomly = size => {
  const board = [];

  for (let i = 0; i < size; i++) {
    const newRow = [];
    for (let j = 0; j < size; j++) {
      newRow.push(getRandomNumber(1));
    }
    board.push(newRow);
  }
  return board;
};

export const jogo = () => {
  let board = fillBoardRandomly(getRandomNumber(30));

  for (let index = 1; index <= 10; index++) {
    board = getNextBoard(board);
    console.log(`Geração ${index}:`, board);
  }

  //   console.log("Está cá qualquer coisa");
};
