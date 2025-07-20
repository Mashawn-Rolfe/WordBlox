import React from 'react'

function Letterboxes({letter, green, yellow, lightBlue, darkBlue}) {
  let bgColor;
  if (green) {
    bgColor = 'bg-green-500';
  } else if (yellow) {
    bgColor = 'bg-yellow-500';
  }else if(lightBlue){
    bgColor = 'bg-blue-400';
  }else if(darkBlue){
    bgColor = 'bg-blue-700';
  }else{
    bgColor = 'bg-white';
  }
  return (
    <div className={`w-18 h-18 text-black text-5xl ${bgColor}`}>
        {letter}
    </div>
  )
}

export default Letterboxes