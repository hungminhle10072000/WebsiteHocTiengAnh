import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap"
import './FormSendMail.css'
import allActions from '../../actions/index';
import { connect } from 'react-redux';
import * as ReactBootstrap from 'react-bootstrap'
class FormSendMail extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            email: '',
            statusCheckItemLoading: false
        }
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.statusItemLoading){
            this.setState({
                statusCheckItemLoading: nextProps.statusItemLoading.statusCheck
            })
        }
    }

    handleSendMailPassWord = (e,username, email) => {
        e.preventDefault();
        this.props.onOpenItemLoading()
        this.props.onForgetPassWord(username, email);
    }

    render() {
        return (
            <Form onSubmit={(e) => this.handleSendMailPassWord(e,this.state.username, this.state.email)}>
                {this.state.statusCheckItemLoading ? <ReactBootstrap.Spinner animation="border" className='item-loading-form-sendmail'/> : ''}
                <Form.Group>
                    <Form.Control
                        maxLength={255} 
                        className="form-send-mail"
                        type="text"
                        placeholder="Tên đăng nhập *"
                        name="username"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        maxLength={255} 
                        className="form-send-mail"
                        type="email"
                        placeholder="Email *"
                        name="email"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Gửi
                </Button>
            </Form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        statusItemLoading: state.statusItemLoading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onForgetPassWord : (username, email) => {
            dispatch(allActions.userAction.actForgetPassWordRequest(username, email))
        },
        onOpenItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (FormSendMail);