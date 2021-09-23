import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BiSave, BiReset } from "react-icons/bi";
import './AdminAddAccountPage.css'
import { connect } from 'react-redux';
import allActions from '../../actions/index';
import validator from 'validator';
 
class AdminAddAccountPage extends Component {

    constructor(props){
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var todayDate = String(date.getDate()).padStart(2, '0');
        if(month < 10){
            month = "0" + String(month);
        }
        if(todayDate < 10){
            todayDate = "0" + todayDate;
        }
        var datePattern = year + '-' + month + '-' + todayDate;
      
        this.state = {

            // init value
            fullname: '',
            username: '',
            password: '',
            repeat_password: '',
            phonenumber: '',
            email: '',
            gender: 'Nam',
            address: '',
            birthday: datePattern,
            role: 'Admin',
            confirmDialog: false,

            // preview image
            currentFile: undefined,
            previewImage: undefined,

            // validation
            validationMsg: {}


        }
    }

    validateAll = () => {
        const msg = {}
        if(validator.isEmpty(this.state.fullname)){
            msg.fullname = "Yêu cầu nhập tên !"
        }
        if(validator.isEmpty(this.state.username)){
            msg.username = "Yêu cầu nhập tên đăng nhập !"
        }
        if(validator.isEmpty(this.state.password)){
            msg.password = "Yêu cầu nhập mật khẩu !"
        }
        if(validator.isEmpty(this.state.repeat_password)){
            msg.repeat_password = "Yêu cầu nhập lại mật khẩu !"
        } else if (!validator.equals(this.state.password, this.state.repeat_password)) {
            msg.repeat_password = "Mật khẩu nhập lại không khớp !"
        }
        if(validator.isEmpty(this.state.phonenumber)){
            msg.phonenumber = "Yêu cầu nhập số điện thoại !"
        } else if (!validator.isMobilePhone(this.state.phonenumber)){
            msg.phonenumber = "Yêu cầu nhập đúng số điện thoại !"
        }
        if(validator.isEmpty(this.state.email)){
            msg.email = "Yêu cầu nhập địa chỉ gmail !"
        } else if (!validator.isEmail(this.state.email)) {
            msg.email = "Yêu cầu nhập đúng gmail !"
        }
        if(validator.isEmpty(this.state.address)){
            msg.address = "Yêu cầu nhập địa chỉ !"
        }

        this.setState({
            validationMsg: msg
        })
        if(Object.keys(msg).length > 0) return false
        return true;
    }

    selectFile(event) {
        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0])
        });
    }

    upload() {
        this.setState({
            progress: 0,
        });
    }
    

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    addUser = (event) => {
        event.preventDefault();
        var user = {}
        user.fullname = this.state.fullname;
        user.username = this.state.username;
        user.password = this.state.password;
        user.email = this.state.email;
        user.gender = this.state.gender;
        user.address = this.state.address;
        user.phonenumber = this.state.phonenumber;
        user.birthday = this.state.birthday;
        user.role = this.state.role;
        this.props.onAddUser(user);
        window.history.back();
        this.props.changeAdminAlertOn("Thêm thành công","success");     

    }

    handleConfirmationBox = (event) => {
        event.preventDefault();
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

    render() {
        const {
            previewImage,
            validationMsg
        } = this.state;

        return (
            <div className="container-fluid container-admin-add-account">
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
                            onClick={(event) => this.addUser(event)} >
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
                                <h2>Thêm tài khoản</h2>  
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
                                    {/* <label htmlFor="Id"><b>Id</b></label>         
                                    <input className="input-field" type="text" placeholder="Id" name="Id" id="Id" value="1" disabled /> */}

                                    <label htmlFor="fullname"><b>Họ tên</b></label>      
                                    <input onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Họ tên" name="fullname" id="fullname"/>
                                    <p className="msg-error">{validationMsg.fullname}</p>

                                    <label htmlFor="username"><b>Tên đăng nhập</b></label>    
                                    <input onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Tên đăng nhập" name="username" id="username" />
                                    <p className="msg-error">{validationMsg.username}</p>

                                    <label htmlFor="password"><b>Mật khẩu</b></label>
                                    <input onChange={(event) => this.isChange(event)} className="input-field" type="password" placeholder="Mật khẩu" name="password" id="password" />
                                    <p className="msg-error">{validationMsg.password}</p>

                                    <label htmlFor="repeat_password"><b>Nhập lại mật khẩu</b></label>
                                    <input onChange={(event) => this.isChange(event)} className="input-field" type="password" placeholder="Nhập lại mật khẩu" name="repeat_password" id="repeat_password" />
                                    <p className="msg-error">{validationMsg.repeat_password}</p>

                                    <label htmlFor="email"><b>Email</b></label>
                                    <input onChange={(event) => this.isChange(event)} className="input-field" type="email" placeholder="Email" id="email" name="email" />
                                    <p className="msg-error">{validationMsg.email}</p>

                                    <label htmlFor="gender"><b>Giới tính</b></label>
                                        <div>
                                            <input  onChange={(event) => this.isChange(event)} type="radio" id="nam" name="gender" value="Nam" defaultChecked />
                                            <label htmlFor="nam">&nbsp; Nam</label> &nbsp; &nbsp; &nbsp;
                                            <input  onChange={(event) => this.isChange(event)} type="radio" id="nu" name="gender" value="Nữ" />
                                            <label htmlFor="nu">&nbsp;  Nữ</label><br />
                                        </div>    
                                </div>

                                {/* Right */}
                                <div className="col-sm-6">
                                    <label htmlFor="address"><b>Địa chỉ</b></label>  
                                    <input onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Địa chỉ" name="address" id="address" />
                                    <p className="msg-error">{validationMsg.address}</p>
                                    
                                    <label htmlFor="phonenumber"><b>Số điện thoại</b></label>  
                                    <input onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Số điện thoại" name="phonenumber" id="phonenumber" />
                                    <p className="msg-error">{validationMsg.phonenumber}</p>
                                    
                                    <label htmlFor="birthday"><b>Ngày sinh</b></label>  
                                    <input onChange={(event) => this.isChange(event)} className="input-field" type="date" placeholder="Ngày sinh" name="birthday" id="birthday" value={this.state.birthday}/>
                                    
                                    <label htmlFor="role"><b>Quyền</b></label>
                                    <div>
                                        <input onChange={(event) => this.isChange(event)} type="radio" id="Admin" name="role" value="Admin" defaultChecked/>
                                        <label htmlFor="Admin">&nbsp; Admin</label> &nbsp; &nbsp; &nbsp;
                                        <input onChange={(event) => this.isChange(event)} type="radio" id="User" name="role" value="User"  />
                                        <label htmlFor="User">&nbsp;  User</label><br />
                                    </div>


                                    <label htmlFor="avatar"><b>Ảnh đại diện</b></label>
                                    <input className="input-field" type="file" placeholder="Ảnh đại diện" onChange={this.selectFile} accept="image/*" id="avatar" name="avatar"/>
                                    
                                    {previewImage && (
                                        <div>
                                            <img className="preview" src={previewImage} alt="" style={{height: 150, with: 150}}/>
                                        </div>
                                    )}

                                </div>
                            </div>

                            <div className="div-button-account">
                                <Link to="/admin/add/account">
                                    <button onClick={(event) => this.handleConfirmationBox(event)} 
                                    type="button" className="btn btn-success btn-save-account">Lưu <BiSave /></button> 
                                </Link>
                                <button type="reset" className="btn btn-warning">Reset <BiReset /></button> 
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
        users: state.users
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddUser: (user) => {
            dispatch(allActions.userAction.actAddUserRequest(user))
        },
        changeAdminAlertOn : (admin_alertContent, admin_alertType) => {
            dispatch(allActions.adminAlertInfoAction.changeAdminAlertOn(admin_alertContent, admin_alertType));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (AdminAddAccountPage)