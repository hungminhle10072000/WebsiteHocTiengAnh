import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function SendMessage() {
  const [msg, setMsg] =useState('');
  
  async function sendMessage(e) {
    e.preventDefault();
    let collectionMessages = collection(db, 'Messages')
    await addDoc(collectionMessages, {
        email: "dunguser" || null,
        message: msg || null,
        time: serverTimestamp() || null,
        type: "text" || null
    })
    setMsg('')
  }

  return (
    <div>
        <form onSubmit={sendMessage}>
            <input placeholder='Message...' value={msg} onChange={(e) => setMsg(e.target.value)}/>
            <button style={{marginLeft: '1%'}} type="submit">send</button>
        </form>
    </div>
  )
}

export default SendMessage