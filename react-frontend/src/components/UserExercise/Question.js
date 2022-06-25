import React,{useState, useEffect, useRef} from "react";
import './Exercise.css'
import ReactAudioPlayer from 'react-audio-player';
import { Row, Col } from 'antd';

function Question({data, onAnswerUpdate,numberOfQuestion, activeQuestion, onSetActiveQuestion, onSetStep, index}) {
    const [selected, setSelected] = useState('')
    const [error, setError] = useState('')
    const radiosWrapper = useRef()
    var isListening = data.type === 1 || data.type === 2
    var isImage = data.type === 1

    useEffect(() => {
        const findCheckedInput = radiosWrapper.current.querySelector('input:checked')
        if (findCheckedInput) {
            findCheckedInput.checked = false;
        }
    },[data])

    const changeHandler = (e) => {
        setSelected(e.target.value);
        onAnswerUpdate({questionId:data.id, q:data.question, userAnswer:e.target.value},index)
        if (error) {
            setError('')
        }
    }

    const nextClickHandler = (e) => {
        if (selected === '') {
            return setError('Please select one option!')
        }
        onAnswerUpdate(prevState => [...prevState, { q:data.question, a:selected}]);
        setSelected('');
        if (activeQuestion < numberOfQuestion -1) {
            onSetActiveQuestion(activeQuestion +1)
        } else {
            onSetStep(3)
        }
    }

    return(
        <div className="card question">
            <div className="card-content">
                <div className="content">

                    <h4 className="mb-5">{"Question "+ (index + 1) +": "+ data.question}</h4>
                    
                    {isImage ?
                    <Row>
                        <Col span={12}>
                            <img style={{width:"80%", height:"100%"}} src={data.imageDescription} alt="Ảnh mô tả" />
                        </Col>
                        <Col span={12}>
                            <div className="control" ref={radiosWrapper}>
                            {isListening && <ReactAudioPlayer src={data.audio} controls/>}
                                {data.choices.map((choice, i) => (
                                    <label className="radioimage has-background-light" key={i}>
                                        <input type="radio" name={"answer" + index} value={choice} onChange={changeHandler} /> 
                                        {choice}
                                    </label>
                                ))}
                            </div>
                        </Col>
                    </Row> 
                    :
                    <div className="control" ref={radiosWrapper}>
                        {isListening && <ReactAudioPlayer className="myaudio"  src={data.audio} controls/>}
                        {data.choices.map((choice,i) => (
                            choice.trim().length > 0 && <label className="radio has-background-light" key={i}>
                                <input type="radio" name={"answer"+index} value={choice} onChange={changeHandler}/>
                                {choice}
                            </label>
                        ))}
                    </div>
                    }
                    
                    
                    {error && <div className="has-text-danger">{error}</div>}
                    {/* <button className="button is-link is-medium is-fullwidth mt-4" onClick={nextClickHandler}>Next</button> */}
                </div>
            </div>
        </div>
    )
}
export default Question;