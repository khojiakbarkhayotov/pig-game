'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const curScore0El = document.getElementById('current--0');
const curScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// setting up initial look up of our website
let current, activePlayer, scores, playing;
// initial conditions
const init = function () {
  current = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  document.querySelector('.player').classList.remove('player--winner');
  document.querySelector('.score').textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  curScore0El.textContent = 0;
  curScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  document.querySelector('.current-score').textContent = current;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
// changing the active player
const switchPlayer = function () {
  // document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  current = 0;
  // document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
  player0El.classList.toggle('player--active'); // toggle method removes or adds class if class is defined there or not defined
  player1El.classList.toggle('player--active');
};

// generating random number
const generateRandom = function () {
  const random = Math.trunc(Math.random() * 6) + 1;
  return random;
};

// rollling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating random number
    const randomNumber = generateRandom();
    // 2. displaying dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNumber}.png`;
    // 3. checking if random number is 1 or another number, if 1 switch player
    if (randomNumber !== 1) {
      current += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent = current;
      // curScore0El.textContent = current; // change it later
    } else {
      switchPlayer();
    }
  }
});
// holding score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to total score
    scores[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check for winner, if scores is more than 100 than the winner is current player
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch players
      switchPlayer();
    }
  }
});

// restarting the game
btnNew.addEventListener('click', init);
