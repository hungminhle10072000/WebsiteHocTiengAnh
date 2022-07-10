import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom';
import AdminAlertInfo from '../../components/AdminAlertInfo/AdminAlertInfo';
import './RegisterPage.css';
import validator from 'validator';
import { BiSave, BiReset, BiLogIn } from "react-icons/bi";
import { Link } from 'react-router-dom';
import allActions from '../../actions/index';
import PropTypes from "prop-types";
import * as ReactBootstrap from 'react-bootstrap';


class RegisterPage extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {
        const {history} = this.props
        if(nextProps && nextProps.statusRegister.statusRegister == true){
            history.push('/login');
            this.props.changeAdminAlertOn("Đăng ký tài khoản thành công","success");
        }
        if(nextProps && nextProps.statusItemLoading){
            this.setState({
                statusCheckItemLoading: nextProps.statusItemLoading.statusCheck
            })
        }
    }
    

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
            todayDate = todayDate;
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
            role: 'User',
            confirmDialog: false,

            // preview image
            currentFile: undefined,
            previewImage: undefined,

            // validation
            validationMsg: {},
            statusCheckItemLoading: false


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
        if(this.state.currentFile === undefined){
            msg.avatar = "Yêu cầu chọn ảnh đại diện !"
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

    hadnleRegister = (event) => {
        event.preventDefault();
        const isValid = this.validateAll()
        if(!isValid) return
        else {
            var userDto = {}
            userDto.fullname = this.state.fullname;
            userDto.username = this.state.username;
            userDto.password = this.state.password;
            userDto.email = this.state.email;
            userDto.gender = this.state.gender;
            userDto.address = this.state.address;
            userDto.phonenumber = this.state.phonenumber;
            userDto.birthday = this.state.birthday;
            userDto.role = this.state.role;
            this.props.onOpenItemLoading()
            this.props.onAddUser(userDto,this.state.currentFile);
        }

    }

    handleResest = () => {

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var todayDate = String(date.getDate()).padStart(2, '0');
        if(month < 10){
            month = "0" + String(month);
        }
        if(todayDate < 10){
            todayDate = todayDate;
        }
        
        var datePattern = year + '-' + month + '-' + todayDate;

        this.setState({

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
            role: 'User',
            confirmDialog: false,

            // preview image
            currentFile: undefined,
            previewImage: undefined
        })
    }

    render() {
        const {validationMsg, previewImage} = this.state
        return (
            <div className="container-fluid container-register">
                {this.state.statusCheckItemLoading ? <ReactBootstrap.Spinner animation="border" className='item-loading'/> : ''}
                <AdminAlertInfo />
                <div className="row mt-5">
                    <div className="col-sm-12 d-flex justify-content-center">
                        <h1 className="title-register">ĐĂNG KÝ</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                    <form>
                            <div className="row">
                                {/* Left */}
                                <div className="col-sm-6">
                                    {/* <label htmlFor="Id"><b>Id</b></label>         
                                    <input className="input-field" type="text" placeholder="Id" name="Id" id="Id" value="1" disabled /> */}

                                    <label htmlFor="fullname"><b>Họ tên</b></label>      
                                    <input maxLength={255} onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Họ tên" name="fullname" id="fullname"/>
                                    <p className="msg-error-register">{validationMsg.fullname}</p>

                                    <label htmlFor="username"><b>Tên đăng nhập</b></label>    
                                    <input maxLength={255} onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Tên đăng nhập" name="username" id="username" />
                                    <p className="msg-error-register">{validationMsg.username}</p>

                                    <label htmlFor="password"><b>Mật khẩu</b></label>
                                    <input maxLength={255} onChange={(event) => this.isChange(event)} className="input-field" type="password" placeholder="Mật khẩu" name="password" id="password" />
                                    <p className="msg-error-register">{validationMsg.password}</p>

                                    <label htmlFor="repeat_password"><b>Nhập lại mật khẩu</b></label>
                                    <input maxLength={255} onChange={(event) => this.isChange(event)} className="input-field" type="password" placeholder="Nhập lại mật khẩu" name="repeat_password" id="repeat_password" />
                                    <p className="msg-error-register">{validationMsg.repeat_password}</p>

                                    <label htmlFor="email"><b>Email</b></label>
                                    <input maxLength={255} onChange={(event) => this.isChange(event)} className="input-field" type="email" placeholder="Email" id="email" name="email" />
                                    <p className="msg-error-register">{validationMsg.email}</p>

                                    <label htmlFor="gender"><b>Giới tính</b></label>
                                        <div>
                                            <input onChange={(event) => this.isChange(event)} type="radio" id="nam" name="gender" value="Nam" defaultChecked />
                                            <label htmlFor="nam">&nbsp; Nam</label> &nbsp; &nbsp; &nbsp;
                                            <input onChange={(event) => this.isChange(event)} type="radio" id="nu" name="gender" value="Nữ" />
                                            <label htmlFor="nu">&nbsp;  Nữ</label><br />
                                        </div>    
                                </div>

                                {/* Right */}
                                <div className="col-sm-6">
                                    <label htmlFor="address"><b>Địa chỉ</b></label>  
                                    <input maxLength={255} onChange={(event) => this.isChange(event)} className="input-field" type="text" placeholder="Địa chỉ" name="address" id="address" />
                                    <p className="msg-error-register">{validationMsg.address}</p>
                                    
                                    <label htmlFor="phonenumber"><b>Số điện thoại</b></label>  
                                    <input maxLength={255} type="number" onChange={(event) => this.isChange(event)} className="input-field" placeholder="Số điện thoại" name="phonenumber" id="phonenumber" />
                                    <p className="msg-error-register">{validationMsg.phonenumber}</p>
                                    
                                    <label htmlFor="birthday"><b>Ngày sinh</b></label>  
                                    <input onChange={(event) => this.isChange(event)} className="input-field" type="date" placeholder="Ngày sinh" name="birthday" id="birthday" value={this.state.birthday}/>
                                    
                                    <label htmlFor="avatar"><b>Ảnh đại diện</b></label>
                                    <input className="input-field" type="file" placeholder="Ảnh đại diện" onChange={this.selectFile} accept="image/*" id="avatar" name="avatar"/>
                                    <p className="msg-error-register">{validationMsg.avatar}</p>

                                    {previewImage && (
                                        <div>
                                            <img className="preview" src={previewImage} alt="" style={{height: 150, width: 150}}/>
                                        </div>
                                    )}

                                </div>
                            </div>
                            <div className="div-button-account">
                                <Link to="/">
                                    <button onClick={(event) => this.hadnleRegister(event)} 
                                    type="button" className="btn btn-success btn-save-account">Tạo tài khoản <BiSave /></button> 
                                </Link>

                                <Link to="/login">
                                    <button type="button" className="btn btn-success btn-return-login">Đăng nhập<BiLogIn /></button> 
                                </Link>

                                <button onClick={() => this.handleResest()} 
                                type="reset" className="btn btn-warning">Reset <BiReset /></button>
                                 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        statusRegister: state.statusRegister,
        statusItemLoading: state.statusItemLoading
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddUser: (userDto,file) => {
            dispatch(allActions.userAction.actRegisterRequest(userDto,file))
        },
        changeAdminAlertOn : (admin_alertContent, admin_alertType) => {
            dispatch(allActions.adminAlertInfoAction.changeAdminAlertOn(admin_alertContent, admin_alertType));
        },
        onOpenItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(RegisterPage))