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
    let piece1 = document.getElementById("piece1");
    let piece2 = document.getElementById("piece2");
    
    const bgSound = new Audio("media/jazz.mp3");
    const yay = new Audio("media/yay.mp3");
    const wah = new Audio("media/wah.mp3");
    const diceSound = new Audio("media/dice.mp3");
    const moveSound = new Audio("media/move.mp3");
    const roll2Sound = new Audio("media/roll2.mp3");
    const btnSound = new Audio("media/button.mp3");

    const gameData = {
        dice: ["images/1die.png", "images/2die.png", "images/3die.png"],
        players: ["player1", "player2"],
        score: [0, 0],
        roll1: 0,
        rollSum:0,
        index: 0,
        gameEnd: 12
    };

    //show overlay
    const gameTitle = document.querySelector("#gametitle");
    const story = document.querySelector("#story");
    document.getElementById("overlay").className = "showing";

    story.innerHTML = '<h2 id = "gametitle">GAME OF CAT</h2><br><br> There are two mice who are trying to get home before they are caught by the cat. The mouse whose turn it is rolls the dice. If you roll a <strong>one</strong>, you move one space forward. Rolling a <strong>two</strong> means the other player gets to roll. Last, rolling a <strong>three</strong> means you have to move back one space. The goal of the game is to get your mouse back home before the other mouse gets there.';
    document.getElementById("story").style.padding = "40px 60px 50px 50px";

    form.addEventListener("submit", function(event){
        bgSound.volume = 0.3;
        bgSound.play();
        event.preventDefault();
    
        document.getElementById("overlay").className = "hidden";
        gameData.index = Math.round(Math.random());

        document.getElementById("quit").addEventListener("click", function(){
            btnSound.play();
            location.reload();
        });

        document.getElementById("pause").addEventListener("click", function(){
            btnSound.play();
            bgSound.pause();
            document.getElementById("overlay2").className = "showing";
        });

        document.getElementById("resume").addEventListener("click", function(){
            bgSound.play();
            document.getElementById("overlay2").className = "hidden";
        });

        document.getElementById("question").addEventListener("click", function(){
            btnSound.play();
            bgSound.pause();
            document.getElementById("overlay3").className = "showing";
        });

        document.getElementById("back").addEventListener("click", function(){
            bgSound.play();
            document.getElementById("overlay3").className = "hidden";
        });

        document.getElementById("replay").addEventListener("click", function(){
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
        game.innerHTML = `<h4>Roll the dice for the ${gameData.players[gameData.index]}</h4>`;
        console.log(gameData.index);
        if (gameData.index == 0) {
            document.getElementById("actions").className = "actionsleft";
            document.getElementById("game").className = "left";
        }

        if (gameData.index == 1) {
            document.getElementById("actions").className = "actionsright";
            document.getElementById("game").className = "right";
        }

        actionArea.innerHTML = '<button id = "roll">Roll the Dice!</button>';
        document.getElementById("roll").addEventListener("click", function(){
            throwDice();
        });
    }

    function throwDice(){
        diceSound.play();
        actionArea.innerHTML = "";
        gameData.roll1 = Math.floor(Math.random() * 3) + 1;
        game.innerHTML = `<h4>Roll the dice for the ${gameData.players[gameData.index]}</h4>`;
        game.innerHTML += `<img src = "${gameData.dice[gameData.roll1-1]}">`;
        console.log(gameData);

        if ( gameData.roll1 === 3) {
            wah.play();
            if (gameData.score[gameData.index] === 0) {
                showCurrentScore()
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                game.innerHTML += `<p id = "one">Sorry, you rolled a three,<br> switching
                        to ${gameData.players[gameData.index]}</p>`
                setTimeout(setUpTurn, 2000);
            } else {
                console.log("uwu");
                console.log(gameData.score[gameData.index]);
                gameData.score[gameData.index] = gameData.score[gameData.index] - 1;
                showCurrentScore()
                if (gameData.index === 0) {
                    if (gameData.score[0] === 1) {
                        piece1.className = "piece1 two";
                    } else if (gameData.score[0] === 0) {
                        piece1.className = "piece1 one";
                    } else if (gameData.score[0] === 2) {
                        piece1.className = "piece1 three";
                    } else if (gameData.score[0] === 3) {
                        piece1.className = "piece1 four";
                    } else if (gameData.score[0] === 4) {
                        piece1.className = "piece1 five";
                    } else if (gameData.score[0] === 5) {
                        piece1.className = "piece1 six";
                    } else if (gameData.score[0] === 6) {
                        piece1.className = "piece1 seven";
                    } else if (gameData.score[0] === 7) {
                        piece1.className = "piece1 eight";
                    } else if (gameData.score[0] === 8) {
                        piece1.className = "piece1 nine";
                    } else if (gameData.score[0] === 9) {
                        piece1.className = "piece1 ten";
                    } else if (gameData.score[0] === 10) {
                        piece1.className = "piece1 eleven";
                    } else if (gameData.score[0] === 11) {
                        piece1.className = "piece1 twelve";
                    } else if (gameData.score[0] === 12) {
                        piece1.className = "piece1 thirteen";
                    }
                } else if (gameData.index === 1) {
                    if (gameData.score[1] === 1) {
                        piece2.className = "piece2 two";
                    } else if (gameData.score[1] === 0) {
                        piece2.className = "piece2 one";
                    } else if (gameData.score[1] === 2) {
                        piece2.className = "piece2 three";
                    } else if (gameData.score[1] === 3) {
                        piece2.className = "piece2 four";
                    } else if (gameData.score[1] === 4) {
                        piece2.className = "piece2 five";
                    } else if (gameData.score[1] === 5) {
                        piece2.className = "piece2 six";
                    } else if (gameData.score[1] === 6) {
                        piece2.className = "piece2 seven";
                    } else if (gameData.score[1] === 7) {
                        piece2.className = "piece2 eight";
                    } else if (gameData.score[1] === 8) {
                        piece2.className = "piece2 nine";
                    } else if (gameData.score[1] === 9) {
                        piece2.className = "piece2 ten";
                    } else if (gameData.score[1] === 10) {
                        piece2.className = "piece2 eleven";
                    } else if (gameData.score[1] === 11) {
                        piece2.className = "piece2 twelve";
                    } else if (gameData.score[1] === 12) {
                        piece2.className = "piece2 thirteen";
                    }
                }
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                game.innerHTML += `<p id = "one">Oh no! You rolled a three,<br>going back one space</p>`
                setTimeout(setUpTurn, 2000);
            }
        } else if ( gameData.roll1 === 2) {
            roll2Sound.play();
            showCurrentScore()
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p id = "one">Sorry, you didn't roll a one,<br> switching
                        to ${gameData.players[gameData.index]}</p>`
            setTimeout(setUpTurn, 2000);
        } else if ( gameData.roll1 === 1 ) {
            console.log(`gameData.roll1`);
            console.log(gameData.rollSum);
            moveSound.play();
            gameData.rollSum = gameData.roll1;
            game.innerHTML += "<p>Your piece moves one space!</p>";
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.roll1;
            if (gameData.score[0] === 1) {
                piece1.className = "piece1 two";
            } else if (gameData.score[0] === 2) {
                piece1.className = "piece1 three";
            } else if (gameData.score[0] === 3) {
                piece1.className = "piece1 four";
            } else if (gameData.score[0] === 4) {
                piece1.className = "piece1 five";
            } else if (gameData.score[0] === 5) {
                piece1.className = "piece1 six";
            } else if (gameData.score[0] === 6) {
                piece1.className = "piece1 seven";
            } else if (gameData.score[0] === 7) {
                piece1.className = "piece1 eight";
            } else if (gameData.score[0] === 8) {
                piece1.className = "piece1 nine";
            } else if (gameData.score[0] === 9) {
                piece1.className = "piece1 ten";
            } else if (gameData.score[0] === 10) {
                piece1.className = "piece1 eleven";
            } else if (gameData.score[0] === 11) {
                piece1.className = "piece1 twelve";
            } else if (gameData.score[0] === 12) {
                piece1.className = "piece1 thirteen";
            }

            if (gameData.score[1] === 1) {
                piece2.className = "piece2 two";
            } else if (gameData.score[1] === 2) {
                piece2.className = "piece2 three";
            } else if (gameData.score[1] === 3) {
                piece2.className = "piece2 four";
            } else if (gameData.score[1] === 4) {
                piece2.className = "piece2 five";
            } else if (gameData.score[1] === 5) {
                piece2.className = "piece2 six";
            } else if (gameData.score[1] === 6) {
                piece2.className = "piece2 seven";
            } else if (gameData.score[1] === 7) {
                piece2.className = "piece2 eight";
            } else if (gameData.score[1] === 8) {
                piece2.className = "piece2 nine";
            } else if (gameData.score[1] === 9) {
                piece2.className = "piece2 ten";
            } else if (gameData.score[1] === 10) {
                piece2.className = "piece2 eleven";
            } else if (gameData.score[1] === 11) {
                piece2.className = "piece2 twelve";
            } else if (gameData.score[1] === 12) {
                piece2.className = "piece2 thirteen";
            }
            showCurrentScore();
            checkWinningCondition();
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setTimeout(setUpTurn, 2000);
        }
    }

    function checkWinningCondition(){
        if(gameData.score[gameData.index] === gameData.gameEnd) {
            yay.play();
            score.innerHTML = `<p>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</p>`;
            document.getElementById("game").className = "hidden";
            actionArea.innerHTML = "";
            showWinner(); 
        } else {
            showCurrentScore();
        }
    }
    
    function showCurrentScore() {
        if (gameData.roll1 === 1) {
            score.innerHTML = `<p><strong>${gameData.players[gameData.index]} moves one space forward!</strong></p>`;
        } else if (gameData.roll1 === 2) {
            score.innerHTML = `<p><strong>Aww! ${gameData.players[gameData.index]} rolled a two! Switching players . . .</strong></p>`;
        } else if  (gameData.roll1 === 3) {
            score.innerHTML = `<p><strong>Oh no! ${gameData.players[gameData.index]} rolled a three! Go back one space.</strong></p>`;
        }
        setTimeout(defaultScore, 2500);
    }

    function defaultScore() {
        score.innerHTML = `<h2><strong>GAME OF CAT</strong></h2>`;
    }

    function showWinner() {
        document.getElementById("overlay4").className = "showing";
        story4.innerHTML = `<h1>${gameData.players[gameData.index]} wins!</h1>`;
    }
})();