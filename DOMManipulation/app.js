/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, previousDice, winningScore;

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // get the random number.
        var dice1 = Math.floor(Math.random() * 6) + 1; // to get number from 1 - 6;
        var dice2 = Math.floor(Math.random() * 6) + 1;
    
        // display the result.
        var diceDom1 = document.getElementById('dice-1');
        var diceDom2 = document.getElementById('dice-2');
        diceDom1.style.display='block';
        diceDom2.style.display='block';

        diceDom1.src = 'dice-' + dice1 + '.png';
        diceDom2.src = 'dice-' + dice2 + '.png';

        // update the score if rolled number is not 1.
        if (dice1 === 6 && previousDice === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            // add the score.
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            // change the player.
            nextPlayer();
        }
        
        // store the previous dice
        previousDice = dice1;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // update the actual player score.
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // reset the current round score.
        roundScore = 0;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        
        var input = document.getElementById('final-score').value;
        var winningScore = 100;
        if (input) {
            winningScore = input;
        }
        // check if player won the game.
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner !';
            document.getElementById('dice-1').style.display='none';
            document.getElementById('dice-2').style.display='none';

            document.querySelector(
                '.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector(
                '.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // change the player.
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {
    roundScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    gamePlaying = true;
    previousDice = 0;

    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';

    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    (activePlayer === 0)? activePlayer = 1 : activePlayer = 0;

    roundScore = 0;
    document.getElementById('current-0').textContent = roundScore;
    document.getElementById('current-1').textContent = roundScore;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';
}