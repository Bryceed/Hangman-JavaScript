document.addEventListener("DOMContentLoaded", function() {
    words = InitialAJAX();
    console.log(words);

    // create the game
    var game = new Hangman(words);
    game.createGame();

    var elements = document.getElementsByClassName("button");

    var hintBtn = function() {
        game.guessLetter(this.value);
        this.disabled = true;
        if (game.isGameOver()) {
            game.gameOver();
        }
    };

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', hintBtn, false);
    }

    if (!document.getElementById("hint-btn")) {
        newbtn = document.getElementById("game").appendChild(document.createElement("button"));
        newbtn.id = "hint-btn";
        newbtn.innerHTML = "Hint";
    }
    document.getElementById("hint-btn").addEventListener('click', function() {
        game.getHint();
    });

    if (!document.getElementById("new-game-btn")) {
        newbtn = document.getElementById("game").appendChild(document.createElement("button"));
        newbtn.id = "new-game-btn";
        newbtn.innerHTML = "New Game";
    }
    document.createElement("new-game-btn").addEventListener('click', function() {
        game.resetGame();
        game.createGame();
    });


});











function Hangman(words) {
    this.words = ["azulard", "testado"];
    this.word = "";
    this.wordLength = 0;
    this.guessedLetters = [];
    this.guessesLeft = 6;
    this.guessed = false;
    this.hint = "";
    this.hintUsed = false;
    this.createGame = function() {
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        this.wordLength = this.word.length;
        this.guessedLetters = [];
        this.guessesLeft = 6;
        this.guessed = false;
        this.hint = "";
        this.hintUsed = false;
        this.display();
    }
    this.display = function() {
        var display = "";
        for (var i = 0; i < this.wordLength; i++) {
            if (this.guessedLetters.indexOf(this.word[i]) > -1) {
                display += this.word[i];
            } else {
                display += "_";
            }
        }
        document.getElementById("word").innerHTML = display;
        document.getElementById("guesses-left").innerHTML = this.guessesLeft;
        document.getElementById("guessed-letters").innerHTML = this.guessedLetters.join(", ");
        document.getElementById("hint").innerHTML = this.hint;
        if (this.guessesLeft === 0) {
            document.getElementById("word").innerHTML = this.word;
            document.getElementById("message").innerHTML = "You lose!";
        } else if (this.word === display) {
            document.getElementById("message").innerHTML = "You win!";
        }
        // display the hangman using the HANGMAN array and the guessesLeft variable as the index
        // convert spaces to non-breaking spaces for eac
        let hangman = HANGMAN.join(" ").replace(/ /g, " ");
        document.getElementById("the-hangman").innerHTML = hangman[this.guessesLeft];
    }
    this.guessLetter = function(letter) {
        if (this.guessedLetters.indexOf(letter) > -1) {
            return;
        }
        if (this.word.indexOf(letter) > -1) {
            for (var i = 0; i < this.wordLength; i++) {
                if (this.word[i] === letter) {
                    this.guessedLetters[i] = letter;
                }
            }
        } else {
            this.guessesLeft--;
        }
        this.display();
    }
    this.hint = function() {
        if (this.hintUsed) {
            return;
        }
        this.hint = this.word.split("").join(" ");
        this.hintUsed = true;
        this.display();
    }
    this.isGameOver = function() {
        return this.guessesLeft === 0 || this.word === this.guessedLetters.join("");
    }
    this.gameOver = function() {
        document.getElementById("message").innerHTML = "You lose!";
    }
    this.getHint = function() {
        this.hint();
    }
    this.resetGame = function() {
        this.createGame();
    }
}


function AJAXRequest(method, url, callback) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });

            }
        };
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}


// create a variable to hold the number of guesses
var guesses = 0;
var words = [];


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

async function InitialAJAX() {
    let allWords = [];
    // await code here
    let response = await AJAXRequest("GET", "words-pt.txt");
    allWords = response.split("\n");


    for (var i = 0; i < allWords.length; i++) {
        if (allWords[i].length != 7) {
            // if it doesn't, remove it from the array
            allWords.splice(i, 1);
            i--;
        }
    }
    console.log(allWords.length);
    // based on the number of words in the array, remove random words until there are 200
    while (allWords.length > 200) {
        var randomIndex = Math.floor(Math.random() * allWords.length);
        allWords.splice(randomIndex, 1);
    }
    // randomize the array index order for the words
    allWords = shuffle(allWords);

    console.log(allWords.length);
    return allWords;
};

const HANGMAN = ["" +
    "  +---+\n" +
    "  |   |\n" +
    "      |\n" +
    "      |\n" +
    "      |\n" +
    "      |\n" +
    "=========", "" +
    "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    "      |\n" +
    "      |\n" +
    "      |\n" +
    "=========", "" +
    "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    "  |   |\n" +
    "      |\n" +
    "      |\n" +
    "=========", "" +
    "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    " /|   |\n" +
    "      |\n" +
    "      |\n" +
    "=========", "" +
    "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    " /|\\  |\n" +
    "      |\n" +
    "      |\n" +
    "=========", "" +
    "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    " /|\\  |\n" +
    " /    |\n" +
    "      |\n" +
    "=========", "" +
    "  +---+\n" +
    "  |   |\n" +
    "  O   |\n" +
    " /|\\  |\n" +
    " / \\  |\n" +
    "      |\n" +
    "========="
];