import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../actions';
import { Row, Col } from 'antd';
const { Option } = Select;

function SelectOneForm({ 
    onChangeExerciseId, 
    onChangeVocabularyTopicId, 
    onChangeGrammarId,
    exerciseId,
    vocaTopicId,
    grammarId 
}) {
    const [valueGrammar,setValueGrammar] = useState('')
    const [valueVocaTopic,setValueVocaTopic] = useState('')
    const [valueExercise,setValueExercise] = useState('')
    const dispatch = useDispatch();
    const grammarList = useSelector(state => state.grammarsReducer);
    const vocaTopicList = useSelector(state => state.vocabularyTopics);
    const exerciseList = useSelector(state => state.exerciseReducer)
    var grammarDtos = grammarList.map(x => {
        return {
            "id": x.id,
            "title": x.name,
            "type": 1
        };
    })
    var vocaTopicDtos = vocaTopicList.map(x => {
        return {
            "id": x.id,
            "title":x.name,
            "type": 2
        }
    })

    var exerciseDtos = exerciseList.map(x => {
        return {
            "id": x.id,
            "title":x.name,
            "type": 3
        }
    })

    useEffect(() => {
        var grammarDto= grammarDtos.find(x=> x.id ===grammarId)
        var vocaTopicDto= vocaTopicDtos.find(x=> x.id ===vocaTopicId)
        var exerciseDto= exerciseDtos.find(x=> x.id ===exerciseId)

        if (grammarDto) {
            setValueGrammar(grammarDto.title)
        }
        if (vocaTopicDto) {
            setValueVocaTopic(vocaTopicDto.title)
        }
        if (exerciseDto) {
            setValueExercise(exerciseDto.title)
        }
        
    }, [grammarList,vocaTopicList,exerciseList])

    

    useEffect(() => {
        dispatch(allActions.grammarAction.actFetchGrammarRequest());
        dispatch(allActions.vocabularyTopicAction.actFetchVocaTopicsRequest())
        dispatch(allActions.adminExerciseAction.actFetchAllExerciseRequest())
        var grammarDto= grammarDtos.find(x=> x.id ===grammarId)
        var vocaTopicDto= vocaTopicDtos.find(x=> x.id ===vocaTopicId)
        var exerciseDto= exerciseDtos.find(x=> x.id ===exerciseId)

        if (grammarDto) {
            setValueGrammar(grammarDto.title)
        }
        if (vocaTopicDto) {
            setValueVocaTopic(vocaTopicDto.title)
        }
        if (exerciseDto) {
            setValueExercise(exerciseDto.title)
        }
    }, [])

    function handleChangeGrammarId(value) {
        if (value) {
            const obj = JSON.parse(value)
            onChangeGrammarId(obj['id'])
            setValueGrammar(obj['title'])
        } else {
            onChangeGrammarId(-1)
            setValueGrammar(null)
        }
    }

    function handleChangeExerciseId(value) {
        if (value) {
            const obj = JSON.parse(value)
            onChangeExerciseId(obj['id'])
            setValueExercise(obj['title'])
        } else {
            onChangeExerciseId(-1)
            setValueExercise(null)
        }
    }

    function handleChangeVocabularyTopicId(value) {
        if (value) {
            const obj = JSON.parse(value)
            onChangeVocabularyTopicId(obj['id'])
            setValueVocaTopic(obj['title'])
        } else {
            onChangeVocabularyTopicId(-1)
            setValueVocaTopic(null)
        }
    }

    return (
        <>
            <Row>
                {/* <Col span={8}>
                    <label>Lý thuyết</label>
                    <Select
                        value={valueGrammar}
                        // defaultValue={grammarDto ? grammarDto.title : undefined}
                        allowClear
                        onChange={handleChangeGrammarId}
                        showSearch
                        style={{ width: 220 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        
                        {grammarDtos.map(x => <Option key={JSON.stringify(x)}>{x.title}</Option>)}
                    </Select>
                </Col> */}
                <Col span={12}>
                    <label style={{marginRight: '10px'}}>Từ vựng:</label>
                    <Select
                        value={valueVocaTopic}
                        // defaultValue={vocaTopicDto ? vocaTopicDto.title : null}
                        allowClear
                        onChange={handleChangeVocabularyTopicId}
                        showSearch
                        style={{ width: 220 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        {vocaTopicDtos.map(x => <Option key={JSON.stringify(x)}>{x.title}</Option>)}
                    </Select>
                </Col>
                <Col span={12}>
                    <label style={{marginRight: '10px'}}>Bài tập:</label>
                    <Select
                        value={valueExercise}
                        allowClear
                        onChange={handleChangeExerciseId}
                        showSearch
                        style={{ width: 220 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        {exerciseDtos.map(x => <Option key={JSON.stringify(x)}>{x.title}</Option>)}
                    </Select>
                </Col>
            </Row>

        </>
    );
}
export default SelectOneForm;