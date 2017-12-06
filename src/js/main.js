const toyry = (function () {
  let toys = [
    './img/cards/artefacto_small.png',
    './img/cards/artefacto_small.png',
    './img/cards/astronauta_small.png',
    './img/cards/astronauta_small.png',
    './img/cards/bus_small.png',
    './img/cards/bus_small.png',
    './img/cards/muñeca_small.png',
    './img/cards/muñeca_small.png',
    './img/cards/oso_small.png',
    './img/cards/oso_small.png',
    './img/cards/peluche_small.png',
    './img/cards/peluche_small.png',
    './img/cards/perro_small.png',
    './img/cards/perro_small.png',
    './img/cards/robot_small.png',
    './img/cards/robot_small.png',
    './img/cards/soldado_small.png',
    './img/cards/soldado_small.png',
    './img/cards/triciclo_small.png',
    './img/cards/triciclo_small.png'];

  let currentCard;
  let previousCard;
  let currentCardId = 0;
  let previousCardId = -1;
  let flippedCards = 0;
  let score = 0;
  let match = false;
  let matchCards = 0;
  let idArray = [];

  function _randomDeck(cards) {
    const randomCards = cards.sort(function () { return 0.5 - Math.random(); });
    return randomCards;
  }

  function _displayCard() {
    if(idArray.indexOf(this.index) !== -1){
      score -= (score == 0) ? 0 : 50;
      _score();
    }

    if (flippedCards === 2) {
      flippedCards++;
    }

    if (!this.isClicked) {
      const id = toys[this.index].replace('./img/cards/', '').replace('.png', '');
      console.log('THIS', this.index);
      const img = this.querySelector('img');
      previousCardId = currentCardId;
      console.log(previousCardId);
      currentCardId = id;
      console.log(currentCardId);
      previousCard = currentCard;
      console.log(previousCard);
      currentCard = this;
      
      // ADD ID IN IDARRAY
      idArray.push(this.index);
      

      console.log(currentCard);
      _matchCard(id);

      if (match) {
        const cards = [previousCard, currentCard];
        cards.forEach((card) => {
          card.removeEventListener('click', _displayCard);
          card.classList.add('is-deleted');
        });
      }

      img.src = toys[this.index];
      _initialPosition(this);
      this.isClicked = true;
    }
  }

  function _matchCard() {
    if (previousCardId === currentCardId) {
      match = true;
      score += 100;
      matchCards += 1;
      _score();
    } else {
      match = false;
    }
  }

  function _message() {
    if (matchCards === 10) {
      let winMsg = document.createElement('p');
      const text = document.createTextNode('You WIN!!');
      winMsg.appendChild(text);
      winMsg.className = "win-msg";
      document.getElementById('gameTable').appendChild(winMsg);
    }
  }

  function _score() {
    document.getElementById('score').innerText = score;
    _message();
  }


  function _initialPosition(card) {
    setTimeout(function () {
      currentCardId = 0;
      card.isClicked = false;
      flippedCards--;
      setTimeout(function () {
        card.querySelector('img').src = '../img/back_small.png';
      }, 500);
    }, 2000);
  }

  function _flipCard(cards) {
    cards.forEach(function (card, index) {
      card.isClicked = false;
      card.index = index;
      card.addEventListener('click', _displayCard);
    });
  }

    // RESET FUNCTION: FINISH
  function _reset() {
    document.getElementById('resetBtn').addEventListener("click", function(){
      //
    });
  }

  function init() {
    // Service Worker registration
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope)
        }, err => {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err)
        })
      })
    }
    const cards = document.querySelectorAll('.cards');
    toys = _randomDeck(toys);
    _flipCard(cards);
  }

  // LOCALSTORAGE FUNCTION: FINISH
  function localStorage(){

  }

  return {
    init: init,
  };
})();

toyry.init();

// RESET FUNCTION: FINISH
function _reset() {
  document.getElementById('resetBtn').addEventListener("click", function(){
    location.reload();
    toyry.init();
  });
}

_reset();