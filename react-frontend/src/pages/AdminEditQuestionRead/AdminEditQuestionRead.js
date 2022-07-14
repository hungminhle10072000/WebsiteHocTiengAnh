import React, { Component } from 'react'
import { connect } from 'react-redux'
import allActions from '../../actions/index'
import { BiSave, BiReset, BiRefresh } from "react-icons/bi"
import {
    Link
} from "react-router-dom"
import convertURL from '../../constants/convertUrl'
import Select from 'react-select'

class AdminEditQuestionRead extends Component {

    constructor(props){
        super(props);

        this.state = ({
            idQuestion: this.props.match.params.idQuestion,
            content_question: '',
            correct_answer: '',
            paragraph: '',
            type: 1,
            option_1: '',
            option_2: '',
            option_3: '',
            option_4: '',
            idExercise: -1,
            nameExercise: '',
            statusCheck: false
        })
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    updateQuestionRead = (event) => {
        event.preventDefault();
        if(this.state.content_question === ''){
            alert("Yêu cầu nhập câu hỏi!!!!")
            return;
        }
        if(this.state.option_1 === ''){
            alert("Yêu cầu nhập lựa chọn A!!!!")
            return;
        }
        if(this.state.option_2 === ''){
            alert("Yêu cầu nhập lựa chọn B!!!!")
            return;
        }
        if(this.state.option_3 === ''){
            alert("Yêu cầu nhập lựa chọn C!!!!")
            return;
        }
        // if(this.state.option_4 === ''){
        //     alert("Yêu cầu nhập lựa chọn D!!!!")
        //     return;
        // }
        if(this.state.correct_answer === ''){
            alert("Yêu cầu nhập đáp án đúng!!!!")
            return;
        }

        let questionReadUpdateDto = {}

        questionReadUpdateDto.content_question = this.state.content_question;
        questionReadUpdateDto.correct_answer = this.state.correct_answer;
        questionReadUpdateDto.paragraph = this.state.paragraph;
        questionReadUpdateDto.type = this.state.type;
        questionReadUpdateDto.option_1 = this.state.option_1;
        questionReadUpdateDto.option_2 = this.state.option_2;
        questionReadUpdateDto.option_3 = this.state.option_3;
        questionReadUpdateDto.option_4 = this.state.option_4;
        questionReadUpdateDto.idExercise = this.state.idExercise;
        this.props.onOpenButtonLoading()
        this.props.onUpdateQuestion(this.state.idQuestion, questionReadUpdateDto);

    }

    componentDidMount() {
        this.props.onGetQuestionEdit(this.state.idQuestion)
    }

    resetForm = (event) => {
        event.preventDefault();
        let {itemQuestionEditReducer} = this.props
        this.setState({
            content_question: itemQuestionEditReducer.content_question,
            correct_answer: itemQuestionEditReducer.correct_answer,
            paragraph: itemQuestionEditReducer.paragraph,
            type: itemQuestionEditReducer.type,
            option_1: itemQuestionEditReducer.option_1,
            option_2: itemQuestionEditReducer.option_2,
            option_3: itemQuestionEditReducer.option_3,
            option_4: itemQuestionEditReducer.option_4,
            idExercise: itemQuestionEditReducer.exerciseEntity.id,
            nameExercise: itemQuestionEditReducer.exerciseEntity.name
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemQuestionEditReducer){
            let {itemQuestionEditReducer} = nextProps;
            this.setState({
                content_question: itemQuestionEditReducer.content_question,
                correct_answer: itemQuestionEditReducer.correct_answer,
                paragraph: itemQuestionEditReducer.paragraph,
                type: itemQuestionEditReducer.type,
                option_1: itemQuestionEditReducer.option_1,
                option_2: itemQuestionEditReducer.option_2,
                option_3: itemQuestionEditReducer.option_3,
                option_4: itemQuestionEditReducer.option_4,
                idExercise: itemQuestionEditReducer.exerciseEntity.id,
                nameExercise: itemQuestionEditReducer.exerciseEntity.name
            })
        }

        if(nextProps && nextProps.statusButtonLoading){
            this.setState({
                statusCheck: nextProps.statusButtonLoading.statusCheck
            })
        }
    }

    handelOnChangeSelect = (event) => {
        if(event.value){
            this.setState({
                correct_answer: event.value
            })
        }
    }
    
    

    render() {
        const {
            statusCheck,
            option_1,
            option_2,
            option_3,
            option_4,
            correct_answer
        } = this.state;
        let indexCorrect = 0;
        let options = []
        if(option_1 !== ''){
            options.push({ value: option_1, label: option_1 })
        }
        if(option_2 !== ''){
            options.push({ value: option_2, label: option_2 })
        } 
        if(option_3 !== ''){
            options.push({ value: option_3, label: option_3 })
        } 
        if(option_4 !== ''){
            options.push({ value: option_4, label: option_4 })
        }
        for( const i in options){
            if(options[i].value === correct_answer){
                indexCorrect = i;
            }
        }
        return (
            <div className="container-fluid container-admin-add-account">
                <div className="row">
                    <div className="col-12">
                        <div style={{marginTop: 10}}>
                            <div className="jumbotron manager-account">
                                <h2>Chỉnh sửa câu hỏi</h2>  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form>
                            <div className="row">
                                {/* <div className='col-md-12'>
                                    <label htmlFor="paragraph"><b>Bài đọc</b></label> <br />      
                                    <textarea style={{width: '100%'}} onChange={(event) => this.isChange(event)} className="input-field" placeholder="Bài đọc" name="paragraph" id="paragraph" rows="5"/>
                                </div> */}

                                <div className='col-md-12'>
                                    <label htmlFor="content_question"><b>Câu hỏi</b></label> <br />      
                                    <textarea style={{width: '100%'}} value={this.state.content_question} onChange={(event) => this.isChange(event)} className="input-field" placeholder="Câu hỏi" name="content_question" id="content_question" rows="3" required/>
                                </div>

                                <div className='col-md-12'>
                                    <label htmlFor="option_1"><b>Lựa chọn A</b></label>    
                                    <input value={this.state.option_1} onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Lựa chọn A" name="option_1" id="option_1" required/>
                                </div>

                                <div className='col-md-12'>
                                    <label htmlFor="option_2"><b>Lựa chọn B</b></label>    
                                    <input value={this.state.option_2} onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Lựa chọn B" name="option_2" id="option_2" required/>
                                </div>

                                <div className='col-md-12'>
                                    <label htmlFor="option_3"><b>Lựa chọn C</b></label>    
                                    <input value={this.state.option_3} onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Lựa chọn C" name="option_3" id="option_3" required/>
                                </div>

                                <div className='col-md-12'>
                                    <label htmlFor="option_4"><b>Lựa chọn D</b></label>    
                                    <input value={this.state.option_4} onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Lựa chọn D" name="option_4" id="option_4" required/>
                                </div>

                                <div className='col-md-12'>
                                    <label htmlFor="correct_answer"><b>Đáp án đúng</b></label>
                                    <Select options={options} value={options[indexCorrect]}
                                        onChange={(event) => this.handelOnChangeSelect(event)}
                                    />    
                                    {/* <input value={this.state.correct_answer} onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Đáp án đúng" name="correct_answer" id="correct_answer" required/> */}
                                </div>
                                
                                <div className="div-button-account mb-3 mt-3">
                                    <button disabled={statusCheck} onClick={(event) => this.updateQuestionRead(event)} type="button" className="btn btn-success btn-save-account">
                                        {statusCheck && "Đang xử lý "}
                                        {statusCheck && <BiRefresh />}
                                        {!statusCheck && "Cập nhật "}
                                        {!statusCheck && <BiSave />}
                                    </button> 
                                    <button type="reset" className="btn btn-warning" onClick={(event) =>  this.resetForm(event)}>Làm mới <BiReset /></button>
                                    <Link to={"/admin/exercise/" + this.state.idExercise + "/" + convertURL(this.state.nameExercise) }>
                                        <button type="button" className='btn btn-danger ml-3'>Quay lại</button>
                                    </Link>  
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        itemQuestionEditReducer: state.itemQuestionEditReducer,
        statusButtonLoading: state.statusButtonLoading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGetQuestionEdit: (id) => {
            dispatch(allActions.questionAction.actGetQuestionByIdRequest(id))
        },
        onUpdateQuestion: (id, questionReadUpdateDto) => {
            dispatch(allActions.questionAction.actUpdateQuestionRequest(id, questionReadUpdateDto))
        },
        onItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        },
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (AdminEditQuestionRead)
