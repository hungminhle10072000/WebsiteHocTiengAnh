import React, { useState, useEffect, useRef } from "react";
import { useSelector,useDispatch } from 'react-redux';
import "./GroupChatUser.css";
import { BiSend } from "react-icons/bi";
import { BiImageAlt } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import avata from "../../assets/images/logo.jpg";
import {Button, Modal} from 'react-bootstrap';
import { collection, addDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'


function GroupChatUser() {

  const [show, setShow] = useState(false);
  const [msg, setMsg] =useState('');
  const [srcImage, setSrcImage] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (srcMessage) => {
    setSrcImage(srcMessage.message);
    setShow(true);
  }
  const [messages, setMessages] = useState([])
  const userCurrent = useSelector((state) => state.itemUserLogin);

  const messageRef = useRef();


  async function sendMessage() {
    let collectionMessages = collection(db, 'Messages')
    await addDoc(collectionMessages, {
        email: userCurrent.username || null,
        message: msg || null,
        time: serverTimestamp(),
        type: "text" || null
    })
    setMsg('')
  }

  useEffect(() => {
    if (messageRef.current) {
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  })
  useEffect(() => {
    async function fetchDataMessages() {
      const collectionMessages = query(collection(db, 'Messages'), orderBy('time'), limit(50));
      onSnapshot(collectionMessages, (querySnapshot) => {
        setMessages(querySnapshot.docs.map(doc => doc.data()));
      });
    }
    fetchDataMessages();
  }, [])


  return (
    <>
      {
      userCurrent.id === -1 ?
      <div style={{textAlign:'center', marginTop:'150px'}}>
        <h2> Vui lòng đăng nhập để sử dụng chức năng này.</h2>
        <button className='button-user-login' onClick={()=>window.location.pathname = ('/login')}>Đăng nhập</button>
      </div> :
      <div className="group-chat">
      <div className="group-title">
        <h1>Diễn đàn trao đổi</h1>
      </div>
      <div id="content-group-chat" className="group-content" ref={messageRef}>
        {messages.map(({time, message, type, email}) => {
          const checkUser = email === userCurrent.username
          return(
            (type === 'text') ?
              <div className={checkUser ? "mes me" : "mes"} key={time}>
                  {checkUser ? null : <img className="mes-avatar" src={avata} />}
                  <div className="mes-content">
                    <span className="mes-name">
                      {email} -  {time && new Date(time.toDate()).toDateString()}
                    </span>
                    <div className="mes-value">
                      {" "}
                      {message}
                    </div>
                  </div>
                  {/* {checkUser ? <img className="mes-avatar" src={avata} /> : null} */}
              </div> :
              <div className={checkUser ? "mes me" : "mes"} key={time}>
                {checkUser ? null : <img className="mes-avatar" src={avata} />}
                <div className="mes-content">
                  <span className="mes-name">
                    {email} -  {time && new Date(time.toDate()).toDateString()}
                  </span>
                  <img  src={message} className="mes-img" onClick={() => handleShow({message})} />
                </div>
                {/* {checkUser ? <img className="mes-avatar" src={avata} /> : null} */}
              </div>
          )
        })}
      </div>

        
      <div className="send-mes">
        <input type="text" value={msg} placeholder="Nhập tin nhắn...." onChange={(e) => setMsg(e.target.value)}/>
        <div className="send-mes-icon">
          <div className="image-upload">
            <label htmlFor="file-input" >
              <BiImageAlt />
            </label>
            <input id="file-input" type="file" accept="image/*"/>
          </div>
          <BiSend onClick={() => sendMessage()}/>
        </div>
      </div>

      {/* <SendMessage /> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body><img  src={srcImage}/>
        </Modal.Body>
      </Modal>

    </div>
    }
    </>
  );
}

export default GroupChatUser;
