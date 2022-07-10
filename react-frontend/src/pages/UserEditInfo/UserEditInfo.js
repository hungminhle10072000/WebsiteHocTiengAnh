import React, { Component } from 'react'
import './UserEditInfo.css'
import { connect } from 'react-redux'
import allActions from '../../actions/index'
import { BiSave, BiReset, BiKey } from "react-icons/bi"
import validator from 'validator'
import {isValidStringLength} from './../../utils/index.js'

class UserEditInfo extends Component {

    constructor(props){
        super(props);

        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            id: this.props.match.params.id,
            user: {
                fullname: '',
                username: '',
                // password: '',
                // repeat_password: '',
                phonenumber: '',
                email: '',
                gender: '',
                address: '',
                birthday: '',
                role: ''
            },

            // preview image
            currentFile: undefined,
            previewImage: undefined,
            statuschossefile: false,

            // validation
            validationMsg: {},
            validationMsgPassword:{},
            openFormResetPassword: false,
            passwordOld: '',
            passwordNew: '',
            repeat_passwordNew: ''
        }
    }

    selectFile(event) {
        this.setState({
            currentFile: event.target.files[0],
            statuschossefile: true,
            previewImage: URL.createObjectURL(event.target.files[0])
        });
    }

    upload() {
        this.setState({
            process: 0,
        });
    }


    componentDidMount() {
        this.props.onEditUser(this.state.id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemUserEdit){
            var {itemUserEdit} = nextProps;
            this.setState({
                user: {...itemUserEdit}
            })
        }
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            user: {...this.state.user,[name]: value}
        })
    }

    isChangePassWord = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    updateUser = (event) => {
        event.preventDefault();
        this.handleConfirmationBox();
        this.props.onOpenItemLoading()
        this.props.onUpdateUser(this.state.user, this.state.currentFile, this.state.statuschossefile);
        // this.props.history.goBack();
        // this.props.changeAdminAlertOn("Cập nhật thành công","success");
    }

    handleConfirmationBox = (event) => {
        const isValid = this.validateAll()
        if(!isValid) return 
        else {
            if(!this.state.confirmDialog){
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

    validatePassWord = () => {
        const msgPassWord = {}
        if(validator.isEmpty(this.state.passwordNew)){
            msgPassWord.passwordNew = "Yêu cầu nhập mật khẩu mới !"
        } else if (!validator.equals(this.state.passwordNew, this.state.repeat_passwordNew)) {
            msgPassWord.repeat_passwordNew = "Mật khẩu nhập lại không khớp !"
        }
        this.setState({
            validationMsgPassword: msgPassWord
        })
        if(Object.keys(msgPassWord).length > 0) return false
        return true;
    }

    handleUpdatePassWord = () => {
        const isValid = this.validatePassWord()
        const {user, passwordOld, passwordNew} = this.state
        if(!isValid) return
        else{
            this.props.onOpenItemLoading()
            this.props.onUserUpdatePassWord(user.username,passwordOld, passwordNew)
        } 
    }

    validateAll = () => {
        const msg = {}
        if(validator.isEmpty(this.state.user.fullname)){
            msg.fullname = "Yêu cầu nhập tên !"
        }
        if(validator.isEmpty(this.state.user.username)){
            msg.username = "Yêu cầu nhập tên đăng nhập !"
        }
        // if(validator.isEmpty(this.state.user.password)){
        //     msg.password = "Yêu cầu nhập mật khẩu !"
        // }
        // if(validator.isEmpty(this.state.user.repeat_password)){
        //     msg.repeat_password = "Yêu cầu nhập lại mật khẩu !"
        // } else if (!validator.equals(this.state.user.password, this.state.user.repeat_password)) {
        //     msg.repeat_password = "Mật khẩu nhập lại không khớp !"
        // }
        if(validator.isEmpty(this.state.user.phonenumber)){
            msg.phonenumber = "Yêu cầu nhập số điện thoại !"
        } else if (!validator.isMobilePhone(this.state.user.phonenumber)){
            msg.phonenumber = "Yêu cầu nhập đúng số điện thoại !"
        }
        if(validator.isEmpty(this.state.user.email)){
            msg.email = "Yêu cầu nhập địa chỉ gmail !"
        } else if (!validator.isEmail(this.state.user.email)) {
            msg.email = "Yêu cầu nhập đúng gmail !"
        }
        if(validator.isEmpty(this.state.user.address)){
            msg.address = "Yêu cầu nhập địa chỉ !"
        }

        this.setState({
            validationMsg: msg
        })
        if(Object.keys(msg).length > 0) return false
        return true;
    }

    resetForm = (event) => {
        event.preventDefault();
        const {itemUserEdit} = this.props
        this.setState({
            user: {...itemUserEdit},

            // preview image
            currentFile: undefined,
            previewImage: undefined,
            statuschossefile: false,

            // validation
            validationMsg: {}
        })
    }

    openFormResetPassWord () {
        this.setState({
            openFormResetPassword: !this.state.openFormResetPassword
        })
    }

    render() {

        const checkavartar = this.state.user.avatar !== '' && this.state.statuschossefile === false;
        const { 
            previewImage,
            validationMsg,
            validationMsgPassword
        } = this.state;

        return (
            <div className="container-fluid container-admin-add-account mt-2 pt-2 pb-2" style={{backgroundColor: 'white'}}>
                <div className="container-dialog">
                    <div className="confirmation-text">
                        Bạn có chắc chắn muốn cập nhật ?
                    </div>
                    <div className="button-container">
                        <button 
                            className="confirmation-button cancel-button" 
                            onClick={(event) => this.handleConfirmationBox(event)}>
                            Hủy
                        </button>
                        <button 
                            className="confirmation-button btn-confirm"
                            onClick={(event) => this.updateUser(event)}>
                            Xác nhận
                        </button>
                    </div>
                </div>
                <div 
                    className="confirm-bg"
                    onClick={(event) => this.handleConfirmationBox(event)}> 
                </div>
                <div className="row">
                    <div className="col-12">
                        <div style={{marginTop: 10}}>
                            <div className="jumbotron manager-account">
                                <h2>Thay đổi thông tin </h2>  
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="row">
                    <div className="col-12">
                    <form>
                            <div className="row">
                                {/* Left */}
                                <div className="col-sm-6">
                                    <label htmlFor="Id"><b>Id</b></label>         
                                    <input className="input-field" type="text" onChange={(event) => this.isChange(event)}
                                    placeholder="Id" name="Id" id="Id" defaultValue={this.state.id} disabled />
                                     <p className="msg-error">{}</p>

                                    <label htmlFor="username"><b>Tên đăng nhập</b></label>    
                                    <input disabled className="input-field" value={this.state.user.username} onChange={(event) => this.isChange(event)}
                                    type="text" placeholder="Tên đăng nhập" name="username" id="username" />
                                    <p className="msg-error">{validationMsg.username}</p>

                                    <label htmlFor="fullname"><b>Họ tên</b></label>      
                                    <input onChange={(event) => this.isChange(event)}
                                    className="input-field" value={this.state.user.fullname}  maxLength={255} type="text" placeholder="Họ tên" name="fullname" id="fullname"/>
                                    <p className="msg-error">{validationMsg.fullname}</p>
                                    <label htmlFor="email"><b>Email</b></label>
                                    <input className="input-field" type="email" value={this.state.user.email} onChange={(event) => this.isChange(event)}
                                    placeholder="Email" id="email" name="email" />
                                    <p className="msg-error">{validationMsg.email}</p>

                                    <label htmlFor="gender"><b>Giới tính</b></label>
                                    <div>
                                        <input  onChange={(event) => this.isChange(event)} type="radio" id="nam" name="gender" value="Nam" checked={this.state.user.gender === "Nam"} />
                                        <label htmlFor="nam">&nbsp; Nam</label> &nbsp; &nbsp; &nbsp;
                                        <input  onChange={(event) => this.isChange(event)} type="radio" id="nu" name="gender" value="Nữ" checked={this.state.user.gender === "Nữ"}/>
                                        <label htmlFor="nu">&nbsp;  Nữ</label><br />
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="col-sm-6">
                                    <label htmlFor="address"><b>Địa chỉ</b></label>  
                                    <input className="input-field" type="text" value={this.state.user.address} onChange={(event) => this.isChange(event)}
                                    placeholder="Địa chỉ" name="address" id="address" maxLength={255} />
                                    <p className="msg-error">{validationMsg.address}</p>

                                    <label htmlFor="phonenumber"><b>Số điện thoại</b></label>  
                                    <input className="input-field" type="text" maxLength={255} value={this.state.user.phonenumber} onChange={(event) => this.isChange(event)}
                                    placeholder="Số điện thoại" name="phonenumber" id="phonenumber" />
                                    <p className="msg-error">{validationMsg.phonenumber}</p>
                                    
                                    <label htmlFor="birthday"><b>Ngày sinh</b></label>  
                                    <input className="input-field" type="date" value={this.state.user.birthday} onChange={(event) => this.isChange(event)}
                                    placeholder="Ngày sinh" name="birthday" id="birthday" />
                                    
                                    <label htmlFor="avatar"><b>Ảnh đại diện</b></label>
                                    <input className="input-field" type="file" placeholder="Ảnh đại diện" onChange={this.selectFile} accept="image/*" id="avatar" name="avatar"/>
                                    {checkavartar && <img style={{width:150, height:150}} src={this.state.user.avartar} alt="Ảnh đại diện" />}
                                    {previewImage && (
                                        <div>
                                            <img className="preview" src={previewImage} alt="" style={{height: 150, width: 150}}/>
                                        </div>
                                    )}
 
                                </div>
                            </div>

                            <div className="div-button-account">
                                    <button type="button" onClick={(event) => this.handleConfirmationBox(event)}
                                    className="btn btn-success btn-save-account">Cập nhật <BiSave /></button> 

                                    <button type="button" onClick={(event) =>  this.openFormResetPassWord()}
                                    className="btn btn-danger">Đổi mật khẩu <BiKey /></button> 

                                    <button type="reset" onClick={(event) =>  this.resetForm(event)} style={{marginLeft: '1%'}}
                                    className="btn btn-warning">Reset <BiReset /></button> 
                            </div>
                        </form>
                        {this.state.openFormResetPassword && 
                        <div className="row mt-3 div-reset-password">
                            <div className="col-md-6">
                                <label htmlFor="passwordOld"><b>Mật khẩu cũ</b></label>
                                <input className="input-field" type="password" onChange={(event) => this.isChangePassWord(event)}
                                placeholder="Mật khẩu" name="passwordOld" id="passwordOld" />
                                <p className="msg-error">{validationMsgPassword.passwordOld}</p>

                                <label htmlFor="passwordNew"><b>Mật khẩu mới</b></label>
                                <input className="input-field" type="password" onChange={(event) => this.isChangePassWord(event)}
                                placeholder="Nhập lại mật khẩu" name="passwordNew" id="passwordNew" />
                                <p className="msg-error">{validationMsgPassword.passwordNew}</p>

                                <label htmlFor="repeat_passwordNew"><b>Nhập lại mật khẩu mới</b></label>
                                <input className="input-field" type="password" onChange={(event) => this.isChangePassWord(event)}
                                placeholder="Nhập lại mật khẩu" name="repeat_passwordNew" id="repeat_passwordNew" />
                                <p className="msg-error">{validationMsgPassword.repeat_passwordNew}</p>
                                
                                <button type="button" onClick={() =>  this.handleUpdatePassWord()}
                                className="btn btn-danger">Cập nhật <BiKey /></button> 
                            </div> 
                        </div> }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        itemUserEdit: state.itemUserEdit,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onEditUser: (id) => {
            dispatch(allActions.userAction.actGetUserRequest(id));
        },
        onUpdateUser: (userDto, file, checkFile) => {
            dispatch(allActions.userAction.actUpdateUserInfoRequest(userDto, file, checkFile));
        },
        changeAdminAlertOn : (admin_alertContent, admin_alertType) => {
            dispatch(allActions.adminAlertInfoAction.changeAdminAlertOn(admin_alertContent, admin_alertType));
        },
        onUserUpdatePassWord: (username, passwordOld, passwordNew) => {
            dispatch(allActions.userAction.actUserUpdatePassWordRequest(username, passwordOld, passwordNew))
        },
        onOpenItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (UserEditInfo);
