import React from 'react'
import Letterboxes from './Letterboxes'

function Wordline({word,correctWord, correctLetterObject, reveal}) {
    
  const multiOccurence = {};
  for(let char of correctWord){
    multiOccurence [char] = (multiOccurence[char] || 0 ) +1
  }
  return (
    <div className="flex flex-row space-x-2 m-4">
        {word.split("").map((letter, index) => {

          const correctLocation = letter === correctWord[index]; 
          const correctLetter = letter in correctLetterObject;
          const isDuplicate = multiOccurence[letter] > 1;


          return(
            <Letterboxes
            letter={letter} 
            yellow={!correctLocation && correctLetter && reveal && !isDuplicate} 
            green={correctLocation && correctLetter && reveal && !isDuplicate}
            lightBlue={correctLocation && correctLetter && 
              reveal && isDuplicate} // correct letters in correct position but with duplicates
            darkBlue={!correctLocation && correctLetter && reveal && isDuplicate} // correct letters in wrong position but with duplicates
            key={index}
            />
          )
      })}
    </div>
  )
}

export default Wordline