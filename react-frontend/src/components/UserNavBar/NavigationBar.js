import React, { Component } from 'react'
import { Nav, Navbar, Form, FormControl,Button } from 'react-bootstrap';
import './NavigationBar.css';
import { withRouter} from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import allActions from '../../actions/index';
import {BiUserCircle} from 'react-icons/bi'
import {HiOutlineLogout} from 'react-icons/hi'
import {FaUserEdit} from 'react-icons/fa'
import {MdOndemandVideo} from 'react-icons/md'
import { Spring, animated } from 'react-spring'

class NavigationBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            idUserLogin: localStorage.getItem('idUser')
        }     
    }

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    componentDidMount() {
        if(this.state.idUserLogin !== null){
            this.props.onGetUserLogin(this.state.idUserLogin)
        }
    }
    
    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("w2rt3");
        localStorage.removeItem("idUser");
        window.location.pathname = "/"
    }

    handleRedirectInfo = () => {
        this.props.onOpenItemLoading()
        this.props.history.push('/user/account/edit/' + this.props.itemUserLogin.id)
    }
    handleRedirectMyCourse = () =>{
        this.props.history.push('/user/courses/'+'1')
    }
    render() {
        const checkUserLogin = this.state.idUserLogin !== null;
        return (
            <Navbar expand="lg" className="navBar-user-home">
                <div className="div-brand-user">
                    <Spring
                        from={{rotateZ: 0 }}
                        to={{rotateZ: 360}}
                    >
                        {props =>     
                            <animated.div style={props}>
                                <Navbar.Brand href="/" className="navBrand-user-home">
                                    <img
                                        src="/logo.png"
                                        width="80"
                                        height="80"
                                        className="d-inline-block align-top"
                                        alt="Logo website"
                                    />
                                </Navbar.Brand>
                            </animated.div>}
                    </Spring>
                    {' '}
                    <span className="text-brand">Cùng nhau học tiếng anh</span>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                </div>

                <div>
                    <Form className="form-center-navbar" style={{display: 'none'}}>
                        <FormControl type="text" placeholder="Tìm kiếm khóa học" style={{width: 400}}/>
                    </Form>
                </div>
               
                <div>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {checkUserLogin ?   
                        <Nav className="div-setting-user ml-auto">
                            <Nav.Item>
                                <img className='icon-user-login' src={this.props.itemUserLogin.avartar}/>
                                {/* <BiUserCircle color='black' className='icon-user-login'/> */}
                            </Nav.Item> 
                            <div className="setting-user">
                                <div className='display-info-login'>
                                    <img className='display-user' src={this.props.itemUserLogin.avartar}/>
                                    <span style={{fontWeight: 600, color: 'black', fontSize: '1rem'}}>{this.props.itemUserLogin.fullname}</span>
                                </div>
                                <div className="dislay-setting setting-user-item setting-edit-info" onClick={() => this.handleRedirectInfo()}>
                                    <FaUserEdit/> <span>Thay đổi thông tin</span>
                                </div>
                                <div className="dislay-setting setting-user-item"  onClick={() => this.handleRedirectMyCourse()}>
                                    <MdOndemandVideo/> <span>Khóa học của tôi</span>
                                </div>
                                <div className="dislay-setting setting-user-item setting-logout" onClick={e => this.logout(e)}> 
                                    <HiOutlineLogout/> <span>Đăng xuất</span>
                                </div>
                            </div>
                        </Nav> :
                        <Nav className="ml-auto">
                            <Nav.Item><Nav.Link href="/login" className="button-user-login">Đăng nhập</Nav.Link></Nav.Item> 
                        </Nav>}
                    </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itemUserLogin: state.itemUserLogin
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGetUserLogin: (id) => {
            dispatch(allActions.userAction.actRememberUserLoginRequest(id))
        },
        onOpenItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withRouter(NavigationBar))
