/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying;

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // get the random number.
        var dice = Math.floor(Math.random() * 6) + 1; // to get number from 1 - 6;

        // display the result.
        var diceDom = document.querySelector('.dice');
        diceDom.style.display='block';
        diceDom.src = 'dice-' + dice + '.png';

        // update the score if rolled number is not 1.
        if (dice !== 1) {
            // add the score.
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            // change the player.
            nextPlayer();
        }
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

        // check if player won the game.
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner !';
            document.querySelector('.dice').style.display = 'none';
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

    document.querySelector('.dice').style.display='none';
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

    document.querySelector('.dice').style.display='none';
}