import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import ReactAudioPlayer from 'react-audio-player';
import { BiSave, BiReset, BiRefresh } from "react-icons/bi";
import { Link } from 'react-router-dom';
import convertURL from '../../constants/convertUrl';
import validator from 'validator';
import allActions from '../../actions/index'

class AdminAddQuestionListen extends Component {

    constructor(props){
        super(props);

        this.selectFile = this.selectFile.bind(this);
        this.selectFileAudio = this.selectFileAudio.bind(this);

        this.state = {

            statusCheck: false,

            currentFile: undefined,
            previewImage: undefined,
            previewAudio: undefined,
            currentFileAudio: undefined,

            content_question: '',
            correct_answer: '',
            paragraph: '',
            option_1: '',
            option_2: '',
            option_3: '',
            option_4: '',
            idExercise: this.props.match.params.idExercise,
            nameExercise: this.props.match.params.nameExercise,
        }
    }

    selectFileAudio(event) {
        this.setState({
            currentFileAudio: event.target.files[0],
            previewAudio: URL.createObjectURL(event.target.files[0])
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.statusButtonLoading){
            this.setState({
                statusCheck: nextProps.statusButtonLoading.statusCheck
            })
        }
    }

    selectFile(event) {
        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0])
        });
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    handelOnChangeSelect = (event) => {
        if(event.value){
            this.setState({
                correct_answer: event.value
            })
        }
    }

    addQuestionListen = (event) => {
        event.preventDefault();
        // if(this.state.currentFile === undefined){
        //     alert("Yêu cầu nhập hình ảnh mô tả!!!!")
        //     return;
        // }
        if(this.state.currentFileAudio === undefined){
            alert("Yêu cầu nhập file nghe!!!!")
            return;
        }
        if(validator.isEmpty(this.state.content_question)){
            alert("Yêu cầu nhập câu hỏi!!!!")
            return;
        }
        if(validator.isEmpty(this.state.option_1)){
            alert("Yêu cầu nhập lựa chọn A!!!!")
            return;
        }
        if(validator.isEmpty(this.state.option_2)){
            alert("Yêu cầu nhập lựa chọn B!!!!")
            return;
        }
        if(validator.isEmpty(this.state.option_3)){
            alert("Yêu cầu nhập lựa chọn C!!!!")
            return;
        }
        if(validator.isEmpty(this.state.correct_answer)){
            alert("Yêu cầu nhập đáp án đúng!!!!")
            return;
        }

        let questionListenAdd = {}
        questionListenAdd.content_question = this.state.content_question;
        questionListenAdd.correct_answer = this.state.correct_answer;
        // questionListenAdd.fileImage = this.state.currentFile;
        // questionListenAdd.fileAudio = this.state.currentFileAudio;
        questionListenAdd.option_1 = this.state.option_1;
        questionListenAdd.option_2 = this.state.option_2;
        questionListenAdd.option_3 = this.state.option_3;
        questionListenAdd.option_4 = this.state.option_4;
        questionListenAdd.idExercise = this.state.idExercise;
        // questionListenAdd.idExercise = 2;

        this.props.onOpenButtonLoading()
        this.props.onAddQuestionListen(questionListenAdd, this.state.currentFile, this.state.currentFileAudio)
    }

    render() {

        const {
            previewImage,
            statusCheck,
            option_1,
            option_2,
            option_3,
            option_4,
            previewAudio,
        } = this.state;

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

        return(
            <div className="container-fluid container-admin-add-account">
                <div className="row">
                    <div className="col-12">
                        <div style={{marginTop: 10}}>
                            <div className="jumbotron manager-account">
                                <h2>Thêm câu hỏi</h2>  
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <form>
                            <div className="row">

                                <div>
                                    <label htmlFor="avatar"><b>Ảnh mô tả</b></label>
                                    <input className="input-field" type="file" placeholder="Ảnh đại diện" onChange={this.selectFile} accept="image/*" id="image_description" name="image_description"/>
                                    {previewImage && (
                                        <div>
                                            <img className="preview" src={previewImage} alt="" style={{height: 150, width: 150}}/>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="avatar"><b>Chọn file audio</b></label>
                                    <input className="input-field" type="file" placeholder="Ảnh đại diện" onChange={this.selectFileAudio} accept="audio/*" id="file_audio" name="file_audio"/>
                                    {previewAudio && <ReactAudioPlayer
                                        src={previewAudio}
                                        controls
                                    />} 
                                </div>


                                <div className='col-md-12'>
                                    <label htmlFor="content_question"><b>Câu hỏi</b></label> <br />      
                                    <textarea style={{width: '100%'}} onChange={(event) => this.isChange(event)} className="input-field" placeholder="Câu hỏi" name="content_question" id="content_question" rows="3" required/>
                                </div>

                                <div className='col-md-12'>
                                    <label htmlFor="option_1"><b>Lựa chọn A</b></label>    
                                    <input  onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Lựa chọn A" name="option_1" id="option_1" required/>
                                </div>

                                <div className='col-md-12'>
                                    <label htmlFor="option_2"><b>Lựa chọn B</b></label>    
                                    <input  onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Lựa chọn B" name="option_2" id="option_2" required/>
                                </div>

                                <div className='col-md-12'>
                                    <label htmlFor="option_3"><b>Lựa chọn C</b></label>    
                                    <input  onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Lựa chọn C" name="option_3" id="option_3" required/>
                                </div>

                                <div className='col-md-12'>
                                    <label htmlFor="option_4"><b>Lựa chọn D</b></label>    
                                    <input  onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Lựa chọn D" name="option_4" id="option_4" required/>

                                </div>

                                <div className='col-md-12' style={{marginBottom: '1rem'}}>
                                    <label htmlFor="correct_answer"><b>Đáp án đúng</b></label>
                                    <Select options={options} defaultValue={options[0]} 
                                        onChange={(event) => this.handelOnChangeSelect(event)} />
                                </div>

                                <div className="div-button-account mb-3 mt-3">
                                    <button disabled={statusCheck} onClick={(event) => this.addQuestionListen(event)} type="button" className="btn btn-success btn-save-account">
                                        {statusCheck && "Đang xử lý "}
                                        {statusCheck && <BiRefresh />}
                                        {!statusCheck && "Thêm "}
                                        {!statusCheck && <BiSave />}
                                    </button> 
                                    <button type="reset" className="btn btn-warning">Làm mới <BiReset /></button>
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
        statusButtonLoading: state.statusButtonLoading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        },
        onAddQuestionListen: (questionListenAdd, fileImage, fileAudio) => {
            dispatch(allActions.questionAction.actAddQuestionListenRequest(questionListenAdd,fileImage, fileAudio))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminAddQuestionListen);