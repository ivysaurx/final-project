import './App.css';
import {useState, useEffect} from "react";
import FortuneDisplay from "./components/FortuneDisplay";
import EmojiDisplay from './components/EmojiDisplay';
import { collection, getDocs, addDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  
  const [fortuneTold, setFortuneTold] = useState(false);
  const handleGetFortuneTrue = () => {
      setFortuneTold(true);
    }
  const handleGetFortuneFalse = () => {
      setFortuneTold(false);
  }


  if (fortuneTold === false) {
    return (
      <div>      
        <button className = "get-fortune-btn" onClick = {handleGetFortuneTrue}>Get Fortune</button>
      </div>
    )
  } else {
      return(
      <div id="wrapper">
          <FortuneDisplay/>
          <EmojiDisplay/>
          <button id = "new-ftn" onClick = {handleGetFortuneFalse}>Get NEW fortune!</button>
  
      </div>)
  }  
}

export default App;
