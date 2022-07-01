import React, { useEffect, useRef, useState } from "react";
import { useParams, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../actions';
import Image from 'react-bootstrap/Image';
import ReactAudioPlayer from 'react-audio-player';
import { BiSkipPreviousCircle, BiSkipNextCircle} from "react-icons/bi";

function UserPracticeVocabulary() {

  const {idTopic, nameTopic} = useParams();
  const userVocabularyWithTopic = useSelector(state => state.userVocabularyWithTopic);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [checkDisplay, setCheckDisplay] = useState(false);
  const [checkOpenSuggest, setCheckOpenSuggest] = useState(false);
  const inputRef = useRef();
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
        <div className="col-sm-4 user-title-name-detail-topic">
          BÀI {nameTopic.toUpperCase()}
          {userVocabularyWithTopic.vocasWithTopic.length > 0 &&
            <div>
              Câu {indexQuestion + 1} / {userVocabularyWithTopic.vocasWithTopic.length}
              <div>
                <Image src={userVocabularyWithTopic.vocasWithTopic[indexQuestion].image} />
                <ReactAudioPlayer
                  src={userVocabularyWithTopic.vocasWithTopic[indexQuestion].file_audio}
                  controls
                />
              </div>
              <div>
                  Giải thích: {userVocabularyWithTopic.vocasWithTopic[indexQuestion].explain_vocabulary} <br />
                  Từ loại: {userVocabularyWithTopic.vocasWithTopic[indexQuestion].mean}
                  <input type="text"
                  ref={inputRef}
                  placeholder="Nhập đáp án"/>
              </div>
              <div>
                  <BiSkipPreviousCircle style={{cursor: 'pointer'}} className="mr-2" 
                  onClick={() => decrementQuestion()}
                  disabled={checkOpenSuggest}
                  />
                  <button className="btn btn-info mr-2"
                  onClick={() => suggestAnswer()}
                  >Gợi ý</button>
                  <button className="btn btn-success mr-2"
                  disabled={checkOpenSuggest}
                  onClick={() => checkAnswer()}
                  >Kiểm tra</button>
                  <BiSkipNextCircle style={{cursor: 'pointer'}}
                  disabled={checkOpenSuggest}
                  onClick={() => incrementQuestion()}
                  />
              </div>
              {checkDisplay && <button>Ghi điểm</button>}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default React.memo(UserPracticeVocabulary);
