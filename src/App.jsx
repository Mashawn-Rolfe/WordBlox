import { useState, useEffect } from 'react'
import './index.css'
import Wordline from './components/Wordline'
import axios from 'axios'

const wordLength = 5; // Number of letters in the word
const totalGuesses = 6;   // Total number of guesses allowed

function App() {
  const [wordsGuessed, setWordsGuessed]
   = useState(new Array(totalGuesses).fill('     ') );  // Initialize the guessed words array with blank strings
  const [correctWord, setCorrectWord] = useState(""); // The correct word to guess
  const [correctLetterObject, setCorrectLetterObject] = useState({}); // Track letter occurrences in the correct word
  const [guessCount, setGuessCount] = useState(0); // Number of guesses made
  const [letterCount, setLetterCount] = useState(0); // Number of letters entered in the current guess
  const [currentWord, setCurrentWord] = useState("     "); // Current word being guessed
  const [gameOver, setGameOver] = useState(false); // Track if the game is over

    async function fetchWord() {
      const response = await axios.get('https://api.datamuse.com/words?sp=?????&max=1000'); // Assuming the API returns a word
      const wordList = response.data;
      //console.log(wordList);
      const randomise = Math.floor(Math.random()*wordList.length)
      const word = wordList[randomise].word;
      //const word = 'meter';
      console.log(`The correct word is: ${word}`); // Log the correct word for debugging


      const letterObject = {} // counts the occurrences of each letter in the word
    // Create an object to count the occurrences of each letter in the word
      for(let letter of word){
          // Increment the count for each letter
          letterObject[letter] = (letterObject[letter] || 0) + 1;
        }
      setCorrectWord(word)
      setCorrectLetterObject(letterObject)
    }

    useEffect(() => {
      fetchWord()
    }, [])

  // Function to handle the Enter key press
  function handleEnter(){

    // Occurs when the word is guessed correctly
    if(currentWord === correctWord){
      setGameOver(true);
      alert("Congratulations! You've guessed the word!");
      return;
    }

    // Occurs when the max number of guesses is reached
    if(currentWord !== correctWord && guessCount === totalGuesses -1 ){
      setGameOver(true);
      alert(`Game Over! The correct word was: ${correctWord}`);
      return;
    }

    // Check if the current word is the correct length
    if(letterCount !== wordLength){
        alert("Please enter a five letter word");
        return;
    }

    // Saves changes to the current word in the guessed words array
    setWordsGuessed((current) =>{
      const wordUpdated = [...current];
      wordUpdated[guessCount] = currentWord;
      return wordUpdated;
    })

    // Reset the current word and letter count for the next guess
    setGuessCount(guessCount => guessCount + 1);
    setLetterCount(0);
    setCurrentWord("     ");
  }

  // Function to handle the Backspace key press
  function handleBackspace(){
    if(letterCount===0){
      return;
    }

    // Removes the last letter from the current word and save the changes
    setCurrentWord((currentWord)=> {
      const currentWordArray = currentWord.split("");
      currentWordArray[letterCount-1] = " ";
      const newWord = currentWordArray.join("");
      return newWord;
    })

    //Decrement letter count
    setLetterCount(letterCount => letterCount - 1);


          
  }

  // Function to handle letter input
  function handleLetter(key){
    if(letterCount === wordLength){
      return
    }

    // Update the current word with the new letter
    setCurrentWord((currentWord)=> {
      const currentWordArray = currentWord.split("");
      currentWordArray[letterCount] = key;
      const newWord = currentWordArray.join("");
      return newWord;
    })

    // Update the letter count
    setLetterCount(letterCount => letterCount + 1);
  }

  // Handle keyboard inputs
  useEffect(() => {
    function handleKeyDown(event) {
        if (event.key==="Enter"){
          handleEnter()
        }else if (event.key==="Backspace"){
          handleBackspace()
        }else if (/^[a-zA-Z]$/.test(event.key)){
          handleLetter(event.key)
        }else{
          return;
        }
    }  
  
    // Add event listener for keyboard inputs
    document.addEventListener('keydown', handleKeyDown);


    return () =>{document.removeEventListener('keydown', handleKeyDown)}
  }, [handleEnter, handleBackspace, handleLetter])

  // Log the current word to the console for debugging
  useEffect(()=> {
    console.log(currentWord)
  },[currentWord])

  return (
    <div>
       {wordsGuessed.map((word, index)=> {
        if(index === guessCount){
          return (
            <Wordline word={currentWord} 
            correctWord={correctWord}
            reveal={false || gameOver} 
            correctLetterObject={correctLetterObject} 
            key={index} />
          )
        }
        return(
          <Wordline word={word} 
          correctWord={correctWord}
          reveal={true}  
          correctLetterObject={correctLetterObject} 
          key= {index} />
        )
      })}
    </div>
  )
}

export default App
