(function (){
    "use strict";
    const startGame = document.getElementById("startgame");
    const gameControl = document.getElementById("gamecontrol");
    const game = document.getElementById("game");
    const score = document.getElementById("score");
    const actionArea = document.getElementById("actions");
    const form = document.querySelector("#myForm");
    const player1 = document.querySelector("#name1").value;
    const player2 = document.querySelector("#name2").value;
    const playerone = document.getElementById("playerone");
    const playertwo = document.getElementById("playertwo");
    const piece1 = document.getElementsByClassName("piece1");
    const piece2 = document.getElementsByClassName("piece2");
    
    const bgSound = new Audio("media/jazz.mp3");
    const yay = new Audio("media/yay.mp3");
    const wah = new Audio("media/wah.mp3");
    const diceSound = new Audio("media/dice.mp3");

    const gameData = {
        dice: ["images/1die.png", "images/2die.png", "images/3die.png"],
        players: ["player1", "player2"],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum:0,
        index: 0,
        gameEnd: 12
    };


    //show overlay
    const gameTitle = document.querySelector("#gametitle");
    const story = document.querySelector("#story");
    document.getElementById("overlay").className = "showing";

    story.innerHTML = '<h2 id = "gametitle">Game of CAT</h2><br><br> There are two players. The player whose turn it is rolls the dice. The number the player gets when they roll the dice is how many spaces their piece will move. The goal of the game is to get your piece to the end of the board before the other player does.<br><br><br><strong>User Test:(sorry my game isn\'t fully functional ):) Read directions and enter two names. Start game and roll the dice back and forth. Click restart button to restart game.';
    document.getElementById("story").style.padding = "40px 60px 50px 50px";

    form.addEventListener("submit", function(event){
        bgSound.volume = 0.3;
        bgSound.play();
        event.preventDefault();
    
        document.getElementById("overlay").className = "hidden";
        gameData.index = Math.round(Math.random());
        /* gameControl.innerHTML += '<button id = "quit">Wanna Quit?</button>'; */

        document.getElementById("quit").addEventListener("click", function(){
            location.reload();
        });

        gameData.players[0] = document.querySelector("#name1").value;
        console.log(gameData.players[gameData.index]);

        gameData.players[1] = document.querySelector("#name2").value;
        console.log(gameData.players[gameData.index]);

        playerone.innerHTML = `<h3>${gameData.players[0]}</h3>`;
        playertwo.innerHTML = `<h3>${gameData.players[1]}</h3>`;

        console.log("set up the turn!");
        setUpTurn();
    });

    function setUpTurn() {
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        console.log(gameData.index);
        if (gameData.index == 0) {
            document.getElementById("actions").className = "actionsleft";
            document.getElementById("game").className = "left";
        }

        if (gameData.index == 1) {
            document.getElementById("actions").className = "actionsright";
            document.getElementById("game").className = "right";
        }

        actionArea.innerHTML = '<button id = "roll">Roll the Dice</button>';
        document.getElementById("roll").addEventListener("click", function(){
            throwDice();
        });
    }

    function throwDice(){
        diceSound.play();
        actionArea.innerHTML = "";
        gameData.roll1 = Math.floor(Math.random() * 3) + 1;
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src = "${gameData.dice[gameData.roll1-1]}">`;
        gameData.rollSum = gameData.roll1;
        console.log(gameData);

        if ( gameData.roll1 === 1 ) {
            game.innerHTML += "<p>Your piece moves one space!</p>";
            /* if (gameData.rollSum === 1) {
                piece1.css('grid-column-start') = 1;
                piece1.css('grid-column-start') = 2;
            } */
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
        } else if ( gameData.roll1 === 1 || gameData.roll2 === 1 ) {
            wah.play();
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p id = "one">Sorry, one of your rolls was a one,<br> switching
                        to ${gameData.players[gameData.index]}</p>`
            setTimeout(setUpTurn, 2000);
        } else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id = "rollagain">Roll again</button><button id = "pass">Pass</button>';

            document.getElementById("rollagain").addEventListener("click", function (){
                setUpTurn();
            });

            document.getElementById("pass").addEventListener("click", function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
            checkWinningCondition();
        }
    }

    function checkWinningCondition(){
        if(gameData.score[gameData.index] > gameData.gameEnd) {
            yay.play();
            score.innerHTML = `<p>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</p>`;
            document.getElementById("game").className = "hidden";
            actionArea.innerHTML = "";
            document.getElementById("quit").innerHTML = "New Game?"; 
        } else {
            showCurrentScore();
        }
    }
    
    function showCurrentScore() {
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}: ${gameData.score[0]}</strong> and <strong>${gameData.players[1]}: ${gameData.score[1]}</strong></p>`;
    }
})();