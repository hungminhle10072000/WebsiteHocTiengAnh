import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import UserRoutes from '../../customRoutes/UserRoutes';
import './UserHomePage.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import NavigationBar from '../../components/UserNavBar/NavigationBar'
import Sidebar from '../../components/UserSideBar/Sidebar'
import AdminAlertInfo from '../../components/AdminAlertInfo/AdminAlertInfo'
import * as ReactBootstrap from 'react-bootstrap'
import { connect } from 'react-redux';
import Slider from '../../components/Slider/Slider';
import Footer from '../../components/UserComponents/Footer'

class UserHomePage extends Component {

    constructor(props){
        super(props);

        this.state = ({
            statusCheckItemLoading: false
        })
    }

    componentDidMount() {
        this.setState({
            statusCheckItemLoading: this.props.statusItemLoading.statusCheck
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.statusItemLoading){
            this.setState({
                statusCheckItemLoading: nextProps.statusItemLoading.statusCheck
            })
        }
    }
    

    kiemtra = () => {
        return this.props.history.push('/login');
    }
    render() {
        return (
            <div className="main-user-home">
                <Router>
                        <AdminAlertInfo />
                        <NavigationBar/>
                        <div className='container-fluid'>
                            <div className="main-sidebar-user row">
                                <div className="sideBar-user" style={{paddingRight: 0, paddingLeft: 0}}>
                                    <Sidebar />
                                </div>
                                <div className="content-user pa--0 pl--125 bg-w">
                                    {this.state.statusCheckItemLoading ? <ReactBootstrap.Spinner animation="border" className='item-loading'/> : ''}
                                    <UserRoutes />
                                </div>
                            </div>
                        </div>      
                        <Footer/>              
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        statusItemLoading: state.statusItemLoading
    }
}

export default connect(mapStateToProps, null) (withRouter(UserHomePage));