const cards = document.querySelectorAll(".card-item");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {

    if(lockBoard) return;

    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 

    hasFlippedCard = false;
    secondCard = this;

    math();
}

function math() {
    let isMath = firstCard.dataset.framework === secondCard.dataset.framework;
    isMath ? disableCards() : unFlipCards();
    console.log("done!!!");
}

function disableCards() {
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);

    resetBoard();
}

function unFlipCards() {

    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach( card => card.addEventListener('click', flipCard));