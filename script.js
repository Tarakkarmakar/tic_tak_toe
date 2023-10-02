// Define the Tic Tac Toe game as an object
const tic_tac_toe = {
    // ATTRIBUTES

    // The game board, initially empty
    board: ['','','','','','','','',''],

    // Symbols used in the game (O and X) and the current player's turn
    symbols: {
        options: ['O','X'], // Players can be 'O' or 'X'
        turn_index: 0,     // Index to track the current player's turn
        // Function to change the current player's turn
        change() {
            this.turn_index = ( this.turn_index === 0 ? 1 : 0 );
        }
    },

    // Reference to the HTML container where the game is rendered
    container_element: null,

    // Flag to indicate whether the game is over
    gameover: false,

    // Winning sequences for Tic Tac Toe
    winning_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    // FUNCTIONS

    // Initialize the game with a container element
    init(container) {
        this.container_element = container;
    },

    // Function to make a play at a given position
    make_play(position) {
        // Check if the game is over or the position is already occupied
        if (this.gameover || this.board[position] !== '') return false;

        // Determine the current player's symbol (O or X)
        const currentSymbol = this.symbols.options[this.symbols.turn_index];

        // Update the board with the current player's symbol
        this.board[position] = currentSymbol;

        // Draw the updated board
        this.draw();

        // Check if the current player has won
        const winning_sequences_index = this.check_winning_sequences(currentSymbol);

        // Check if the game is now over
        if (this.is_game_over()) {
            this.game_is_over();
        }

        // If there's a winner, mark the game as over and highlight the winning sequence
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
        } else {
            // Switch to the next player's turn
            this.symbols.change();
        }

        return true;
    },

    // Function to highlight the winning sequence on the board
    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
    },

    // Function to check for a winning sequence with a given symbol
    check_winning_sequences(symbol) {
        for (i in this.winning_sequences) {
            if (this.board[this.winning_sequences[i][0]] == symbol &&
                this.board[this.winning_sequences[i][1]] == symbol &&
                this.board[this.winning_sequences[i][2]] == symbol) {
                console.log('winning sequences INDEX:' + i);
                return i;
            }
        };
        return -1;
    },

    // Function to mark the game as over
    game_is_over() {
        this.gameover = true;
        console.log('GAME OVER');
    },

    // Function to check if the game has ended in a draw
    is_game_over() {
        return !this.board.includes('');
    },

    // Function to start a new game
    start() {
        this.board.fill('');
        this.draw();
        this.gameover = false;       
    },

    // Function to restart the game
    restart() {
        if (this.is_game_over() || this.gameover) {
            this.start();
            console.log('This game has been restarted!')
        } else if (confirm('Are you sure you want to restart this game?')) {
            this.start();
            console.log('This game has been restarted!')
        }
    },

    // Function to draw/render the current game state
    draw() {
        this.container_element.innerHTML = this.board.map((element, index) => `<div onclick="tic_tac_toe.make_play('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
};

// Initialize the game with an HTML container
tic_tac_toe.init(document.getElementById('game-container'));
