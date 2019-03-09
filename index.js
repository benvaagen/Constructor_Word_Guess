var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var hpSpells = [
    "riddikulus",
    "obliviate",
    "sectumsempra",
    "alohomora",
    "lumos",
    "expelliarmus",
    "accio",
    "crucio",
    "finestra",
    "revelio",
    "imperio",
    "stupefy",
    "impedimenta",
    "protego",
    "nox",
    "morsmordre",
    "relashio",
    "diffindo",
    "levicorpus",
    "reparo",
    "incendio",
    "aguamenti",
    "dissendium",
    "muffliato",
    "legilimens",
    "confundo",
    "aberto",
    "colloportus",
    "confringo",
    "engorgio",
    "episkey",
    "evanesco",
    "impervius",
    "liberacorpus",
    "locomotor",
    "portus",
    "protego",
    "rennervate"
];


//Pick random index from hpSpells array
var randomIndex = Math.floor(Math.random() * hpSpells.length);
var randomWord = hpSpells[randomIndex];

//Passrandom word through the word constructor
var computerWord = new Word(randomWord);

var requireNewWord = false;

//Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

//Guesses Left
var guessesLeft = 10;

function theLogic() {
    //Generates new word for Word constructor if true
    if (requireNewWord) {
        //Selects random hpSpells array
        var randomIndex = Math.floor(Math.random() * hpSpells.length);
        var randomWord = hpSpells[randomIndex];

        //Passes random word through the Word Constructor
        computerWord = new Word(randomWord);

        requireNewWord = false;
    }

    

    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    function completeCheck(key) {
        wordComplete.push(key.guessed)
    }

    //letters remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer.prompt([
            {
            type: "input",
            message: "Select letter from a to z",
            name: "userInput"
            }]).then(function (input) {
                if (
                    !letterArray.includes(input.userInput) || input.userInput.length > 1) {
                    console.log("\nTry Again!\n");
                    theLogic();
                } else {
                    if (
                        incorrectLetters.includes(input.userInput) || correctLetters.includes(input.userInput) || input.userInput === "") {
                        console.log("\nAlready Guessed or Nothing was Entered\n");
                    theLogic();
                } else {
                    var wordCheckArray = [];

                    computerWord.userGuess(input.userInput);

                    computerWord.objArray.forEach(wordCheck);
                    if (wordCheckArray.join("") === wordComplete.join("")) {
                        console.log("\nIncorrect\n");

                        incorrectLetters.push(input.userInput);
                        guessesLeft--;
                    } else {
                        console.log("\nCorrect\n");

                        correctLetters.push(input.userInput);
                    }
                    // computerWord();

                    console.log("Guesses Left: " + guessesLeft + "\n");

                    console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                    if (guessesLeft > 0) {
                        theLogic();
                    } else {
                        console.log("You have lost!\n");
                    }

                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }
                }
            }
        });
    } else {
        console.log("You Win\n");
    }
}



function restartGame() {
    inquirer.prompt([{
        type: "list",
        message: "Would you like to",
        choices: ["play again?", "exit?"],
        name: "restart"
    }]).then(function (input) {
        if (input.restart === "Play Again") {
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = [];
            theLogic();
        } else {
            return;
        }
    });
}

theLogic();