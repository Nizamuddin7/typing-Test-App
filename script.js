document.addEventListener("DOMContentLoaded", () => {
    const sentences = [
      "The quick brown fox jumps over the lazy dog.",
      "Sphinx of black quartz, judge my vow.",
      "Pack my box with five dozen liquor jugs.",
      "How vexingly quick daft zebras jump!"
    ];
  
    const startButton = document.getElementById("start-btn");
    const inputField = document.getElementById("input");
    const timerDisplay = document.getElementById("timer");
    const resultDiv = document.getElementById("result");
    const speedDisplay = document.getElementById("speed");
    const accuracyDisplay = document.getElementById("accuracy");
    const retryButton = document.getElementById("retry-btn");
    const endTestButton = document.getElementById("end-test-btn");
    const sentenceDisplay = document.getElementById("sentence");
  
    let timer = 30;
    let intervalId;
    let currentSentence = "";
    let totalCharacters = 0;
    let correctCharacters = 0;
  
    function startTest() {
      // Select a random sentence
      currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
      sentenceDisplay.textContent = currentSentence;
  
      // Enable input and "End Test Now" button, disable start button
      inputField.disabled = false;
      startButton.disabled = true;
      endTestButton.disabled = false;
      inputField.value = "";
      inputField.focus();
  
      // Reset variables
      totalCharacters = currentSentence.length;
      correctCharacters = 0;
      timer = 30;
      timerDisplay.textContent = `00:${timer}`;
      resultDiv.style.display = "none";
  
      // Start the timer
      intervalId = setInterval(() => {
        timer--;
        timerDisplay.textContent = `00:${timer < 10 ? "0" : ""}${timer}`;
  
        if (timer === 0) {
          endTest();
        }
      }, 1000);
    }
  
    function endTest() {
      clearInterval(intervalId);
  
      // Disable input, start button, and "End Test Now" button
      inputField.disabled = true;
      startButton.disabled = true;
      endTestButton.disabled = true;
  
      // Calculate speed and accuracy
      calculateResults();
    }
  
    function endTestNow() {
      clearInterval(intervalId); // Stop the timer
  
      // Disable input, start button, and "End Test Now" button
      inputField.disabled = true;
      startButton.disabled = true;
      endTestButton.disabled = true;
  
      // Calculate and display results
      calculateResults();
    }
  
    function calculateResults() {
      const typedText = inputField.value;
      const typedWords = typedText.split(" ").filter(word => word).length;
      const correctCharactersTyped = [...typedText].filter(
        (char, index) => char === currentSentence[index]
      ).length;
  
      const speed = Math.round((typedWords * 60) / (30 - timer));
      const accuracy = Math.round((correctCharactersTyped / totalCharacters) * 100);
  
      // Display results
      speedDisplay.textContent = speed;
      accuracyDisplay.textContent = accuracy;
      resultDiv.style.display = "block";
    }
  
    function retryTest() {
      // Reset UI and variables
      startButton.disabled = false;
      inputField.disabled = true;
      endTestButton.disabled = true;
      inputField.value = "";
      timerDisplay.textContent = "00:30";
      sentenceDisplay.textContent = "";
      resultDiv.style.display = "none";
    }
  
    // Event Listeners
    startButton.addEventListener("click", startTest);
    retryButton.addEventListener("click", retryTest);
    endTestButton.addEventListener("click", endTestNow);
  });
  