import React, {useEffect, useState} from 'react'
import {formatTime} from '../../utils/index'

function End({results, data, onReset,  onAnswersCheck, time}) {
    const [correctAnswers, setCorrectAnswers] = useState(0)
    useEffect(()=>{
        let correct =0;
        results.forEach((result,index) => {
            if (result.userAnswer === data[index].answer) {
                correct++;
            }
        });
        setCorrectAnswers(correct);
    },[results,data])
    return(
        <div className='card'>
            <div className='card-content'>
                <div className='content'>
                    <h3>Kết quả của bạn</h3>
                    <p>{correctAnswers} / {data.length}</p>
                    <p><strong>{Math.floor(correctAnswers * 100 / data.length)} %</strong></p>
                    <p><strong style={{color:'green'}}>Điểm số: {correctAnswers * 10}</strong></p>
                    <button className='button is-info mr-2' onClick={onAnswersCheck}>Xem lại kết quả</button>
                    <button className='button is-info mr-2' onClick={onReset}>Làm lại bài tập</button>
                </div>
            </div>
        </div>
    )
}

export default End;