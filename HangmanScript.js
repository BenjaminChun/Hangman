'use strict';
import Timer from "./Timer.js";

const letterDiv = document.querySelector('.letter-div');
const hintButton = document.querySelector('.hint-btn');
const resetButton = document.querySelector('.reset-btn');
const newriddleButton = document.querySelector('.newriddle-btn');
const easyButton = document.querySelector('.easy-btn');
const normalButton = document.querySelector('.normal-btn');
const hardButton = document.querySelector('.hard-btn');
const hintDiv = document.querySelector('.hint-div');
const hintText = document.querySelector('.hint-txt');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');
const notif = document.querySelector('.notif');
const notifContent = document.querySelector('.notif-content');
const notifSpan = document.querySelector('.notif-span');
const playAgain = document.querySelector('.notif-btn');
const difficulty = document.querySelector('.Difficulty');
const Timer123 = document.querySelector('.timer');

const minutes = Math.floor(60);
const seconds = 60;

// keeping letters using javascript
// so until we put html content into letter-div,
// we cant capture letters
let letters;
let lives;

const words = new Map([
  ['blood bank', 'What is a bank but has no money?'],
  ['deck of cards', 'What has 13 hearts but no other organs?'],
  ['computer', 'What freezes when it overheats?'],
  ['short', 'What 5 letter work becomes shorter when you add two letters to it?'],
  ['swims', 'What five-letter word can be read the same upside down or right side up?'],
  ['coin', 'What has a head and a tail, but no body or legs?'],
  ['lightning', ' I touch the earth and I touch the sky, but if I touch you, you’ll likely die. What am I?'],
  ['coin', 'What has a head and a tail, but no body or legs'],
]);

// making a list of only keys from words
const word_list = [...words.keys()];

// get random word from word_list function
const getRandomWord = function (list) {
  return list[Math.floor(Math.random() * word_list.length)];
};

// random word will be selected upon every reset and init
let select_word;

const init = function (state) {
  wordDiv.innerHTML = '';
  
  if (state === 'start') {
    // putting all letters into html
    for (const i of 'abcdefghijklmnopqrstuvwxyz') {
      const html = `<button class="alpha">${i.toUpperCase()}</button>`;
      letterDiv.insertAdjacentHTML('beforeend', html);
      select_word = getRandomWord(word_list);
      lives = 6;
    }
  } 
  else if (state === 'reset') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notif.classList.add('hidden');
      select_word = getRandomWord(word_list);
      lives = 6;
      difficulty.textContent = "Easy";
      changehangman();
    });
  }
  else if (state === 'newriddle') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notif.classList.add('hidden');
      select_word = getRandomWord(word_list);
      lives = 6;
      difficulty.textContent = "Easy";
      changehangman();
    });
  }
  else if (state === 'easy') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notif.classList.add('hidden');
      select_word = getRandomWord(word_list);
      lives = 6;
      //start with picture 6 (original picture)
      liveSpan.textContent = lives;
      difficulty.textContent = "Easy";
      changehangman();
      //new Timer().el.minutes.textContent = minutes.toString().padStart(2, "0");
      //new Timer().el.seconds.textContent = seconds.toString().padStart(2, "0");
    });
  }
  else if (state === 'normal') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notif.classList.add('hidden');
      select_word = getRandomWord(word_list);
      lives = 4;
      //start with picture 4
      liveSpan.textContent = lives;
      difficulty.textContent = "Normal";
      changehangman();
    });
  }
  else if (state === 'hard') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notif.classList.add('hidden');
      select_word = getRandomWord(word_list);
      lives = 2;
      //start with picture 2
      liveSpan.textContent = lives; 
      difficulty.textContent = "Hard";
      changehangman();
    });
  }

  // capturing letters div
  letters = document.querySelectorAll('.alpha');
  liveSpan.textContent = lives;

  // putting selected word
  for (let i = 0; i < select_word.length; i++) {
    const html = `<p class="word">_</p>`;
    wordDiv.insertAdjacentHTML('beforeend', html);
  }
};
// initializing the page
init('start');

// show notification
const showNotif = function (msg) {
  notif.classList.remove('hidden');
  notifSpan.textContent = select_word;
  notifContent.textContent = `You ${msg}`;
  // lives = 3;
};

// decrease life
const decreaseLife = function () {
  lives--;
  //   console.log(lives);
  liveSpan.textContent = lives;
  if (lives === 0) {
    showNotif('lost');
  }
};

// get multiple matching indexes of pressed letter
// to the selected word
const getindexes = function (letter) {
  let indexes = [];
  [...select_word].forEach((val, i) => {
    if (val === letter) {
      const index = i;
      indexes.push(index);
    }
  });
  //   console.log(indexes);
  return indexes;
};

// check if we get complete word
const checkWord = function () {
  let val = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '_') {
      val = false;
    }
  }
  return val;
};

//change hangman display
const changehangman = function() {
  document.getElementById('hangmandisplay').src ='./Hangman Images/'+ lives + '.jpeg';
}

// letters event listener function
const letterPress = function () {
  const letter = this.textContent.toLowerCase();

  if (select_word.includes(letter)) {
    const indexes_list = getindexes(letter);
    indexes_list.forEach((val, i) => {
      wordDiv.children[val].textContent = this.textContent;
    });
    if (checkWord()) showNotif('won');
  } else {
    decreaseLife();
    changehangman();
  }
  this.classList.add('disabled');
};

// listening to letter buttons presses
letters.forEach(btn => {
  btn.addEventListener('click', letterPress);
});

// Listening to hint btn
hintButton.addEventListener('click', function () {
  hintDiv.classList.remove('hidden');
  hintText.textContent = words.get(select_word);
});

// listening to reset btn
resetButton.addEventListener('click', function () {
  init('reset');
});

// listening to newriddle btn
newriddleButton.addEventListener('click', function () {
  init('newriddle');
});

// listening to easy btn
easyButton.addEventListener('click', function () {
  init('easy');
});

// listening to normal btn
normalButton.addEventListener('click', function () {
  init('normal');
});

// listening to hard btn
hardButton.addEventListener('click', function () {
  init('hard');
});

// listening to play again button
playAgain.addEventListener('click', function () {
  init('reset');
});