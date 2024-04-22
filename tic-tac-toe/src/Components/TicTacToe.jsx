import React from 'react';
import useTicTacToe from '../hooks/tic-tac-toe';
import './TicTacToe.css';

function TicTacToe() {
    const { board, calculateWinner, resetGame, getStatusMessage, handleClick, handleSizeChange ,gridSize} = useTicTacToe();

    return (
        <div className="game">
            <div className="status">
                {getStatusMessage()}
                <input 
                type="number" 
                min="3" 
                max="10" 
                onChange={handleSizeChange}
                />
                <button onClick={resetGame} className='reset-btn'>Reset Game</button>
            </div>
            
            <div className="board"
                style={{                 
                    gridTemplateColumns: `repeat(${gridSize}, ${gridSize}fr)`, // Update dynamically
                }}>
                {board.map((b, idx) => (
                    <button
                        onClick={() => handleClick(idx)}
                        className='cell'
                        key={idx}
                        disabled={b !== null}>
                        {board[idx]}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TicTacToe;
