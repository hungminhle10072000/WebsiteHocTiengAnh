import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminAddCoursePage.css'
import { BiSave, BiReset,BiRefresh } from "react-icons/bi";
import courseAction from "../../actions/courseAction"
import { connect } from 'react-redux';
import validator from 'validator';
import allActions from '../../actions'

class AdminAddCoursePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: {
                name: '',
                image: '',
                introduce: ''
            },
            validationMsg: {},
            currentFile: undefined,
            previewImage: undefined,
            confirmDialog: false,
            statusCheck: false
        }

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
            course: {
                ...this.state.course,
                [name]: value
            }
        })
    }
    resetForm(event) {
        event.preventDefault();
        this.setState({
            course: {
                name: '',
                image: '',
                introduce: ''
            },
            validationMsg: {},
            currentFile: undefined,
            previewImage: undefined,
            confirmDialog: false,
        }) 
    }
    addCourse = (event) => {
        event.preventDefault();
        var courseDto = {}
        courseDto.name = this.state.course.name;
        courseDto.image = this.state.course.image;
        courseDto.introduce = this.state.course.introduce;
        this.handleConfirmationBox();
        this.props.onOpenButtonLoading();
        this.props.onAddCourse(courseDto, this.state.currentFile)
    }
    validateAll = () => {
        const msg = {}
        if (validator.isEmpty(this.state.course.name)) {
            msg.name = "Yêu cầu nhập tên khoá học !"
        }
        if (validator.isEmpty(this.state.course.introduce)) {
            msg.introduce = "Yêu cầu nhập giới thiệu về khoá học !"
        }
        if (!this.state.currentFile) {
            msg.image = "Yêu cầu thêm ảnh của khoá học!"
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

    render() {
        const statusCheck = this.state.statusCheck
        return (
            <div>
                <h2>___________________________________________________________________________________________________________</h2>

                <div className="row container-admin-add-course">
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
                                onClick={(event) => this.addCourse(event)} >
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
                        <h2>Thêm khoá học</h2>
                        <br></br>
                        <label htmlFor="name"><b>Tên khoá học:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" 
                          value={this.state.course.name}  type="text" maxLength={255} placeholder="Tên khoá học" name="name" id="courseName" />
                        <p className="msg-error">{this.state.validationMsg.name}</p>
                        <br></br>
                        <label htmlFor="image"><b>Ảnh khoá học:</b></label>
                        <input onChange={(event) => this.selectFile(event)} className="input-field" type="file" accept=".png, .jpg , .jpeg , .jfif , .pjpeg , .pjp"
                        value={this.state.course.image} placeholder="Ảnh khoá học" name="image" id="iamge" />
                        <p className="msg-error">{this.state.validationMsg.image}</p>
                        {this.state.previewImage && (
                                        <div>
                                            <img className="preview" src={this.state.previewImage} alt="" style={{height: 150, width: 150}}/>
                                        </div>
                                    )}

                        <br></br>
                        <label htmlFor="introduce"><b>Giới thiệu:</b></label>
                        <input onChange={(event) => this.isChange(event)} className="input-field" type="text" maxLength={255}
                            value={this.state.course.introduce} placeholder="Giới thiệu về khoá học" name="introduce" id="introduce" />
                        <p className="msg-error">{this.state.validationMsg.introduce}</p>
                        <br></br>
                        <div className="div-button-account">
                            {/* <Link to="/admin/course"> */}
                                <button onClick={(event) => this.handleConfirmationBox(event)}
                                    type="button" disabled={statusCheck} className="btn btn-success btn-save-account">
                                        {statusCheck && "Đang xử lý "}
                                        {statusCheck && <BiRefresh />}
                                        {!statusCheck && "Lưu "}
                                        {!statusCheck && <BiSave />}
                                        </button>
                            {/* </Link> */}
                            <button onClick = {(event) => this.resetForm(event)}
                                type="reset" className="btn btn-warning" >Làm mới <BiReset /></button>
                        </div>

                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        course: state.course,
        statusButtonLoading: state.statusButtonLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCourse: (courseDto, file) => {
            dispatch(courseAction.actAddCourseRequest(courseDto, file))
        },
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddCoursePage);