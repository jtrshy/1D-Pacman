console.log('Hello world!');

var numberOfPellets = 0;
var score = 0;
var game = createGame(10);
var ghostIntervalId;

// ----------------- Functions -----------------

function generateRandomPosition(n) {
    let positions = new Set();

    while (positions.size < 3) {
        positions.add(Math.floor(Math.random() * n));
    }

    return Array.from(positions);
}

function createGame(n) {
    let board = new Array(n).fill('.');
    numberOfPellets = n - 3;

    let [pacmanStartPosition, ghostStartPosition, fruitPosition] = generateRandomPosition(n);
    
    board[pacmanStartPosition] = 'C';
    board[ghostStartPosition] = '^';
    board[fruitPosition] = '@';

    console.log(board);
    // Convert the board array to a string, with each element separated by a space
    let boardString = board.join(' ');
    // Create a new paragraph element
    let p = document.createElement('p');
    // Set the text of the paragraph to the board string
    p.textContent = boardString;
    // Append the paragraph to the body of the document
    document.body.appendChild(p);

    return board;
}

function moveLeft() {
    let pacmanIndex = game.indexOf('C');
    let ghostIndex = game.indexOf('^');

    if (pacmanIndex === 0) {
        if (game[game.length - 1] === '^') { // Check if the next cell contains the ghost
            console.log('Game over');
            clearInterval(ghostIntervalId);
        } else if (game[game.length - 1] !== ' ') { // Check if the next cell contains a pellet
            score += 1;
            console.log(score);
            let scoreElement = document.getElementById('score');
            scoreElement.textContent = 'Score: ' + score;
        }

        game[pacmanIndex] = ' ';
        game[game.length - 1] = 'C';
    } else {
        if (game[pacmanIndex - 1] === '^') { // Check if the next cell contains the ghost
            console.log('Game over');
            clearInterval(ghostIntervalId);
        } else if (game[pacmanIndex - 1] !== ' ') { // Check if the next cell contains a pellet
            score += 1;
            console.log(score);
            let scoreElement = document.getElementById('score');
            scoreElement.textContent = 'Score: ' + score;
        }

        game[pacmanIndex] = ' ';
        game[pacmanIndex - 1] = 'C';
    }

    console.log(game);
    // Convert the board array to a string, with each element separated by a space
    let boardString = game.join(' ');
    // Create a new paragraph element
    let p = document.createElement('p');
    // Set the text of the paragraph to the board string
    p.textContent = boardString;
    // Append the paragraph to the body of the document
    document.body.appendChild(p);

    if (numberOfPellets === 0) {
        console.log('New game');
        // Create a new game
        game = createGame(10);
    }
}

function moveRight() {
    let pacmanIndex = game.indexOf('C');
    let ghostIndex = game.indexOf('^');

    if (pacmanIndex === game.length - 1) {
        if (game[0] === '^') { // Check if the next cell contains the ghost
            console.log('Game over');
            clearInterval(ghostIntervalId);
        } else if (game[0] !== ' ') { // Check if the next cell contains a pellet
            score += 1;
            console.log(score);
            let scoreElement = document.getElementById('score');
            scoreElement.textContent = 'Score: ' + score;
        }

        game[pacmanIndex] = ' ';
        game[0] = 'C';
    } else {
        if (game[pacmanIndex + 1] === '^') { // Check if the next cell contains the ghost
            console.log('Game over');
            clearInterval(ghostIntervalId);
        } else if (game[pacmanIndex + 1] !== ' ') { // Check if the next cell contains a pellet
            score += 1;
            console.log(score);
            let scoreElement = document.getElementById('score');
            scoreElement.textContent = 'Score: ' + score;
        }

        game[pacmanIndex] = ' ';
        game[pacmanIndex + 1] = 'C';
    }

    console.log(game);
    // Convert the board array to a string, with each element separated by a space
    let boardString = game.join(' ');
    // Create a new paragraph element
    let p = document.createElement('p');
    // Set the text of the paragraph to the board string
    p.textContent = boardString;
    // Append the paragraph to the body of the document
    document.body.appendChild(p);

    if (numberOfPellets === 0) {
        // Create a new game
        console.log('New game');
        game = createGame(10);
    }
}

function repeatedGhostMovement() {
    let ghostIndex;
    let pacmanIndex;
    let previousCell = ' '; // Initialize previous cell as empty

    ghostIntervalId = setInterval(function() {
        ghostIndex = game.indexOf('^');
        pacmanIndex = game.indexOf('C');

        if (ghostIndex < pacmanIndex) {
            if (ghostIndex + 1 === pacmanIndex) {
                console.log('Game over');
                clearInterval(ghostIntervalId);
            }
            else {
                game[ghostIndex] = previousCell; // Restore the previous cell
                previousCell = game[ghostIndex + 1]; // Save the next cell state
                game[ghostIndex + 1] = '^';
            }
        }

        if (ghostIndex > pacmanIndex) {
            if (ghostIndex - 1 === pacmanIndex) {
                console.log('Game over');
                clearInterval(ghostIntervalId);
            }
            else {
                game[ghostIndex] = previousCell; // Restore the previous cell
                previousCell = game[ghostIndex - 1]; // Save the next cell state
                game[ghostIndex - 1] = '^';
            }
        }

        console.log(game);
        // Convert the board array to a string, with each element separated by a space
        let boardString = game.join(' ');
        // Create a new paragraph element
        let p = document.createElement('p');
        // Set the text of the paragraph to the board string
        p.textContent = boardString;
        // Append the paragraph to the body of the document
        document.body.appendChild(p);
    }, 2000);
}

repeatedGhostMovement();

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
});
