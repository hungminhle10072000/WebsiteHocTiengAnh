import React, { Component } from 'react'
import './LoginPage.css'
import { FaFacebook,FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import allActions from '../../actions';
import validator from 'validator';
import AdminAlertInfo from '../../components/AdminAlertInfo/AdminAlertInfo';
import { Link } from 'react-router-dom';
import { Modal, Button} from 'react-bootstrap';
import FormSendMail from '../../components/FormSendMail/FormSendMail';
import * as ReactBootstrap from 'react-bootstrap'
import Hotkeys from 'react-hot-keys';

class LoginPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            psw: '',
            validationMsg: {},
            showForm: false,
            statusCheckItemLoading: false
        }
    }
    handleKeyPress = e => {
        e.keyCode === 13 &&
        this.handleLogin();
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.statusFormSendMail){
            let {statusFormSendMail} = nextProps
            this.setState({
                showForm: statusFormSendMail.openFormSendMail
            })
        }
        if(nextProps && nextProps.statusItemLoading){
            this.setState({
                statusCheckItemLoading: nextProps.statusItemLoading.statusCheck
            })
        }
    }
    

    handleShow = (event) => {
        event.preventDefault();
        this.props.onFormSendMail();
    }

    handleClose = () => this.props.offFormSendMail();
    
    
    validateAll = () => {
        const msg = {}
        if(validator.isEmpty(this.state.username)){
            msg.username = "Yêu cầu nhập tên đăng nhập !"
        }
        if(validator.isEmpty(this.state.psw)){
            msg.psw = "Yêu cầu nhập mật khẩu !"
        }

        this.setState({
            validationMsg: msg
        })
        if(Object.keys(msg).length > 0) return false
        return true;
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    handleLogin = () => {
        let {username, psw} = this.state;
        const isValid = this.validateAll();
        if(!isValid) return
        else 
        {
            this.props.onOpenItemLoading();
            this.props.onLoginUser(username, psw);
        }         
    }

    handleRedirectHome = () => {
        this.props.history.push('/');
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]:value
        });
      }

    render() {

        const {validationMsg} = this.state;
        if(this.props.itemUserLogin.role === "Admin"){
            window.location.pathname = ('/admin');
        } else if(this.props.itemUserLogin.role === "User"){
            window.location.pathname = ('/');
        }  
        return (
            <Hotkeys 
                onKeyDown={(e)=> this.handleKeyPress(e)}
            >
                 <div className="container-fluid container-login">
                {this.state.statusCheckItemLoading ? <ReactBootstrap.Spinner animation="border" className='item-loading'/> : ''}
                <AdminAlertInfo />
                <div className="login-form">
                    <div>  
                        {/* <h1>Đăng nhập</h1> */}
                        <img
                            src="/logo.jpg"
                            width="80"
                            height="80"
                            className="d-inline-block align-top"
                            alt="Logo website"
                            onClick={() => this.handleRedirectHome()}
                        />
                        <p className="msg-error">{validationMsg.username}</p>
                        <div className="form-group-login">
                            <input type="text" name="username" maxLength={255} onChange={(event) => this.isChange(event)} placeholder="Tên đăng nhập" />
                            {/* <span className="input-icon"><i className="fa fa-envelope" /></span> */}
                            <span className="input-icon"><FaUser /></span>
                        </div>

                        <p className="msg-error">{validationMsg.psw}</p>  
                        <div className="form-group-login">
                            <input type="password" name="psw"  maxLength={255}   onChange={(event) => this.isChange(event)} placeholder="Mật khẩu" />
                            {/* <span className="input-icon"><i className="fa fa-lock" /></span> */}
                            <span className="input-icon"><RiLockPasswordFill /></span>
                        </div>
                            
                        <button className="login-btn" onClick={() => this.handleLogin()}>Đăng nhập</button>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <Link className="link-login" to="/register"  onClick={(event) => this.handleShow(event)}>
                                        <span className="reset-psw">Quên mật khẩu ?</span>
                                    </Link>
                                </div>
                                <div className="col-sm-6">
                                    <Link className="link-login" to="/register">
                                        <span className="reset-psw" >Đăng ký tài khoản</span>
                                    </Link>
                                </div>
                            </div>     
                        </div>     
                        <div style={{height:'150px'}}>

                        </div>
                    </div>
                </div>
                <Modal show={this.state.showForm} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Lấy lại mật khẩu
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormSendMail />
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Hủy
                            </Button>
                    </Modal.Footer>
                </Modal>
                </div>
            </Hotkeys>
           
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        itemUserLogin: state.itemUserLogin,
        statusFormSendMail: state.statusFormSendMail,
        statusItemLoading: state.statusItemLoading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLoginUser : (username, password) => {
            dispatch(allActions.userAction.actLoginUserRequest(username,password));
        },
        onFormSendMail : () => {
            dispatch(allActions.openFormSendMail.changeFormSendMailOn())
        },
        offFormSendMail : () => {
            dispatch(allActions.openFormSendMail.changeFormSendMailOff())
        },
        onOpenItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(LoginPage))
