import React, { useEffect, useState } from "react";
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
  const [indexColor, setIndexColor] = useState(0);
  const [checkDisplay, setCheckDisplay] = useState(false);
  const [checkOpenSuggest, setCheckOpenSuggest] = useState(false);
  const dispatch =  useDispatch();
  const mapResult = [];

  const createResult = (listVoca) => {
    if(listVoca.length > 0){
      listVoca.forEach(item => {
        mapResult.push("");
      });
    }
  }

  const decrementQuestion = () => {
    console.log("Gọi đến thằng này");
    if(!checkOpenSuggest){
      let answerSubmit = ""; ///Lấy giá trị của text
      mapResult[userVocabularyWithTopic.vocasWithTopic[indexQuestion].content.trim()] = answerSubmit;
      if(indexQuestion > 0){
        setIndexQuestion(indexQuestion - 1)
      }
      if ((indexQuestion -1 ) < userVocabularyWithTopic.vocasWithTopic.length - 1) {
        setCheckDisplay(false);
      }
      // Gán giá trị của input là giá trị gợi ý
    }
  }

  const incrementQuestion = () => {
    if(!checkOpenSuggest){
      let answerSubmit = ""; ///Lấy giá trị của text
      mapResult[userVocabularyWithTopic.vocasWithTopic[indexQuestion].content.trim()] = answerSubmit;
      if (indexQuestion < userVocabularyWithTopic.vocasWithTopic.length - 1) {
        setIndexQuestion(indexQuestion + 1);
      }
      if ((indexQuestion + 1) < userVocabularyWithTopic.vocasWithTopic.length - 1) {
        setCheckDisplay(false);
      }
      if ((indexQuestion + 1) === userVocabularyWithTopic.vocasWithTopic.length - 1) {
        console.log("Chay vao day");
        setCheckDisplay(true);
      }
      // Gán giá trị của input là giá trị gợi ý
    }
  }

  useEffect(() => {
    dispatch(allActions.userItemLoadingAction.openItemLoading())
    dispatch(allActions.userVocabularyAction.actUserFetchListVocaWithTopicsRequest(nameTopic, idTopic));
  },[dispatch])

  return (
    createResult(userVocabularyWithTopic.vocasWithTopic),
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
                  <input type="text" placeholder="Nhập đáp án"/>
              </div>
              <div>
                  <BiSkipPreviousCircle style={{cursor: 'pointer'}} className="mr-2" 
                  onClick={() => decrementQuestion()}
                  />
                  <button className="btn btn-info mr-2">Gợi ý</button>
                  <button className="btn btn-success mr-2">Kiểm tra</button>
                  <BiSkipNextCircle style={{cursor: 'pointer'}}
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
