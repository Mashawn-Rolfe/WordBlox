export function getLetterStatus(letter, index, correctWord) {
  if (letter === correctWord[index]) {
    return "green";
  }

  if (correctWord.includes(letter)) {
    return "yellow";
  }

  return "gray";
}

export function addLetter(currentWord, letterCount, key) {
  if (letterCount >= 5) {
    return currentWord;
  }

  const wordArray = currentWord.split("");
  wordArray[letterCount] = key;

  return wordArray.join("");
}

export function removeLetter(currentWord, letterCount) {
  if (letterCount === 0) {
    return currentWord;
  }

  const wordArray = currentWord.split("");
  wordArray[letterCount - 1] = " ";

  return wordArray.join("");
}

export function getGameStatus(currentWord, correctWord, guessCount, letterCount) {
  if (letterCount !== 5) {
    return "invalid";
  }

  if (currentWord === correctWord) {
    return "won";
  }

  if (guessCount === 5) {
    return "lost";
  }

  return "continue";
}

export function evaluateGuess(guess, correctWord) {
  const result = Array(guess.length).fill("gray");
  const letterCounts = {};

  // Count each letter in the correct word
  for (const letter of correctWord) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  // First pass: find correct letters in correct positions
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === correctWord[i]) {
      result[i] = "green";
      letterCounts[guess[i]]--;
    }
  }

  // Second pass: find correct letters in wrong positions
  for (let i = 0; i < guess.length; i++) {
    if (
      result[i] !== "green" &&
      letterCounts[guess[i]] > 0
    ) {
      result[i] = "yellow";
      letterCounts[guess[i]]--;
    }
  }

  return result;
}