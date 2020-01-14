import React, { Component } from "react";
import "./App.css";

import { fillBoardRandomly, getNextBoard } from './game';

function Cell({ isAlive, children, width = "33.33333%" }) {
  return (
    <div className={`cell ${isAlive ? 'alive' : ''}`} style={{ width, height: '30px' }}>
      {children}
    </div>
  );
}

function Row({ rowData, width }) {
  const arrayToReturn = [];
  for (let index = 0; index < rowData.length; index++) {
    const isAlive = rowData[index] === 1;
    arrayToReturn.push(<Cell key={index} isAlive={isAlive} width={`calc(100% / ${width})`}>1</Cell>);    
  }
  return arrayToReturn;
}

function Board({ board, width }) {
  return (
    <div className="board">
      {board.map((row, index) => {
        return <Row key={index} width={width} rowData={row}></Row>
      })}
    </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = { board: fillBoardRandomly(10) }
  }
  updateBoard = () => {
    this.setState({ board: getNextBoard(this.state.board)})
  }

  componentDidMount() {
    setInterval(() => {
      this.updateBoard();
    }, 1000)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Board board={this.state.board} width={10} />
        </header>
      </div>
    );
  }
}

export default App;
