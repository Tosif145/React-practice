import { useState } from 'react';

const initialBoard = (size) => Array(size*size).fill(null);

const generateWinningPatterns = (size) => {
    const patterns = [];
    

    // Rows
    for(let i = 0; i < size; i++) {
        const row = [];

        for(let j = 0; j < size; j++) {
            row.push(i * size + j)
        }

        patterns.push(row);
    }

    // Columns
    for(let i = 0; i < size; i++) {
        const col = [];
        for (let j = 0; j < size; j++) {
            col.push(j * size + i)
        }
        patterns.push(col);
    }

    // Diagonals
    const dgnl1 = [];
    const dgnl2 = [];
    for(let i = 0; i < size; i++) {
        dgnl1.push(i * (size + 1));
        dgnl2.push((i+1) * (size - 1));
    }
    patterns.push(dgnl1,dgnl2);

    return patterns;
}

const useTicTacToe = ( ) =>{
    const [gridSize, setGridSize] = useState(3); // Default size is 3x3
    const [board,setBoard] = useState(initialBoard(gridSize));
    const [isXNext, setIsXNext] = useState(true);
    const [winningPatterns, setWinningPatterns] = useState(generateWinningPatterns(gridSize));
 

  

    const handleSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        setGridSize(newSize);
        setBoard(initialBoard(newSize));
        setWinningPatterns(generateWinningPatterns(newSize));
    };  

    const calculateWinner = (currBoard) => {
        for (let i = 0; i < winningPatterns.length; i++) {
            const pattern = winningPatterns[i];
            let hasWinner = true;
            const firstCell = currBoard[pattern[0]];
    
            if (!firstCell) continue; // If the first cell is empty, move to the next pattern
    
            // Check if all cells in the pattern have the same symbol as the first cell
            for (let j = 1; j < pattern.length; j++) {
                if (currBoard[pattern[j]] !== firstCell) {
                    hasWinner = false;
                    break;
                }
            }
    
            // If all cells in the pattern have the same symbol, return the symbol (X or O)
            if (hasWinner) {
                return firstCell;
            }
        }
    
        // If no winning pattern is found, return null
        return null;
    };
    
    

    const handleClick = (index) => {
        // check winner
        const winner = calculateWinner(board); 
        console.log(winner);
        if(winner || board[index]) {return;}

        const newBoard = [ ...board];

        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const getStatusMessage = () => {
        const winner = calculateWinner(board);

        if(winner) {
            return `Player ${winner} wins!`
        }

        if(!board.includes(null)){
            return "It's a Draw!";
        }

        return `Player ${isXNext ? "X" : "O"} Turn`;
    };

    const resetGame = () => {
        setIsXNext(true)
        setBoard(initialBoard(gridSize))
    };

    return { board, handleClick, calculateWinner,getStatusMessage, resetGame ,handleSizeChange,gridSize};
}


export default useTicTacToe;