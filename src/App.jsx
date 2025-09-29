import { useEffect, useRef, useState } from "react";
import Dice from "./component/Dice"
import { nanoid } from "nanoid"

import Confetti from "react-confetti"


function App() {


  // const [diceItemList] = useState(() =>
  //   Array(10).fill(0).map(() => Math.ceil(Math.random() * 6))
  // );


  const [diceItemList, setDiceValues] = useState( () => generateRandomDice());

  const gameWon = diceItemList.every(die => die.isHeld) && 
  diceItemList.every(die => die.value === diceItemList[0].value)

  const buttonref = useRef(null);

  
  
  
  useEffect(() => {
    if(gameWon){
        buttonref.current.focus();
    }
  });
  
  function generateRandomDice() {
    return Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
    ));
  }



  



function markHeld(diceId) {
  setDiceValues(prev =>
    prev.map(d => (d.id === diceId ? { ...d, isHeld: !d.isHeld } : d))
  );
}



// useEffect(() => {
//   const allHeld = diceItemList.every(d => d.isHeld);

//   console.log('diceItemList[0].value: ',diceItemList[0].value);
  

//   const allSame = diceItemList.every(d => d.value === diceItemList[0].value);

//   console.log('DDDD: ',allSame);
  
//   // setGameOver(allHeld);

//   if (allHeld && allSame) {
//     alert("The game finished!!");
//   }
// }, [diceItemList]);


  function rollTheDice() {

    if(gameWon){
    

      const randomArray = generateRandomDice();


      setDiceValues(randomArray);
    }else{
      setDiceValues((prevDice) =>
        prevDice.map((d) =>
          d.isHeld
            ? d
            : { ...d, value: Math.ceil(Math.random() * 6) }
        )
      );
    }
 
  }

  const diceItems = diceItemList.map((dice) => {
    return <Dice key={dice.id} dice={dice} freeze={() => markHeld(dice.id)} />;
  });


  return <main>

{
  gameWon && <Confetti />
}

    <h1 className="title">Dice To Match</h1>
    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>


    <div className="dice-container">
      {
        diceItems
      }
    </div>
    <div className="roll-container">
      <button type="button" ref={buttonref} className="roll-button" onClick={rollTheDice}>{gameWon?'New Game':'Roll'} </button>
    </div>
  </main>

}

export default App
