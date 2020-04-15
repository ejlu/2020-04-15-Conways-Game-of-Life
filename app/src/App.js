import React from 'react'
import Board from './Board'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      game: new Board(25, 25),
      playInterval: null,
    }
    this.click = this.click.bind(this)
    this.step = this.step.bind(this)
    this.play = this.play.bind(this)
    this.randomize = this.randomize.bind(this)
    this.clear = this.clear.bind(this)
  }

  click(event) {
    const aliveState = event.target.className
    const coord = event.target.getAttribute('dataset').split(',')
    const row = +coord[0]
    const col = +coord[1]
    if (aliveState === 'alive') {
      //tbd
    }
  }

  step() {
    if (this.state.playInterval) clearInterval(this.state.playInterval)
    const newGame = Object.assign(this.state.game)
    newGame.tick()
    this.setState({ game: newGame })
  }

  play() {
    this.setState({
      playInterval: setInterval(() => {
        this.step()
      }, 500),
    })
  }

  randomize() {
    if (this.state.playInterval) clearInterval(this.state.playInterval)
    for (let i = 0; i < this.state.game.rows; i++) {
      for (let j = 0; j < this.state.game.cols; j++) {
        const newGame = Object.assign(this.state.game)
        newGame.board[i][j] = Math.round(Math.random())
        this.setState({ game: newGame })
      }
    }
  }

  clear() {
    if (this.state.playInterval) clearInterval(this.state.playInterval)
    this.setState({ game: new Board(25, 25) })
  }

  render() {
    return (
      <div className="container">
        <h1>Conway's Game of Life</h1>
        <table className="board">
          <tbody>
            {this.state.game.board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => (
                  <td
                    className={col === 1 ? 'alive' : ''}
                    key={colIndex}
                    onClick={(e) => this.click(e)}
                    dataset={`${rowIndex},${colIndex}`}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="controls">
          <button className="button" onClick={() => this.step()}>
            Step
          </button>
          <button className="button" onClick={() => this.play()}>
            Play
          </button>
          <button className="button" onClick={() => this.randomize()}>
            Randomize
          </button>
          <button className="button" onClick={() => this.clear()}>
            Clear
          </button>
        </div>
        <footer>
          <p>Made by Edward Lu</p>
        </footer>
      </div>
    )
  }
}

export default App
