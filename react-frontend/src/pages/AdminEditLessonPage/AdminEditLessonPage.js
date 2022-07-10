import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminEditLessonPage.css'
import { Link } from 'react-router-dom'
import { BiSave, BiReset, BiRefresh } from "react-icons/bi";
import { connect } from 'react-redux';
import validator from 'validator';
import allActions from '../../actions';
import { Button,Nav,NavItem,NavLink,TabContent,TabPane,Row,Col,Card,CardTitle,CardText } from 'reactstrap';
import SelectOneForm from '../../components/AdminComponents/SelectOneForm.js'

class AdminEditLessonPage extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {  
            lesson: {
                id:this.props.match.params.id,
                chapterId:-1,
                name: '',
                video:'',
                numPriority : -1,
                chapterName:'',
                courseName:'',
                exerciseId: -1,
                grammarId: -1,
                vocabularyTopicId: -1
            },
            videoFile:'',
            validationMsg: '',
            confirmDialog: false,
            activeTab: '1',
            theInputKey:'',
            statusCheck: false
        }

    }

    handleChangeExerciseId = (exerciseId) => {
        this.setState({
            lesson: {
                ... this.state.lesson,
                exerciseId: exerciseId
            }
        })
    }

    handleChangeGrammarId = (grammarId) => {
        this.setState({
            lesson: {
                ... this.state.lesson,
                grammarId: grammarId
            }
        })
    }

    handleChangeVocabularyTopicId = (vocabularyTopicId) => {
        this.setState({
            lesson: {
                ... this.state.lesson,
                vocabularyTopicId: vocabularyTopicId
            }
        })
    }

    componentDidMount() {
        this.props.onGetLessonById(this.state.lesson.id)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.lesson){
            var {lesson} = nextProps;
            this.setState({
                lesson: {...lesson}
            })
        }
        if(nextProps && nextProps.statusButtonLoading){
            this.setState({
                statusCheck: nextProps.statusButtonLoading.statusCheck
            })
        }
    }

    isChangedVideo= (event) => {
        const value = event.target.files[0]
        this.setState({
            videoFile:value
        })
    }


    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        
        if (name === 'numPriority' && value < 0 || name === 'numPriority' && value > this.props.chapter.numOfLesson ) {
            return;
        }


        this.setState({
            lesson: {     
                ...this.state.lesson,
                [name]: value
            }
        })
    }
    resetForm(event) {
        event.preventDefault();
        this.setState({
            lesson: {
                ...this.state.lesson,
                name:this.props.lesson.name,
                video:this.props.lesson.video,
                number:this.props.number,
                chapterId: this.props.lesson.chapterId,
                chapterName: this.props.lesson.chapterName,
                courseName: this.props.lesson.courseName
            },
            videoFile:undefined,
            validationMsg: {},
            confirmDialog: false,
        }) 
    }
    updateLesson = (event) => {
        event.preventDefault();
        var lessonDto = {}
        lessonDto.id = this.state.lesson.id;
        lessonDto.name=this.state.lesson.name;
        lessonDto.chapterId=this.state.lesson.chapterId;
        lessonDto.chapterName=this.state.lesson.chapterName;
        lessonDto.courseName=this.state.lesson.courseName;
        lessonDto.numPriority=this.state.lesson.numPriority;
        lessonDto.video=this.state.lesson.video;
        lessonDto.exerciseId = this.state.lesson.exerciseId;
        lessonDto.grammarId = this.state.lesson.grammarId;
        lessonDto.vocabularyTopicId = this.state.lesson.vocabularyTopicId;
        this.handleConfirmationBox();
        this.props.onOpenButtonLoading(); 
        this.props.onEditLesson(lessonDto,this.state.videoFile)
        
    }
    validateAll = () => {
        const msg = {}

        if (validator.isEmpty(this.state.lesson.name.trim())) {
            msg.name = "Yêu cầu nhập tên bài học !"
        }
        this.setState({
            validationMsg: msg
        })
        if (Object.keys(msg).length > 0) return false
        return true;
    }
    handleConfirmationBox = (event) => {
        const isValid = this.validateAll()
        if (!isValid) return
        else {
            if (!this.state.confirmDialog) {
                document.querySelector(".confirm-bg").style.display = "flex"
                document.querySelector(".container-dialog").style.display = "flex"
                this.setState({
                    confirmDialog: true
                })
            } else {
                document.querySelector(".confirm-bg").style.display = "none"
                document.querySelector(".container-dialog").style.display = "none"
                this.setState({
                    confirmDialog: false
                })
            }
        }
    }


    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({ activeTab: tab });
        }
      }

    resetVideoFile() {
        let randomString = Math.random().toString(36);
      
        this.setState({
          theInputKey: randomString,
              videoFile:''
        });
      }
    clearLink() {
        this.setState({
            lesson: {
                ...this.state.lesson,
                video:''
            },
        }) 
    }

    render() {
        const statusCheck = this.state.statusCheck
        return (     
            <div>
                <h2>___________________________________________________________________________________________________________</h2>

                <div className="row container-admin-add-lesson">
                    <div className="container-dialog">
                        <div className="confirmation-text">
                            Bạn có chắc chắn muốn lưu ?
                        </div>
                        <div className="button-container">
                            <button
                                className="confirmation-button cancel-button"
                                onClick={(event) => this.handleConfirmationBox(event)}>
                                Hủy
                            </button>
                            <button
                                className="confirmation-button btn-confirm"
                                onClick={(event) => this.updateLesson(event)} >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                    <div
                        className="confirm-bg"
                        onClick={(event) => this.handleConfirmationBox(event)}>
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <h2>Chỉnh sửa bài học</h2>
                        <br></br>
                        <label htmlFor="name"><b>Tên khoá học:</b></label>

                        <input  className="input-field" readOnly={true}
                          value={this.state.lesson.courseName}  type="text" maxLength={255} placeholder="Tên khoá học" name="nameCourse" id="nameCourse" />

                        <label htmlFor="chapterName"><b>Tên chương:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" type="text" maxLength={255} readOnly={true}
                            value={this.state.lesson.chapterName} placeholder="Nhập tên chương" name="chapterName" id="chapterName" />
                        <p className="msg-error">{this.state.validationMsg.chapterName}</p>

                        <label htmlFor="name"><b>Số thứ tự:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" type="number"
                            value={this.state.lesson.numPriority} placeholder="Nhập tên chương" name="numPriority" id="numPriority" />
                        <p className="msg-error">{this.state.validationMsg.number}</p>
              
              
                        <label htmlFor="name"><b>Tên bài học:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" type="text" maxLength={255} 
                            value={this.state.lesson.name} placeholder="Nhập tên bài học" name="name" id="name" />
                        <p className="msg-error">{this.state.validationMsg.name}</p>
                        <br></br>
                        <label htmlFor="name"><b>Bài giảng:</b></label>
                        <div>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                         className={this.state.activeTab === '2' ? 'active' : ''}
                                        onClick={()=> this.toggle('1')}
                                    >
                                        Gán Link
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                         className={this.state.activeTab === '1' ? 'active' : ''}
                                        onClick={() => this.toggle('2')}
                                    >
                                        Tải lên
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12" style={{display: 'inline-block'}}>
                                            <br/>
                                            <input id='linkLesson' maxLength={255} name='video' style= {{width:'90%'}} placeholder='Nhập link bài giảng.'
                                            onChange={(event)=> this.isChange(event)}  value={this.state.lesson.video}></input>
                                            <button className="btn btn-danger" style={{marginLeft:'10px',marginBottom:'5px', padding:'2px 15px'}} onClick={()=> this.clearLink()}>Xoá</button>
                                            <br/>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12">
                                            <Card body style={{display:'inline-block', width:'100%'}}>
                                            <input className="videoFile"  key={this.state.theInputKey || '' } type="file"  onChange = {(event)=>this.isChangedVideo(event)} style={{ display: 'inline-block'}} />
                                             {this.state.videoFile && <button style={{ display: 'inline-block', fontSize:'25px', fontStyle:'bold', color:'red', backgroundColor:'Transparent', border:'none'}}  onClick={()=> this.resetVideoFile()}>x</button> }
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                            <p className="msg-error">{this.state.validationMsg.video}</p>
                        </div>
                        <label><b>Nội dung đính kèm:</b></label>
                        <br/>
                        <SelectOneForm 
                        onChangeExerciseId = {this.handleChangeExerciseId} 
                        onChangeVocabularyTopicId = {this.handleChangeVocabularyTopicId} 
                        onChangeGrammarId = {this.handleChangeGrammarId}
                        exerciseId = {this.state.lesson.exerciseId}
                        vocaTopicId = {this.state.lesson.vocabularyTopicId}
                        grammarId = {this.state.lesson.grammarId}
                        />
                        <div className="div-button-account">
                        
                                <button onClick={(event) => this.handleConfirmationBox(event)} style={{paddingLeft:'25px',paddingRight:'25px'}}
                                    type="button" disabled={statusCheck} className="btn btn-success btn-save-account">
                                        {statusCheck && "Đang xử lý "}
                                        {statusCheck && <BiRefresh />}
                                        {!statusCheck && "Lưu "}
                                        {!statusCheck && <BiSave />}
                                        </button>
                            <button onClick = {(event) => this.resetForm(event)}
                                type="reset" className="btn btn-warning" >Làm mới <BiReset /></button>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
                <div style={{marginBottom:'50px'}}>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chapter: state.chapterEditReducer,
        lesson: state.lessonEditReducer,
        statusButtonLoading: state.statusButtonLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditLesson: (lessonDto, file) => {
            dispatch(allActions.lessonAction.actUpdateLessonRequest(lessonDto,file))
        },
        onGetCourseById: (chapterId) => {
            dispatch(allActions.chapterAction.actGetCourseRequest(chapterId))
        },
        onGetChapterById: (chapterId) => {
            dispatch(allActions.chapterAction.actGetChapterRequest(chapterId))
        },
        onGetLessonById: (id) => {
            dispatch(allActions.lessonAction.actGetLessonRequest(id))
        },
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditLessonPage);