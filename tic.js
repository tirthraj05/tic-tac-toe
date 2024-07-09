let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const statusDisplay = document.querySelector('#print');

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex - 1] = currentPlayer;
    clickedCell.value = currentPlayer;
    clickedCell.classList.add('animate__animated', 'animate__flipInY');
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winMessage();
        gameActive = false;
        displayPopup(winMessage());
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function makeMove(clickedCell, clickedCellIndex) {
    if (gameState[clickedCellIndex - 1] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.cell').forEach(cell => {
        cell.value = '';
        cell.classList.remove('animate__animated', 'animate__flipInY');
        cell.disabled = false;
    });
    statusDisplay.innerHTML = currentPlayerTurn();
}

function displayPopup(message) {
    const popup = document.getElementById('congratsPopup');
    const winnerMessage = document.getElementById('winnerMessage');
    winnerMessage.innerHTML = message;
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('congratsPopup');
    popup.style.display = 'none';
    resetGame();
}

statusDisplay.innerHTML = currentPlayerTurn();
