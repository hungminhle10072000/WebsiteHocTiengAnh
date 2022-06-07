import React, { useState } from "react";
import "./GroupChatUser.css";
import { BiSend } from "react-icons/bi";
import { BiImageAlt } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import avata from "../../assets/images/logo.jpg";
import {Button, Modal} from 'react-bootstrap'

function GroupChatUser() {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <div className="group-chat">
      <div className="group-title">
        <h1>Diễn đàn trao đổi</h1>
      </div>
      <div className="group-content">
        <div className="time-date">
          <hr /> <span>06/06/2022</span> <hr />
        </div>
        <div className="mes">
          <img className="mes-avatar" src={avata} />
          <div className="mes-content">
            <span className="mes-name">
              Ngô Xuân Thắng - 16h30p 06/06/2022{" "}
            </span>
            <div className="mes-value">
              {" "}
              Hôm nay là một ngày quần què Hôm nay là một ngày quần quèHôm nay
              là một ngày quần quèHôm nay là một ngày quần què Hôm nay là một
              ngày quần què Hôm nay là một ngày quần quèHôm nay là một ngày quần
              quèHôm nay là một ngày quần què
            </div>
          </div>
        </div>

        <div className="mes me">
          <div className="mes-content">
            <div className="mes-name">Ngô Xuân Thắng - 16h30p 06/06/2022 </div>
            <div className="mes-value">
              {" "}
              Hôm nay là một ngày quần què Hôm nay là một ngày quần quèHôm nay
              là một ngày quần quèHôm nay là một ngày quần què Hôm nay là một
              ngày quần què Hôm nay là một ngày quần quèHôm nay là một ngày quần
              quèHôm nay là một ngày quần què
            </div>
          </div>
          <img className="mes-avatar" src={avata} />
        </div>


        {/* ////////////////////////////////// */}

        <div className="time-date">
          <hr /> <span>07/06/2022</span> <hr />
        </div>
        <div className="mes">
          <img className="mes-avatar" src={avata}/>
          <div className="mes-content">
            <span className="mes-name">
              Ngô Xuân Thắng - 16h30p 06/06/2022{" "}
            </span>
            <img  src={'https://picsum.photos/200/300'} className="mes-img" onClick={handleShow} />
          </div>
        </div>

        <div className="mes me">
          <div className="mes-content">
            <div className="mes-name">Ngô Xuân Thắng - 16h30p 06/06/2022 </div>
            <img  src={avata} className="mes-img" onClick={handleShow} />
          </div>
          <img className="mes-avatar" src={avata} />
        </div>


        {/* ////////////////////////////////////////////////////// */}


        <div className="time-date">
          <hr /> <span>07/06/2022</span> <hr />
        </div>
        <div className="mes">
          <img className="mes-avatar" src={avata}  />
          <div className="mes-content">
            <span className="mes-name">
              Ngô Xuân Thắng - 16h30p 06/06/2022{" "}
            </span>
            <p className="mes-value">
              {" "}
              Hôm nay là một ngày quần què Hôm nay là một ngày quần quèHôm nay
              là một ngày quần quèHôm nay là một ngày quần què Hôm nay là một
              ngày quần què Hôm nay là một ngày quần quèHôm nay là một ngày quần
              quèHôm nay là một ngày quần què
            </p>
          </div>
        </div>

        <div className="mes">
          <img className="mes-avatar" src={avata}  />
          <div className="mes-content">
            <span className="mes-name">
              Ngô Xuân Thắng - 16h30p 06/06/2022{" "}
            </span>
            <p className="mes-value">
              Hôm nay là một ngày quần què 
            </p>
          </div>
        </div>

        <div className="mes me">
          <div className="mes-content">
            <div className="mes-name">Ngô Xuân Thắng - 16h30p 06/06/2022 </div>
            <p className="mes-value">
              {" "}
              Hôm nay là một ngày quần què Hôm nay là một ngày quần quèHôm nay
              là một ngày quần quèHôm nay là một ngày quần què Hôm nay là một
              ngày quần què Hôm nay là một ngày quần quèHôm nay là một ngày quần
              quèHôm nay là một ngày quần què
            </p>
            
          </div>
          <img className="mes-avatar" src={avata} />
        </div>
        <div className="mes me">
          <div className="mes-content">
            <div className="mes-name">Ngô Xuân Thắng - 16h30p 06/06/2022 </div>
            <p className="mes-value">
                Hôm nay là một ngày quần què
            </p>
          </div>
          <img className="mes-avatar" src={avata} />
        </div>
      </div>


      <div className="send-mes">
        <input type="text" placeholder="Nhập messenger" />
        <div className="send-mes-icon">
          <div className="image-upload">
            <label for="file-input">
              <BiImageAlt />
            </label>
            <input id="file-input" type="file" />
          </div>
          <BiSend />
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body><img  src={"https://picsum.photos/500/600"}/></Modal.Body>
      </Modal>

    </div>
  );
}

export default GroupChatUser;
