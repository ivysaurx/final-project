import React from 'react';
import { useState, useEffect } from 'react';
import "./FortuneDisplay.css";

import { collection, getDocs, addDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";

const FortuneDisplay = () => {
  const [pastFortunes, setPastFortunes] = useState("");

  async function getFortuneFromDb() {
    try {
      const querySnapshot = await getDocs(collection(db, "fortunes"));
      const fetchedFortunes = querySnapshot.docs.map((fortune) => ({ ...fortune.data(), id: fortune.id }));
      setPastFortunes(fetchedFortunes);
    } catch (e) {
      console.error("Error fetching fortunes: ", e);
    }
  }
  useEffect(() => {
    getFortuneFromDb();
  }, []);

  let url = 'https://aphorismcookie.herokuapp.com/';

  const [fortune, setFortune] = useState("");
  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => setFortune(data.data.message))
  //     .catch(error => {
  //       console.error("Error:", error)
  //     });
  // }, []);

  async function addFortune(fortune) {
    try {
      const fortuneData = {text : fortune} 
      const fortuneCollection = collection(db, 'fortunes');
      
      const fortuneRef = await addDoc(fortuneCollection, fortuneData);
      console.log('new fortune added: ', fortuneRef.id) 
    } catch (e) {
      console.error("Error adding fortune to database: ", e);
    }
  }
  
  useEffect(()=> {
    fetch(url)
    .then((res) => res.json())
    .then((data) => setFortune(data.data.message))
    .catch(error => {
      console.error("Error:", error)})
    addFortune()
  },[]);

  if (fortune === undefined && pastFortunes === undefined) {
    return (
      <div className="intro">Still Loading...</div>
    )
  } else if (fortune === undefined && (pastFortunes !== undefined)) {
    return(
    <div>
      <div className="intro">Today's Fortune:</div>
      <div id="fortune">{pastFortunes.data}</div>
    </div>
    )
  } else if ((fortune !== undefined && (pastFortunes === undefined)) || (fortune !== undefined && pastFortunes !== undefined)){
  return (
    <div>
      <div className="intro">Today's Fortune:</div>
      <div id="fortune">{fortune}</div>
    </div>
  )
}
}

export default FortuneDisplay;