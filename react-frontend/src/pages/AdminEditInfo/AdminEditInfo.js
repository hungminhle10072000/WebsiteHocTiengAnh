import React, { Component } from 'react'
import './AdminEditInfo.css'
import { connect } from 'react-redux'
import { BiSave, BiReset,BiKey, BiRefresh } from "react-icons/bi"
import allActions from '../../actions/index'
import validator from 'validator'

class AdminEditInfo extends Component {
    constructor(props){
        super(props);

        this.selectFile = this.selectFile.bind(this);
        // this.upload = this.upload.bind(this);

        this.state = {
            id: localStorage.getItem('idUser'),
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
            repeat_passwordNew: '',
            statusCheck: false
        }
    }

    openFormResetPassWord () {
        this.setState({
            openFormResetPassword: !this.state.openFormResetPassword
        })
    }

    selectFile(event) {
        this.setState({
            currentFile: event.target.files[0],
            statuschossefile: true,
            previewImage: URL.createObjectURL(event.target.files[0])
        });
    }

    // upload() {
    //     this.setState({
    //         process: 0
    //     });
    // }


    componentDidMount() {
        this.props.onItemLoading();
        this.props.onEditUser(this.state.id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemUserEdit){
            const {itemUserEdit} = nextProps;
            this.setState({
                user: {...itemUserEdit}
            })
        }
        if(nextProps && nextProps.statusButtonLoading){
            this.setState({
                statusCheck: nextProps.statusButtonLoading.statusCheck
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
        this.props.onOpenButtonLoading()
        this.props.onUpdateUser(this.state.user, this.state.currentFile, this.state.statuschossefile);
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
            msgPassWord.passwordNew = "Y??u c???u nh???p m???t kh???u m???i !"
        } else if (!validator.equals(this.state.passwordNew, this.state.repeat_passwordNew)) {
            msgPassWord.repeat_passwordNew = "M???t kh???u nh???p l???i kh??ng kh???p !"
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
            this.props.onOpenButtonLoading()
            this.props.onUserUpdatePassWord(user.username,passwordOld, passwordNew)
        } 
    }

    validateAll = () => {
        const msg = {}
        if(validator.isEmpty(this.state.user.fullname)){
            msg.fullname = "Y??u c???u nh???p t??n !"
        }
        if(validator.isEmpty(this.state.user.username)){
            msg.username = "Y??u c???u nh???p t??n ????ng nh???p !"
        }
        // if(validator.isEmpty(this.state.user.password)){
        //     msg.password = "Y??u c???u nh???p m???t kh???u !"
        // }
        // if(validator.isEmpty(this.state.user.repeat_password)){
        //     msg.repeat_password = "Y??u c???u nh???p l???i m???t kh???u !"
        // } else if (!validator.equals(this.state.user.password, this.state.user.repeat_password)) {
        //     msg.repeat_password = "M???t kh???u nh???p l???i kh??ng kh???p !"
        // }
        if(validator.isEmpty(this.state.user.phonenumber)){
            msg.phonenumber = "Y??u c???u nh???p s??? ??i???n tho???i !"
        } else if (!validator.isMobilePhone(this.state.user.phonenumber)){
            msg.phonenumber = "Y??u c???u nh???p ????ng s??? ??i???n tho???i !"
        }
        if(validator.isEmpty(this.state.user.email)){
            msg.email = "Y??u c???u nh???p ?????a ch??? gmail !"
        } else if (!validator.isEmail(this.state.user.email)) {
            msg.email = "Y??u c???u nh???p ????ng gmail !"
        }
        if(validator.isEmpty(this.state.user.address)){
            msg.address = "Y??u c???u nh???p ?????a ch??? !"
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

    render() {

        const checkavartar = this.state.user.avatar !== '' && this.state.statuschossefile === false;
        const { 
            previewImage,
            validationMsg,
            validationMsgPassword,
            statusCheck
        } = this.state;

        return (
            <div className="container-fluid container-admin-add-account mt-2 pt-2 pb-2" style={{backgroundColor: 'white'}}>
                <div className="container-dialog">
                    <div className="confirmation-text">
                        B???n c?? ch???c ch???n mu???n c???p nh???t ?
                    </div>
                    <div className="button-container">
                        <button 
                            className="confirmation-button cancel-button" 
                            onClick={(event) => this.handleConfirmationBox(event)}>
                            H???y
                        </button>
                        <button 
                            className="confirmation-button btn-confirm"
                            onClick={(event) => this.updateUser(event)}>
                            X??c nh???n
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
                                <h2>Thay ?????i th??ng tin </h2>  
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


                                    <label htmlFor="username"><b>T??n ????ng nh???p</b></label>    
                                    <input disabled className="input-field" value={this.state.user.username} onChange={(event) => this.isChange(event)}
                                    type="text" placeholder="T??n ????ng nh???p" name="username" id="username" />
                                    <p className="msg-error">{validationMsg.username}</p>

                                    <label htmlFor="fullname"><b>H??? t??n</b></label>      
                                    <input onChange={(event) => this.isChange(event)}
                                    className="input-field" value={this.state.user.fullname} type="text" placeholder="H??? t??n" name="fullname" id="fullname"/>
                                    <p className="msg-error">{validationMsg.fullname}</p>

                                    {/* <label htmlFor="password"><b>M???t kh???u</b></label>
                                    <input className="input-field" type="password" value={this.state.user.password} onChange={(event) => this.isChange(event)}
                                    placeholder="M???t kh???u" name="password" id="password" />
                                    <p className="msg-error">{validationMsg.password}</p>

                                    <label htmlFor="repeat_password"><b>Nh???p l???i m???t kh???u</b></label>
                                    <input className="input-field" type="password" value={this.state.user.repeat_password} onChange={(event) => this.isChange(event)}
                                    placeholder="Nh???p l???i m???t kh???u" name="repeat_password" id="repeat_password" />
                                    <p className="msg-error">{validationMsg.repeat_password}</p> */}

                                    <label htmlFor="email"><b>Email</b></label>
                                    <input className="input-field" type="email" value={this.state.user.email} onChange={(event) => this.isChange(event)}
                                    placeholder="Email" id="email" name="email" />
                                    <p className="msg-error">{validationMsg.email}</p>

                                    <label htmlFor="gender"><b>Gi???i t??nh</b></label>
                                    <div>
                                        <input  onChange={(event) => this.isChange(event)} type="radio" id="nam" name="gender" value="Nam" checked={this.state.user.gender === "Nam"} />
                                        <label htmlFor="nam">&nbsp; Nam</label> &nbsp; &nbsp; &nbsp;
                                        <input  onChange={(event) => this.isChange(event)} type="radio" id="nu" name="gender" value="N???" checked={this.state.user.gender === "N???"}/>
                                        <label htmlFor="nu">&nbsp;  N???</label><br />
                                    </div>

                                     {/* <label htmlFor="role"><b>Quy???n</b></label>
                                    <div>
                                        <input onChange={(event) => this.isChange(event)} type="radio" id="Admin" name="role" value="Admin" checked={this.state.user.role === "Admin"}/>
                                        <label htmlFor="Admin">&nbsp; Admin</label> &nbsp; &nbsp; &nbsp;
                                        <input onChange={(event) => this.isChange(event)} type="radio" id="User" name="role" value="User" checked={this.state.user.role === "User"} />
                                        <label htmlFor="User">&nbsp;  User</label><br />
                                    </div>    */}

                                </div>

                                {/* Right */}
                                <div className="col-sm-6">
                                    <label htmlFor="address"><b>?????a ch???</b></label>  
                                    <input className="input-field" type="text" value={this.state.user.address} onChange={(event) => this.isChange(event)}
                                    placeholder="?????a ch???" name="address" id="address" />
                                    <p className="msg-error">{validationMsg.address}</p>

                                    <label htmlFor="phonenumber"><b>S??? ??i???n tho???i</b></label>  
                                    <input className="input-field" type="text" value={this.state.user.phonenumber} onChange={(event) => this.isChange(event)}
                                    placeholder="S??? ??i???n tho???i" name="phonenumber" id="phonenumber" />
                                    <p className="msg-error">{validationMsg.phonenumber}</p>
                                    
                                    <label htmlFor="birthday"><b>Ng??y sinh</b></label>  
                                    <input className="input-field" type="date" value={this.state.user.birthday} onChange={(event) => this.isChange(event)}
                                    placeholder="Ng??y sinh" name="birthday" id="birthday" />
                                    
                                    <label htmlFor="avatar"><b>???nh ?????i di???n</b></label>
                                    <input className="input-field" type="file" placeholder="???nh ?????i di???n" onChange={this.selectFile} accept="image/*" id="avatar" name="avatar"/>
                                    {checkavartar && <img style={{width:150, height:150}} src={this.state.user.avartar} alt="???nh ?????i di???n" />}
                                    {previewImage && (
                                        <div>
                                            <img className="preview" src={previewImage} alt="" style={{height: 150, width: 150}}/>
                                        </div>
                                    )}
 
                                </div>
                            </div>

                            <div className="div-button-account">
                                    <button disabled={statusCheck} type="button" onClick={(event) => this.handleConfirmationBox(event)}
                                    className="btn btn-success btn-save-account">
                                        {statusCheck && "??ang x??? l?? "}
                                        {statusCheck && <BiRefresh />}
                                        {!statusCheck && "C???p nh???t "}
                                        {!statusCheck && <BiSave />}
                                    </button> 

                                    <button type="button" onClick={(event) =>  this.openFormResetPassWord()}
                                    className="btn btn-danger">?????i m???t kh???u <BiKey /></button> 

                                    <button type="reset" onClick={(event) =>  this.resetForm(event)} style={{marginLeft: '1%'}}
                                    className="btn btn-warning">L??m m???i <BiReset /></button> 
                            </div>
                        </form>
                        {this.state.openFormResetPassword && 
                        <div className="row mt-3 div-reset-password">
                            <div className="col-md-6">
                                <label htmlFor="passwordOld"><b>M???t kh???u c??</b></label>
                                <input className="input-field" type="password" onChange={(event) => this.isChangePassWord(event)}
                                placeholder="M???t kh???u" name="passwordOld" id="passwordOld" />
                                <p className="msg-error">{validationMsgPassword.passwordOld}</p>

                                <label htmlFor="passwordNew"><b>M???t kh???u m???i</b></label>
                                <input className="input-field" type="password" onChange={(event) => this.isChangePassWord(event)}
                                placeholder="Nh???p l???i m???t kh???u" name="passwordNew" id="passwordNew" />
                                <p className="msg-error">{validationMsgPassword.passwordNew}</p>

                                <label htmlFor="repeat_passwordNew"><b>Nh???p l???i m???t kh???u m???i</b></label>
                                <input className="input-field" type="password" onChange={(event) => this.isChangePassWord(event)}
                                placeholder="Nh???p l???i m???t kh???u" name="repeat_passwordNew" id="repeat_passwordNew" />
                                <p className="msg-error">{validationMsgPassword.repeat_passwordNew}</p>
                                
                                <button disabled={statusCheck} type="button" onClick={() =>  this.handleUpdatePassWord()}
                                className="btn btn-danger">
                                    {statusCheck && "??ang x??? l?? "}
                                    {statusCheck && <BiRefresh />}
                                    {!statusCheck && "C???p nh???t "}
                                    {!statusCheck && <BiKey />}
                                </button> 
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
        users: state.users,
        itemUserLogin: state.itemUserLogin,
        statusButtonLoading: state.statusButtonLoading
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
        onItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        },
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminEditInfo)