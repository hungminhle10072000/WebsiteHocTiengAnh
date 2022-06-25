import Start from '../../components/UserExercise/Start'
import Question from '../../components/UserExercise/Question'
import Questions from '../../components/UserExercise/Questions';
import End from '../../components/UserExercise/End'
import { useState } from 'react';
// import quizData from '../../data/quiz.json'
import { useEffect } from 'react/cjs/react.development';
import Modal from '../../components/UserExercise/Model';
import './css/UserExercise.css'
import axios from 'axios'
import { useSelector } from 'react-redux';
import {authHeader} from '../../services/auth-header';
import ResultService from '../../services/ResultService'
import ResultDetailService from '../../services/ResultDetailService'
import ExerciseService from '../../services/ExerciseService';
import { useParams } from 'react-router-dom';
import QuestionService from '../../services/QuestionService';

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json"
}
let listAnswer=[];
let newListAnswer=[];
// let interval;
let quizData = {
    data: []
};
function UserExercisePage() {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [time, setTime] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const userCurrent = useSelector((state) => state.itemUserLogin)
  const params = useParams()

  useEffect(() => {
    QuestionService.getQuestionByExerciseId(params.id)
    .then(res => {
        quizData.data = res.data;
      })
    ResultService.getResultByUserIdAndExerciseId(userCurrent.id,params.id).then(res=> {
        if (res.data.length > 0 && (res.data[0].totalRight > 0 || res.data[0].totalWrong > 0)) {
          ResultDetailService.getResultDetailByUserIdAndExerciseId(userCurrent.id,params.id).then(res=> {
            setAnswers(res.data)
          })
          if (step===1) {
            setStep(3)
          }
         
        }
      })
    if (step ===3) {
      newListAnswer = listAnswer.map(x => {x.userId=userCurrent.id; return x} )
      ResultDetailService.addAnswers(newListAnswer)
    }
  },[step])

  const setListAnswer = (x,index)=> {
    listAnswer[index] = x;
    setAnswers(listAnswer)
  }

  const quizStartHandler = () => {
    setStep(2)
    let resultDto = {
      exerciseId:params.id,
      userId:userCurrent.id
    }
    ResultService.addResult(resultDto)
  }

  const resetClickHandler = ()=>{
    setIsReset(true)
    ExerciseService.resetExercise(userCurrent.id,params.id)
    setActiveQuestion(0)
    setAnswers([])
    setStep(2)
    setTime(0)
    // interval = setInterval(()=> setTime(prevTime => prevTime + 1), 1000)
  }

  return (
    <div className="UserExercise">
      {step === 1&& <Start onQuizStart={quizStartHandler}/>}
      {step === 2 && <Questions data={quizData.data}
        onAnswerUpdate={setListAnswer}
        numberOfQuestion={quizData.data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
         />}
         {step === 3 && <End results={answers}
         data={quizData.data} 
         onReset={resetClickHandler}
         onAnswersCheck={()=>{setShowModal(true)}}
         time={time} />}
         {showModal && <Modal onClose={() => setShowModal(false)} results={answers} data={quizData.data}/>}
    </div>
  );
}

export default UserExercisePage;
