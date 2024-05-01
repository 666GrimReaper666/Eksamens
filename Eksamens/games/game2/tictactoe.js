var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

window.onload = function() {
    setGame();
    document.getElementById("try-again").addEventListener("click", resetGame);
    document.getElementById("back-to-selection").addEventListener("click", goToGameSelection);
}

function goToGameSelection() {
    window.location.href = "../../index.html";
}


function setGame() {
    board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");    //ex) "1-2" -> ["1", "2'"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') { 
        //already taken spot
        return;
    }
    
    board[r][c] = currPlayer; //mark the board
    this.innerText = currPlayer; //mark the board on html

    //change players
    if (currPlayer == playerO) {
        currPlayer = playerX;
    }
    else {
        currPlayer = playerO;
    }

    //check winner
    checkWinner();
}


function checkWinner() {
    // Horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            // Apply the winner style to that row
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            // Display winner message
            displayWinMessage("Player " + board[r][0] + " wins!");
            return;
        }
    }

    // Vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            // Apply the winner style to that column
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;
            // Display winner message
            displayWinMessage("Player " + board[0][c] + " wins!");
            return;
        }
    }

    // Diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        // Display winner message
        displayWinMessage("Player " + board[0][0] + " wins!");
        return;
    }

    // Anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;
        // Display winner message
        displayWinMessage("Player " + board[0][2] + " wins!");
        return;
    }
}

function resetGame() {
    // Remove win message
    let winMessage = document.querySelector(".win-message");
    if (winMessage) {
        winMessage.parentNode.removeChild(winMessage);
    }
    
    // Remove winner styles from tiles
    let winnerTiles = document.querySelectorAll(".winner");
    winnerTiles.forEach(tile => {
        tile.classList.remove("winner");
    });

    // Clear the board array
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            board[r][c] = ' ';
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "";
        }
    }

    // Reset game variables
    gameOver = false;
    currPlayer = playerO;

    // Hide the try again button
    document.getElementById("try-again").style.display = "none";
}

function displayWinMessage(message) {
    let modal = document.getElementById("myModal");
    let winnerMessage = document.getElementById("winner-message");
    winnerMessage.innerText = message;
    modal.style.display = "block";
    // Show the try again button
    document.getElementById("try-again").style.display = "block";

}
    // Get the close button element
    var closeModalBtn = document.getElementById("closeModal");

    // Add click event listener to the close button
    closeModalBtn.addEventListener("click", function() {
        // Get the modal element
        var modal = document.getElementById("myModal");
        // Hide the modal
        modal.style.display = "none";
    });
