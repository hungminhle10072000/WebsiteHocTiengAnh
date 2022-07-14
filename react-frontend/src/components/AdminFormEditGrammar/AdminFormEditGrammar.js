import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from "react-bootstrap"
import './AdminFormEditGrammar.css'
import allActions from '../../actions'
import { BiSave, BiRefresh } from "react-icons/bi"

class AdminFormEditGrammar extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            name_grammar : '',
            statusCheck: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemGrammarEdit){
            let {itemGrammarEdit} = nextProps;
            this.setState({
                name_grammar: itemGrammarEdit.name
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
            [name]:value
        });
    }

    handleUpdateNameGrammar = (e) => {
        const {name_grammar} = this.state
        e.preventDefault();
        this.props.onOpenButtonLoading()
        this.props.onUpdateVocaTopic(this.props.itemGrammarEdit.id, name_grammar)
    }

    resetForm = () => {
        let {itemGrammarEdit} = this.props  
        this.setState({
            name_grammar: itemGrammarEdit.name,
        })
    }

    render() {
        const {
            name_grammar,
            statusCheck
        } = this.state;
        return (
            <Form onSubmit={(e) => this.handleUpdateNameGrammar(e)}>
                <Form.Group>
                    <Form.Control
                        className="form-add-grammar"
                        type="text"
                        placeholder="Tên bài học *"
                        name="name_grammar"
                        defaultValue={name_grammar}
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Button disabled={statusCheck} variant="success" type="submit" className="button-update-grammar">
                    {statusCheck && "Đang xử lý "}
                    {statusCheck && <BiRefresh />}
                    {!statusCheck && "Cập nhật "}
                    {!statusCheck && <BiSave />}
                </Button>
                <Button variant="warning" type="reset" className="button-reset-grammar" onClick={() => {this.resetForm()}}>
                    Làm mới
                </Button>
                <Button variant="secondary"  onClick={this.props.handleCloseEdit} className="ml-2" style={{marginTop: '1rem'}}>
                    Hủy
                </Button>
            </Form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        itemGrammarEdit: state.itemGrammarEdit,
        statusButtonLoading: state.statusButtonLoading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUpdateVocaTopic: (id,name_grammar) => {
            dispatch(allActions.grammarAction.actUpdateNameGrammarRequest(id, name_grammar));
        },
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminFormEditGrammar)
