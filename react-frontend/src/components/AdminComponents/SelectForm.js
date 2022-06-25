import { Select } from 'antd';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import allActions from '../../actions';
const { Option } = Select;

function SelectForm( {onAttachmentData} ) {
  const dispatch = useDispatch();
  const grammarList = useSelector(state=> state.grammarsReducer);
  const vocaTopicList = useSelector(state => state.vocabularyTopics);
  const children = [];
  var lstAttachmentDTO = []
  var grammarDtos = grammarList.map(x=> {
    return {
      "id":x.id,
      "title":"NP: "+x.name,
      "type":1
    };
  })
  var vocaDtos = vocaTopicList.map(x => {
    return {
      "id":x.id,
      "title":"TV: "+x.name,
      "type":2
    }
  })

  lstAttachmentDTO = [...grammarDtos, ...vocaDtos]
  for (let i = 0 ;i< grammarDtos.length; i++ ) {
    children.push(<Option key={JSON.stringify(grammarDtos[i])}>{grammarDtos[i].title}</Option>)
  }
  for (let i = 0 ;i< vocaDtos.length; i++ ) {
    children.push(<Option key={JSON.stringify(vocaDtos[i])}>{vocaDtos[i].title}</Option>)
  }
      
  function handleChange(value) {
    var valueArrObj = value.map(x => JSON.parse(x))
    onAttachmentData(valueArrObj)
  }
  useEffect(() => {
    dispatch(allActions.grammarAction.actFetchGrammarRequest());
    dispatch(allActions.vocabularyTopicAction.actFetchVocaTopicsRequest())
  },[])
  
  return (
    <>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Chọn nội dung đính kèm"
        onChange={handleChange}
      >
        {children}
      </Select> 
    </>
  );
}
export default SelectForm;