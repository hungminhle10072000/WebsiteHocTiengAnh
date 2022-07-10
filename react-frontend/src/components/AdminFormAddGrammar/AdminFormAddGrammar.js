import React, { Component } from 'react'
import { connect } from 'react-redux'
import allActions from '../../actions'
import { Form, Button } from "react-bootstrap"
import './AdminFormAddGrammar.css'
import { BiSave, BiRefresh } from "react-icons/bi"

class AdminFormAddGrammar extends Component {

    constructor(props){
        super(props);

        this.state = {
            name_grammar : '',
            statusCheck: false
        }
    }

    componentWillReceiveProps(nextProps) {
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
            [name]:value
        });
    }

    handleAddGrammar = (e,name_grammar) => {
        e.preventDefault();
        this.props.onOpenButtonLoading()
        this.props.onAddGrammarName(name_grammar);
    }

    render() {
        const {statusCheck} = this.state
        return (
            <Form onSubmit={(e) => this.handleAddGrammar(e,this.state.name_grammar)}>
                <Form.Group>
                    <Form.Control
                        className="form-add-grammar"
                        type="text"
                        placeholder="Tên bài học *"
                        name="name_grammar"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Button disabled={statusCheck} variant="success" type="submit" className="button-add-grammar">
                    {statusCheck && "Đang xử lý "}
                    {statusCheck && <BiRefresh />}
                    {!statusCheck && "Thêm "}
                    {!statusCheck && <BiSave />}
                </Button>
                <Button variant="secondary"  onClick={this.props.handleClose} className="ml-2" style={{marginTop: '1rem'}}>
                    Hủy
                </Button>
            </Form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        statusButtonLoading: state.statusButtonLoading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddGrammarName : (name) => {
            dispatch(allActions.grammarAction.actAddGrammarNameRequest(name))
        },
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminFormAddGrammar);


