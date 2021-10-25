/*
	
    Stuff to handle ;-):
    1. Make the fields clickable (player0 uses "X", player1 "0")
    2. Keep track of all used fields (fieldsPlayed) and of the fields each player chose (fieldsPlayer0, fieldsPlayer1)
    3. Avoid that úsed fields can be played again and implement feedback like "Field already taken" (alert();)
    4. Check for winning combinations
    5. Implement feedback to the players (winning or game is a draw)
    6. End the game, avoid further playing
    7. Add a "Play again button"
    8. Implement "eternal" game statistics (using local storage!)
    9. Style the game as fancy and responsive as you can ;-)
	
    */

// global game variables
var player, fields, fieldsPlayed, fieldsPlayer0, fieldsPlayer1, msg, button;

player = 0;

fields = []; // makes the variable into an array
fields = document.querySelectorAll('td');
// console.log(fields);

fieldsPlayed = [];
fieldsPlayer0 = [];
fieldsPlayer1 = [];

msg = document.querySelector('#msg');

button = document.querySelector('#reset');

// gameStats();

// Game functions
function play() {
    // game core mechanics, marking the fields
    if (player === 0 && !fieldsPlayed.includes(this.id)) {
        this.innerHTML = 'X';
        this.style.color = 'purple';
        fieldsPlayer0.push(parseInt(this.id));
        player = 1;
    } else if (player === 1 && !fieldsPlayed.includes(this.id)) {
        this.innerHTML = 'O';
        this.style.color = 'red';
        fieldsPlayer1.push(parseInt(this.id));
        player = 0;
    }
    fieldsPlayed.push(this.id);
    win();
    gameStats();
}

function win() {
    // analyzing field choices, winning conditions, feedback
    /* const winningcombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ] 
    It would be fun to figure out how this could work */

    if (
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(2) && fieldsPlayer0.includes(3) ||
        fieldsPlayer0.includes(4) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(6) ||
        fieldsPlayer0.includes(7) && fieldsPlayer0.includes(8) && fieldsPlayer0.includes(9) ||
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(4) && fieldsPlayer0.includes(7) ||
        fieldsPlayer0.includes(2) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(8) ||
        fieldsPlayer0.includes(3) && fieldsPlayer0.includes(6) && fieldsPlayer0.includes(9) ||
        fieldsPlayer0.includes(1) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(9) ||
        fieldsPlayer0.includes(3) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(7)
    ){
        // player 0 won
        msg.innerHTML = 'Player X won';   
        gameOver();
    } else if (
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(2) && fieldsPlayer1.includes(3) ||
        fieldsPlayer1.includes(4) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(6) ||
        fieldsPlayer1.includes(7) && fieldsPlayer1.includes(8) && fieldsPlayer1.includes(9) ||
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(4) && fieldsPlayer1.includes(7) ||
        fieldsPlayer1.includes(2) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(8) ||
        fieldsPlayer1.includes(3) && fieldsPlayer1.includes(6) && fieldsPlayer1.includes(9) ||
        fieldsPlayer1.includes(1) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(9) ||
        fieldsPlayer1.includes(3) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(7)
    ){
        // player 1 won
        msg.innerHTML = 'Player O won';
        gameOver();
    } else if (fieldsPlayed.length === 9) {
        // game is a draw
        msg.innerHTML = 'The game is a draw';
        gameOver();
    }
}

function gameOver() {
    // ending the game
    for (let i = 0; i < fields.length; i++) {
        fields[i].removeEventListener('click', play);
    }
}

function playAgain() {
    // restart the game
    location.reload();
}

function gameStats() {
    // game stats using local storage
    if(localStorage.getItem('Xstat') === null){
        localStorage.setItem('Xstat', 0)
    }
    if(localStorage.getItem('Ostat') === null){
        localStorage.setItem('Ostat', 0)
    }
    if(localStorage.getItem('Dstat') === null){
        localStorage.setItem('Dstat', 0)
    }
    //const player0Stat = localStorage.Xstat ? localStorage.Xstat : 0;
    //const player1Stat = localStorage.Ostat ? localStorage.Ostat : 0;
    //const drawsStat = localStorage.Dstat ? localStorage.Dstat : 0;
    const xstathtml = document.querySelector('.xstat');
    const ostathtml = document.querySelector('.ostat');
    const dstathtml = document.querySelector('.dstat');

    let xStats = localStorage.getItem('Xstat');
    let OStats = localStorage.getItem('Ostat');
    let dStats = localStorage.getItem('Dstat');

    if(msg.innerHTML === 'Player X won'){
        var statX = parseFloat(xStats);
        statX = statX + 1;
        localStorage.setItem('Xstat', statX);
        xstathtml.innerHTML = statX;
    } else if (msg.innerHTML === 'Player O won'){
        var statO = parseFloat(OStats);
        statO = statO + 1;
        localStorage.setItem('Ostat', statO); 
        ostathtml.innerHTML = statO;
    } else if (msg.innerHTML === 'The game is a draw'){
        var statD = parseFloat(dStats);
        statD = statD + 1;
        localStorage.setItem('Dstat', statD);
        dstathtml.innerHTML = statD;
    }


}

// Game application
for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener('click', play);
}

button.addEventListener('click', playAgain)