const words = ["javascript", "html", "css", "python", "java", "ruby", "php", "swift", "typescript", "csharp"];
const hints = {
    "javascript": "This language is often used for web development, and it is supported by all modern web browsers.",
    "html": "This language provides the structure for web pages.",
    "css": "This language is used to style the HTML elements on a web page.",
    "python": "This language is known for its simplicity and readability, making it a popular choice for beginners.",
    "java": "This language is widely used for developing mobile apps, web apps, and large-scale enterprise applications.",
    "ruby": "This language is known for its elegant syntax and productivity-oriented features.",
    "php": "This language is widely used for server-side web development.",
    "swift": "This language is developed by Apple and is used for building apps for iOS, macOS, watchOS, and tvOS.",
    "typescript": "This language is a superset of JavaScript and adds optional static typing.",
    "csharp": "This language is developed by Microsoft and is commonly used for building Windows applications and game development."
};
let currentWord, scrambledWord, lives, timerInterval, timeLeft, score = 0; // Include only necessary variables
let isTimerRunning = false; // Track if the timer is running
let answeredWords = []; // List of words that have been answered correctly

function initializeGame() {
    // Set initial lives to 3
    lives = 3; 
    // Randomly select a word from the list of words that haven't been answered yet
    let remainingWords = words.filter(word => !answeredWords.includes(word));
    currentWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
    scrambledWord = scramble(currentWord);
    document.getElementById("word-container").textContent = scrambledWord;
    document.getElementById("message").textContent = "";
    document.getElementById("guess").value = "";
    
    // Automatically show hint
    const hintSentence = hints[currentWord.toLowerCase()];
    if (hintSentence) {
        document.getElementById("hint-text").textContent = "Hint: " + hintSentence;
    } else {
        document.getElementById("hint-text").textContent = "Hint: No hint available.";
    }

    // Start timer only if it's not running
    if (!isTimerRunning) {
        startTimer();
        isTimerRunning = true;
    }
}

// Update the startTimer function to start the timer
function startTimer() {
    timeLeft = timeLeft || 60; // Set initial time left or retain current time left if it exists
    const timerDisplay = document.getElementById("timer");

    timerInterval = setInterval(() => {
        timerDisplay.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeUp(); // Handle time up
        }

        timeLeft--;
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

function scramble(word) {
    return word.split('').sort(function(){return 0.5-Math.random()}).join('');
}

function handleTimeUp() {
    alert("Times up! Game over. Try again next time.");
    resetGame(); // Reset the game when time is up
}

function handleCorrectGuess() {
    score++; // Increment the score
    document.getElementById("score").textContent = `Score: ${score}`; // Update score display
    stopTimer(); // Stop the timer
    document.getElementById("message").textContent = "Correct!";
    alert("Correct! Let's proceed to the next word.");
    
    // Add the current word to the list of answered words
    answeredWords.push(currentWord);
    
    if (score === words.length) { // Check if all questions are answered correctly
        alert("Congratulations! You answered all the questions!");
        resetGame(); // Reset the game when all words are answered correctly
    } else {
        initializeGame(); // Proceed to the next word
    }
}

function resetGame() {
    score = 0; // Reset score
    lives = 3; // Reset lives
    stopTimer(); // Stop the timer
    location.reload(); // Refresh the page to reset everything
}

function handleIncorrectGuess() {
    lives--;
    if (lives === 0) {
        alert("Better luck next time!");
        resetGame(); // Reset the game when lives are depleted
    } else {
        document.getElementById("message").textContent = "Time's up! Lives left: " + lives;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("start-game").addEventListener("click", function() {
        document.getElementById("lobby").style.display = "none"; // Hide lobby
        document.getElementById("container").style.display = "block"; // Show game container
        initializeGame();
    });

    document.getElementById("submit").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const guess = document.getElementById("guess").value.toLowerCase();
        if (guess === currentWord) {
            handleCorrectGuess(); // Handle correct guess
        } else {
            handleIncorrectGuess(); // Handle incorrect guess
        }
    });

    document.getElementById("new-word").addEventListener("click", function() {
        stopTimer(); // Stop the timer when next word button is clicked
        initializeGame(); // Initialize the next word
    });

    document.getElementById("back-to-lobby").addEventListener("click", function() {
        location.reload(); // Auto-refresh when "Back to Lobby" button is clicked
    });
});

