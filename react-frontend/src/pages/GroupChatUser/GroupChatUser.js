import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GroupChatUser.css";
import { BiSend } from "react-icons/bi";
import { BiImageAlt } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import avata from "../../assets/images/logo.jpg";
import { Button, Modal } from "react-bootstrap";
import {AiFillCloseCircle} from "react-icons/ai"
import {
  collection,
  addDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function GroupChatUser() {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [srcImage, setSrcImage] = useState("");
  const handleClose = () => setShow(false);
  const [selectImages, setSelectImages] = useState([]);
  const [fileChooseArray, setFileChooseArray] = useState([]);
  const handleShow = (srcMessage) => {
    setSrcImage(srcMessage.message);
    setShow(true);
  };
  const [messages, setMessages] = useState([]);
  const userCurrent = useSelector((state) => state.itemUserLogin);

  const messageRef = useRef();

  async function sendMessage() {
    let collectionMessages = collection(db, "Messages");
    if (msg.trim().length > 0) {
      await addDoc(collectionMessages, {
        email: userCurrent.username || null,
        message: msg || null,
        time: serverTimestamp(),
        type: "text" || null,
      });
      setMsg("");
    }
    if (fileChooseArray.length > 0) {
      setSelectImages([]);
    }
  }

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  });
  useEffect(() => {
    async function fetchDataMessages() {
      const collectionMessages = query(
        collection(db, "Messages"),
        orderBy("time")
      );
      onSnapshot(collectionMessages, (querySnapshot) => {
        setMessages(querySnapshot.docs.map((doc) => doc.data()));
      });
    }
    fetchDataMessages();
    document.addEventListener("keydown", handleKeyPress);
    return document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const imageHandleChange = (e) => {
    if (e.target.files) {
      const arrTemp = Array.from(e.target.files);
      setFileChooseArray((arr) => arr.concat(arrTemp));
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectImages((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <div className="list-img-item">
          <span className="list-img-item-close"><AiFillCloseCircle /></span>
          <img className="list-img-item-img" src={photo} key={photo} />
        </div>
      );
    });
  };

  const handleKeyPress = e => {
    e.keyCode===13 && e.ctrlKey && sendMessage(e)
  }

  return (
    <div className="chat">
      {userCurrent.id === -1 ? (
        <div style={{ textAlign: "center", marginTop: "150px" }}>
          <h2> Vui lòng đăng nhập để sử dụng chức năng này.</h2>
          <button
            className="button-user-login"
            onClick={() => (window.location.pathname = "/login")}
          >
            Đăng nhập
          </button>
        </div>
      ) : (
        <div className="group-chat">
          <div className="group-title">
            <h1>Diễn đàn trao đổi</h1>
          </div>
          <div
            id="content-group-chat"
            className="group-content"
            ref={messageRef}
          >
            {messages.map(({ time, message, type, email }) => {
              const checkUser = email === userCurrent.username;
              return type === "text" ? (
                <div className={checkUser ? "mes me" : "mes"} key={time}>
                  {checkUser ? null : (
                    <img className="mes-avatar" src={avata} />
                  )}
                  <div className="mes-content">
                    <span className="mes-name">
                      {email} - {time && new Date(time.toDate()).toDateString()}
                    </span>
                    <div className="mes-value"> {message}</div>
                  </div>
                  {/* {checkUser ? <img className="mes-avatar" src={avata} /> : null} */}
                </div>
              ) : (
                <div className={checkUser ? "mes me" : "mes"} key={time}>
                  {checkUser ? null : (
                    <img className="mes-avatar" src={avata} />
                  )}
                  <div className="mes-content">
                    <span className="mes-name">
                      {email} - {time && new Date(time.toDate()).toDateString()}
                    </span>
                    <img
                      src={message}
                      className="mes-img"
                      onClick={() => handleShow({ message })}
                    />
                  </div>
                  {/* {checkUser ? <img className="mes-avatar" src={avata} /> : null} */}
                </div>
              );
            })}
          </div>

          <div className="send-mes">
            {(fileChooseArray.length > 0) && <div className="list-img">{renderPhotos(selectImages)}</div>}
            <div className="list-content">
              <input
                onKeyDown={handleKeyPress}
                type="text"
                value={msg}
                placeholder="Nhập tin nhắn...."
                onChange={(e) => setMsg(e.target.value)}
              />
              <div className="send-mes-icon">
                <div className="image-upload">
                  <label htmlFor="file-input">
                    <BiImageAlt />
                  </label>
                  <input
                    id="file-input"
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={(e) => imageHandleChange(e)}
                  />
                </div>
                <BiSend onClick={() => sendMessage()} />
              </div>
            </div>
          </div>

          {/* <SendMessage /> */}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <img src={srcImage} />
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default GroupChatUser;