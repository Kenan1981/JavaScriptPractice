// Başlangıç Sudoku tahtası için rastgele değerler üreten fonksiyon
function getRandomBoard() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));

    function fillBoard() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    const shuffledNumbers = numbers.slice().sort(() => Math.random() - 0.5);
                    for (let num of shuffledNumbers) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (fillBoard()) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    fillBoard();
    return board;
}

// Sudoku tahtasını oluştur
function createBoard() {
    const board = getRandomBoard();
    const boardElement = document.getElementById("sudoku-board");

    for (let row = 0; row < 9; row++) {
        const rowElement = document.createElement("tr");
        for (let col = 0; col < 9; col++) {
            const cellElement = document.createElement("td");
            const inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.maxLength = 1;

            // Başlangıç değerlerini yerleştir
            if (board[row][col] !== 0) {
                inputElement.value = board[row][col];
                inputElement.disabled = true; // Başlangıç rakamları değiştirilemez
            }

            cellElement.appendChild(inputElement);
            rowElement.appendChild(cellElement);
        }
        boardElement.appendChild(rowElement);
    }
}

createBoard();

// Sudoku çözme fonksiyonu
function solveSudoku() {
    const board = getBoard();
    if (solve(board)) {
        setBoard(board);
    } else {
        alert("Sudoku çözülemedi!");
    }
}

function getBoard() {
    const board = [];
    const rows = document.querySelectorAll("#sudoku-board tr");

    rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll("input");
        const boardRow = [];
        cells.forEach(cell => {
            const value = cell.value === "" ? 0 : parseInt(cell.value);
            boardRow.push(value);
        });
        board.push(boardRow);
    });

    return board;
}

function setBoard(board) {
    const rows = document.querySelectorAll("#sudoku-board tr");

    rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll("input");
        cells.forEach((cell, colIndex) => {
            cell.value = board[rowIndex][colIndex] !== 0 ? board[rowIndex][colIndex] : "";
        });
    });
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, num) {
    // Satırda ve sütunda num olup olmadığını kontrol et
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }

    // 3x3 blokta num olup olmadığını kontrol et
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}
