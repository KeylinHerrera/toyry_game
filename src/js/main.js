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

  function _randomDeck(cards) {
    const randomCards = cards.sort(function () { return 0.5 - Math.random(); });
    return randomCards;
  }

  function _displayCard() {
    if (flippedCards === 2) {
      flippedCards++;
    }

    if (!this.isClicked) {
      const id = toys[this.index].replace('img/cards/', '').replace('.png', '');
      const img = this.querySelector('img');

      previousCardId = currentCardId;
      currentCardId = id;

      previousCard = currentCard;
      currentCard = this;

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

  function _mensage() {
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
    _mensage();
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

  function init() {
    const cards = document.querySelectorAll('.cards');
    toys = _randomDeck(toys);
    _flipCard(cards);
  }

  return {
    init: init,
  };
})();

toyry.init();
