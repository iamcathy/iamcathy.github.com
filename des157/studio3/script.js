(function (){
    "use strict";
    const startGame = document.getElementById("startgame");
    const gameControl = document.getElementById("gamecontrol");
    const game = document.getElementById("game");
    const score = document.getElementById("score");
    const actionArea = document.getElementById("actions");
    
    const bgSound = new Audio("media/jazz.mp3");
    const yay = new Audio("media/yay.mp3");
    const wah = new Audio("media/wah.mp3");
    const diceSound = new Audio("media/dice.mp3");

    const gameData = {
        dice: ["images/1die.png", "images/2die.png", "images/3die.png",
                "images/4die.png", "images/5die.png", "images/6die.png"],
        players: ["player1", "player2"],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum:0,
        index: 0,
        gameEnd: 29
    };

    //show overlay
    const gameTitle = document.querySelector("#gametitle");
    const story = document.querySelector("#story");
    document.getElementById("overlay").className = "showing";

    story.innerHTML = '<h2 id = "gametitle">Game of PIG</h2><br><br> There are two players. The player whose turn it is rolls the dice. The total of the roll is added to the current player\'s score, unless either die comes up as a "one". If this happens, this player\'s turn is over, and it is the other player’s turn. After each roll, the current player can either roll again, (assuming a "one" was not rolled) or if the current player feels that luck is running thin, they can pass to the other player. The first player to get 30 points or higher wins. <br><br> Oh, and if you roll two "ones" (snake eyes), your current score gets zeroed out. So don’t do that.';
    document.getElementById("story").style.padding = "40px 60px 50px 50px";

    startGame.addEventListener("click", function(){
        bgSound.volume = 0.3;
        bgSound.play();
        document.getElementById("overlay").className = "hidden";
        gameData.index = Math.round(Math.random());
        gameControl.innerHTML += '<button id = "quit">Wanna Quit?</button>';

        document.getElementById("quit").addEventListener("click", function(){
            location.reload();
        });

        console.log("set up the turn!");
        setUpTurn();
    });

    function setUpTurn() {
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        console.log(gameData.index);
        if (gameData.index == 0) {
            document.getElementById("actions").className = "leftside";
            document.getElementById("game").className = "leftdice";
        }

        if (gameData.index == 1) {
            document.getElementById("actions").className = "rightside";
            document.getElementById("game").className = "rightdice";
        }

        actionArea.innerHTML = '<button id = "roll">Roll the Dice</button>';
        document.getElementById("roll").addEventListener("click", function(){
            throwDice();
        });
    }

    function throwDice(){
        diceSound.play();
        actionArea.innerHTML = "";
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src = "${gameData.dice[gameData.roll1-1]}">
                            <img src = "${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;
        console.log(gameData);

        if ( gameData.rollSum === 2 ) {
            wah.play();
            game.innerHTML += "<p>Oh snap! Snake eyes!</p>";
            gameData.score[gameData.index] = 0;
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
        score.innerHTML = `<p>The score is currently <strong>Player One: ${gameData.score[0]}</strong> and <strong>Player Two: ${gameData.score[1]}</strong></p>`;
    }
})();