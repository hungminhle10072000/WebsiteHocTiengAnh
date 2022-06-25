import React, { Component } from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";
import { connect } from 'react-redux';
import allActions from '../../actions/index';
class AdminAlertInfo extends Component {
    handleDismiss = () => {
        this.props.changeAdminAlertOff();
    }
    render() {
        if(this.props.AdminAlertShow === false){
            return null
        } else {
            return (
                <AlertContainer>
                    <Alert type={this.props.AdminAlertType} onDismiss={()=>this.handleDismiss()} timeout={5000}>
                        {this.props.AdminAlertContent}
                    </Alert>
                </AlertContainer>
            )
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        AdminAlertShow: state.admin_alert_info.AdminAlertShow,
        AdminAlertContent: state.admin_alert_info.AdminAlertContent,
        AdminAlertType: state.admin_alert_info.AdminAlertType
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAdminAlertOff : () => {
            dispatch(allActions.adminAlertInfoAction.changeAdminAlertOff())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (AdminAlertInfo)
