import React, { Component } from 'react'
import './AdminNavBar.css'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { AdminSideNav } from '../AdminSideNav/AdminSideNav';
import { connect } from 'react-redux';
import allActions from '../../actions/index';

class AdminNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: false,
            idUserLogin: localStorage.getItem('idUser')
        };
    }

    componentDidMount() {
        if(this.state.idUserLogin !== null){
            this.props.onGetUserLogin(this.state.idUserLogin)
        }
    }

    redirectUserHome = (e) => {
        e.preventDefault();
        window.location.pathname = "/user/home";
    }

    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("w2rt3");
        localStorage.removeItem("idUser");
        window.location.pathname = "/"
    }

    showSidebar = () => {
        this.setState ({
            sidebar: !this.state.sidebar
        });
    }

    render() {
        return (
            <>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <div className='navbar'>
                        <h2 style={{color: 'white'}}>Quản lí website</h2>
                        <Link to='#' className={this.state.sidebar ? 'menu-bars-close' : 'menu-bars'}>
                            <FaIcons.FaBars onClick={this.showSidebar} />
                        </Link>
                    </div>
                    <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={this.showSidebar}>
                            <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            {AdminSideNav.map((item, index) => {
                                if(item.path === '/'){
                                    return(
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path} onClick={(e) => {this.logout(e)}}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    )
                                } else if (item.path === '/user/home'){
                                    return(
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path} onClick={(e) => {this.redirectUserHome(e)}}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    )
                                } 
                                else {
                                    return (
                                        <li key={index} className={item.cName}>
                                        <Link to={item.path} >
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </nav>
                    </IconContext.Provider>
                </>
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) ((AdminNavBar))