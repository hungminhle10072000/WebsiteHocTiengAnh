import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './AdminGrammar.css'
import { AiOutlineFileAdd } from "react-icons/ai"
import AdminItemGrammar from '../../components/AdminItemGrammar/AdminItemGrammar'
import { connect } from 'react-redux';
import allActions from '../../actions';
import { Modal, Button} from 'react-bootstrap';
import AdminFormAddGrammar from '../../components/AdminFormAddGrammar/AdminFormAddGrammar';
import AdminFormEditGrammar from '../../components/AdminFormEditGrammar/AdminFormEditGrammar';
class AdminGrammar extends Component {

    constructor(props){
        super(props);

        this.state = {
            term: '',
            showFormAdd: false,
            showFormEdit: false
        }
    }

    componentDidMount() {
        this.props.onItemLoading();
        this.props.getAllGrammars();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.statusFormAddGrammar){
            let {statusFormAddGrammar} = nextProps
            this.setState({
                showFormAdd: statusFormAddGrammar.openFormAddGrammar,
                showFormEdit: statusFormAddGrammar.openFormEditGrammar
            })
        }
    }
    

    showItemGrammar (grammars) {
        var result = null;
        if(grammars.length > 0 ){
            result = grammars.map((grammar, key) => {
                return (
                    <AdminItemGrammar 
                        key={key}
                        id={grammar.id}
                        name={grammar.name}
                        content={grammar.content}
                    />
                )
            })
        }
        return result;
    }

    callback = (term) => {
        this.setState({
            term: term
        })
    }

    handleClose = () => {
        this.props.offFormAddGrammar();
    }

    handleCloseEdit = () => {
        this.props.offFormEditGrammar();
    }

    handleShow = (event) => {
        event.preventDefault();
        this.props.onFormAddGrammar();
    }
    
    render() {
        var dataSearch = this.state.term;
        var dataTable = this.props.grammars;
        var resultSearch = []
        dataTable.forEach((item) => {
            let idSearch = item.id.toString();
            if(idSearch.indexOf(dataSearch) !== -1 || item.name.indexOf(dataSearch) !== -1){
                resultSearch.push(item);
            }
        })
        return (
            <div className="container-fluid content-admin-grammar">
                <div className="row">
                    <div className="col-12">
                        <div style={{marginTop: 10}}>
                            <div className="jumbotron manager-grammar">
                                <h2>Qu???n l?? ng??? ph??p</h2>  
                            </div>
                            
                            <Link to="#" style={{textDecoration:"none"}} onClick={this.handleShow}>
                                <button type="button" className="btn btn-success btn-add-grammar">Th??m m???i<AiOutlineFileAdd color={"white"} className="iconAddGrammar"/></button> 
                            </Link>
                         
                            <input onChange={(event) => this.callback(event.target.value)}
                            type="text" name="search" placeholder="T??m ki???m ..." className="searchGrammar" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table-bordered text-sm-center table-custom" style={{marginTop: '1rem'}}>
                                <thead className="thead-inverse">
                                    <tr>
                                        <th>ID</th>
                                        <th>T??n b??i</th>
                                        <th>Ch???c n??ng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showItemGrammar(resultSearch)}
                                </tbody>
                                <tfoot className="thead-inverse">
                                    <tr>
                                        <th>ID</th>
                                        <th>T??n b??i</th>
                                        <th>Ch???c n??ng</th>
                                    </tr>
                                </tfoot>        
                        </table>      
                    </div>
                </div>
                <Modal show={this.state.showFormAdd} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Th??m b??i h???c ng??? ph??p
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AdminFormAddGrammar handleClose={this.handleClose}/>
                    </Modal.Body>
                    {/* <Modal.Footer>
                            <Button variant="secondary"  onClick={() => this.handleClose()}>
                                H???y
                            </Button>
                    </Modal.Footer> */}
                </Modal>
                <Modal show={this.state.showFormEdit} onHide={() => this.handleCloseEdit()}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Ch???nh s???a t??n b??i h???c
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AdminFormEditGrammar handleCloseEdit={this.handleCloseEdit}/>
                    </Modal.Body>
                    {/* <Modal.Footer>
                            <Button variant="secondary"  onClick={() => this.handleCloseEdit()}>
                                H???y
                            </Button>
                    </Modal.Footer> */}
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        grammars: state.grammarsReducer,
        statusFormAddGrammar: state.statusFormAddGrammar
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllGrammars: () => {
            dispatch(allActions.grammarAction.actFetchGrammarRequest());
        },
        onFormAddGrammar: () => {
            dispatch(allActions.openFormGrammar.changeFormGrammarOn());
        },
        offFormAddGrammar: () => {
            dispatch(allActions.openFormGrammar.changeFormGrammarOff());
        },
        offFormEditGrammar: () => {
            dispatch(allActions.openFormGrammar.changeFormEditGrammarOff())
        },
        onItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminGrammar);

