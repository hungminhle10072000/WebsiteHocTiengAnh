import React, { useEffect, useRef, useState } from "react";
import { useParams, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';
import Image from 'react-bootstrap/Image';
import ReactAudioPlayer from 'react-audio-player';
import { BiSkipPreviousCircle, BiSkipNextCircle} from "react-icons/bi";
import UserService from "../../services/UserService";
import { Form } from "reactstrap";

function UserPracticeVocabulary() {

  const {idTopic, nameTopic} = useParams();
  const userVocabularyWithTopic = useSelector(state => state.userVocabularyWithTopic);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [checkDisplay, setCheckDisplay] = useState(false);
  const [checkOpenSuggest, setCheckOpenSuggest] = useState(false);
  const inputRef = useRef();
  const btnWriteScore = useRef();
  const [mapResult, setMapResult] = useState();
  const dispatch =  useDispatch();

  const createResult = (listVoca) => {
    let temp = [];
    if(listVoca.length > 0){
        listVoca.forEach(item => {
          temp[item.content.trim().toUpperCase()] = ''
        });
    }
    setMapResult(temp);
  }

  const decrementQuestion = () => { 
    if(!checkOpenSuggest){
      if(indexQuestion > 0){
        let answerSubmit = typeof inputRef.current.value === 'string' ? inputRef.current.value.toUpperCase() : ''
        mapResult[userVocabularyWithTopic.vocasWithTopic[indexQuestion].content.trim().toUpperCase()] = answerSubmit;  
        setIndexQuestion(indexQuestion - 1)
        inputRef.current.value = mapResult[userVocabularyWithTopic.vocasWithTopic[indexQuestion-1].content.trim().toUpperCase()]
        inputRef.current.style.backgroundColor = "#FFFFFF"
      }
      if ((indexQuestion -1 ) < userVocabularyWithTopic.vocasWithTopic.length - 1) {
        setCheckDisplay(false);
      }
    }
  }

  const countCorrectAnswer = async () => {
    dispatch(allActions.userItemLoadingAction.openItemLoading())
    btnWriteScore.current.disabled = true;
    let answerSubmit = typeof inputRef.current.value === 'string' ? inputRef.current.value.toUpperCase() : ''
    let count = 0;
    let userId = localStorage.getItem('idUser');
    mapResult[userVocabularyWithTopic.vocasWithTopic[indexQuestion].content.trim().toUpperCase()] = answerSubmit;
    if(userVocabularyWithTopic.vocasWithTopic.length > 0){
      userVocabularyWithTopic.vocasWithTopic.forEach(item => {
        if(item.content.trim().toUpperCase() === mapResult[item.content.trim().toUpperCase()]){
          count++;
        }
      });
    }
    UserService.writeScoreService(count, userId)
    .then(
      response => {
        dispatch(allActions.userItemLoadingAction.closeItemLoading())
        alert(`Bạn đã ghi điểm thành công ${count * 10}`)
        btnWriteScore.current.disabled = false
      }
      )
    .catch(
      error => {
        dispatch(allActions.userItemLoadingAction.closeItemLoading())
        alert("Bạn đã ghi điểm thất bại !!!")
        btnWriteScore.current.disabled = false
      }
    )
  }

  const incrementQuestion = () => {
    if(!checkOpenSuggest){
      if (indexQuestion < userVocabularyWithTopic.vocasWithTopic.length - 1) {
        let answerSubmit = typeof inputRef.current.value === 'string' ? inputRef.current.value.toUpperCase() : ''
        mapResult[userVocabularyWithTopic.vocasWithTopic[indexQuestion].content.trim().toUpperCase()] = answerSubmit;  
        setIndexQuestion(indexQuestion + 1);
        inputRef.current.value = mapResult[userVocabularyWithTopic.vocasWithTopic[indexQuestion+1].content.trim().toUpperCase()]
        inputRef.current.style.backgroundColor = "#FFFFFF"
      }
      if ((indexQuestion + 1) < userVocabularyWithTopic.vocasWithTopic.length - 1) {
        setCheckDisplay(false);
      }
      if ((indexQuestion + 1) === userVocabularyWithTopic.vocasWithTopic.length - 1) {
        setCheckDisplay(true);
      }
    }
  }

  const suggestAnswer = () => {
    inputRef.current.value = userVocabularyWithTopic.vocasWithTopic[indexQuestion].content.trim().toUpperCase()
    setCheckOpenSuggest(true);
    setTimeout(closeSuggestAnswer, 3000)
  }

  const closeSuggestAnswer = () => {
    inputRef.current.value = mapResult[userVocabularyWithTopic.vocasWithTopic[indexQuestion].content.trim().toUpperCase()]
    setCheckOpenSuggest(false);
  }

  const checkAnswer = () => {
    let answerSubmit = inputRef.current.value.trim().toUpperCase()
    let correctAnswer = userVocabularyWithTopic.vocasWithTopic[indexQuestion].content.trim().toUpperCase()
    if(answerSubmit === correctAnswer){
      inputRef.current.style.backgroundColor = "#00CC00"
    } else {
      inputRef.current.style.backgroundColor = "#FF0000"
    }
  }

  useEffect(() => {
    dispatch(allActions.userItemLoadingAction.openItemLoading())
    dispatch(allActions.userVocabularyAction.actUserFetchListVocaWithTopicsRequest(nameTopic, idTopic))
  },[dispatch])

  useEffect(() => {
    createResult(userVocabularyWithTopic.vocasWithTopic)
  },[userVocabularyWithTopic.vocasWithTopic.length])

  return (  
    <div className="container-fluid main-content-user-topic user-detail-topic pb-1">
      <div className="row text-center justify-content-center">
        <div className="col-sm-12">
          <span style={{fontSize: '1.7rem', color: '#b10021', fontWeight: '600'}}>BÀI {nameTopic.toUpperCase()}</span>
          {userVocabularyWithTopic.vocasWithTopic.length > 0 &&
            <div className="mt-3 container-fluid main-content-user-topic user-detail-topic pb-1">
              <div style={{display: 'flex'}} className='text-center justify-content-center'>
                <Image src={userVocabularyWithTopic.vocasWithTopic[indexQuestion].image} 
                style={{width: '200px', height: '200px'}}/>
              <div className="ml-2 mt-4" style={{display: 'flex', flexDirection: 'column'}}>
                <ReactAudioPlayer
                  src={userVocabularyWithTopic.vocasWithTopic[indexQuestion].file_audio}
                  controls
                  className="mb-2"
                />
                <div className="user-title-order-vocabulary"
                style={{
                  position: 'inherit',
                  paddingTop: '1.2rem',
                  width: '60px',
                  height: '60px',
                }}
                >
                  <span className="user-content-order-vocabulary"
                  style={{fontSize: '1rem', margin:'0', marginTop: '15px'}}
                  >{indexQuestion + 1} / {userVocabularyWithTopic.vocasWithTopic.length}</span>
                </div>
              </div>
              </div>
              <div className="mt-3">
                  <span style={{fontWeight: 'bold'}}>Giải thích: </span>{userVocabularyWithTopic.vocasWithTopic[indexQuestion].explain_vocabulary} <br />
                  <span style={{fontWeight: 'bold'}}>Từ loại: </span>{userVocabularyWithTopic.vocasWithTopic[indexQuestion].mean}
              </div>
              <div className="mt-3">
                  <input type="text"
                  style={{
                    width: '50%',
                    padding: '12px 20px',
                    border: '1px solid #ccc',
                    margin: '8px 0px',
                    display: 'inline-block',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                  }}
                  ref={inputRef}
                  placeholder="Nhập đáp án"/>
              </div>
              <div className="mt-3">
                  <BiSkipPreviousCircle style={{cursor: 'pointer'}} className="mr-2"
                  size={40}
                  onClick={() => decrementQuestion()}
                  disabled={checkOpenSuggest}
                  />
                  <button className="btn btn-danger mr-2"
                  onClick={() => suggestAnswer()}
                  >Gợi ý</button>
                  <button className="btn btn-primary mr-2"
                  disabled={checkOpenSuggest}
                  onClick={() => checkAnswer()}
                  >Kiểm tra</button>
                  <BiSkipNextCircle style={{cursor: 'pointer'}}
                  size={40}
                  disabled={checkOpenSuggest}
                  onClick={() => incrementQuestion()}
                  />
              </div>
              {checkDisplay && <button
              className="btn btn-success mt-3"
              onClick={() => countCorrectAnswer()}
              ref = {btnWriteScore}
              >Ghi điểm</button>}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default React.memo(UserPracticeVocabulary);
