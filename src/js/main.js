const toyry = (() => {
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
  const idArray = [];

  function randomDeck(cards) {
    const randomCards = cards.sort(() => { return 0.5 - Math.random(); });
    return randomCards;
  }

  function message() {
    if (matchCards === 10) {
      const winMsg = document.createElement('p');
      const text = document.createTextNode('You WIN!!');
      winMsg.appendChild(text);
      winMsg.className = 'win-msg';
      document.getElementById('gameTable').appendChild(winMsg);
    }
  }

  function scoreGame() {
    document.getElementById('score').innerText = score;
    message();
  }

  function matchCard() {
    if (previousCardId === currentCardId) {
      match = true;
      score += 100;
      matchCards += 1;
      scoreGame();
    } else {
      match = false;
    }
  }

  function initialPosition(card) {
    setTimeout(() => {
      currentCardId = 0;
      card.isClicked = false;
      flippedCards--;
      setTimeout(() => {
        card.querySelector('img').src = '../img/back_small.png';
      }, 500);
    }, 2000);
  }

  function displayCard() {
    if (idArray.indexOf(this.index) !== -1) {
      score -= (score === 0) ? 0 : 50;
      scoreGame();
    }

    if (flippedCards === 2) {
      flippedCards++;
    }

    if (!this.isClicked) {
      const id = toys[this.index].replace('./img/cards/', '').replace('.png', '');
      const img = this.querySelector('img');
      previousCardId = currentCardId;
      currentCardId = id;

      previousCard = currentCard;
      currentCard = this;
      idArray.push(this.index);

      matchCard(id);

      if (match) {
        const cards = [previousCard, currentCard];
        cards.forEach((card) => {
          card.removeEventListener('click', displayCard);
          card.classList.add('deleted');
        });
      }

      img.src = toys[this.index];
      initialPosition(this);
      this.isClicked = true;
    }
  }

  function flipCard(cards) {
    cards.forEach((card, index) => {
      card.isClicked = false;
      card.index = index;
      card.addEventListener('click', displayCard);
    });
  }

  function init() {
    // Service Worker registration
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js').then((registration) => {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (err) => {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
    const cards = document.querySelectorAll('.cards');
    toys = randomDeck(toys);
    flipCard(cards);
  }

  return { init };
})();

toyry.init();

// RESET FUNCTION: FINISH
function reset() {
  document.getElementById('resetBtn').addEventListener('click', () => {
    // location.reload();
    toyry.init();
  });
}

reset();
