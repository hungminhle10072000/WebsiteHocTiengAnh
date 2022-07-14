import React, { Component } from 'react'
import './AdminDetailTopicVocabulary.css'
import AdminItemDetailVocabularyTopic from '../../components/AdminItemDetailVocabularyTopic/AdminItemDetailVocabularyTopic';
import { connect } from 'react-redux'
import allActions from '../../actions';
import { IoAddCircle } from "react-icons/io5";
import { Modal, Button} from 'react-bootstrap';
import AdminFormAddVocabulary from '../../components/AdminFormAddVocabulary/AdminFormAddVocabulary';
import AdminFormEditVocabulary from '../../components/AdminFormEditVocabulary/AdminFormEditVocabulary'


class AdminDetailTopicVocabulary extends Component {

    constructor(props) {

        super(props);
        this.state = ({
            idTopic: this.props.match.params.idTopic,
            nameTopicPara: this.props.match.params.nameTopicVoca,
            listVocabularyWithTopic: [],
            nameTopic: '',
            showFormAdd: false,
            showFormEditVoca: false
        })
    }

    componentDidMount() {
        const {nameTopicPara,idTopic} = this.state
        this.props.onItemLoading()
        this.props.getVocaWithTopic(nameTopicPara,idTopic);
    }

    componentWillReceiveProps(nextProps) {
        if((nextProps && nextProps.listVocabularyWithTopic) || (nextProps && nextProps.statusFormAddVoca)){
            const listVoca = nextProps.listVocabularyWithTopic.vocasWithTopic;
            const nameTopic = nextProps.listVocabularyWithTopic.nameTopic;
            const showFormAdd = nextProps.statusFormAddVoca.openFormAddVoca;
            const showFormEditVoca = nextProps.statusFormAddVoca.openFormEditVoca;
            this.setState({
                listVocabularyWithTopic: listVoca,
                nameTopic: nameTopic,
                showFormAdd: showFormAdd,
                showFormEditVoca: showFormEditVoca
            })
        }
    }
    
    showItemVocabulary = () => {
        let result = null;
        if(this.state.listVocabularyWithTopic.length > 0){
            result = this.state.listVocabularyWithTopic.map((voca, key) => {
                return(
                    <AdminItemDetailVocabularyTopic 
                        key={voca.id}
                        id={voca.id}
                        ordinal = {key+1}
                        content = {voca.content}
                        example_vocabulary = {voca.example_vocabulary}
                        explain_vocabulary = {voca.explain_vocabulary}
                        file_audio = {voca.file_audio}
                        image = {voca.image}
                        mean = {voca.mean}
                        transcribe = {voca.transcribe}
                        mean_example_vocabulary = {voca.mean_example_vocabulary}
                    />
                ) 
            })
        }
        return result;
    }


    handleAddVoca = () => {
        this.props.onOpenFormAddVoca();
    }

    handleCloseAdd = () => {
        this.props.onOffFormAddVoca();
    }

    handleCloseFormEdit = () => {
        this.props.onOffFormEditVoca();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row text-center justify-content-center">
                    <div className="col-sm-4 title-name-detail-topic">BÀI {this.state.nameTopic.toUpperCase()}</div>
                </div>
                <div className="container-fluid mt-5">
                <div className="table-responsive">
                                <table className="table table-bordered" style={{marginTop: 10}}>
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showItemVocabulary()}
                                    </tbody> 
                                    <tfoot>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Chức năng</th>              
                                        </tr>
                                    </tfoot>           
                                </table>
                            </div>   
                </div>
                <Modal show={this.state.showFormAdd} onHide={() => this.handleCloseAdd()}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Thêm từ mới
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AdminFormAddVocabulary idTopic={this.state.idTopic} handleCloseAdd = {this.handleCloseAdd}/>
                    </Modal.Body>
                    {/* <Modal.Footer>
                            <Button variant="secondary"  onClick={() => this.handleCloseAdd()}>
                                Hủy
                            </Button>
                    </Modal.Footer> */}
                </Modal>
                <Modal show={this.state.showFormEditVoca} onHide={() => this.handleCloseFormEdit()}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Chỉnh sửa từ mới
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AdminFormEditVocabulary handleCloseFormEdit={this.handleCloseFormEdit}/>
                    </Modal.Body>
                    {/* <Modal.Footer>
                            <Button variant="secondary"  onClick={() => this.handleCloseFormEdit()}>
                                Hủy
                            </Button>
                    </Modal.Footer> */}
                </Modal>
                <IoAddCircle className="btn-admin-add-voca" onClick={() => this.handleAddVoca()}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        listVocabularyWithTopic: state.listVocabularyWithTopic,
        statusFormAddVoca: state.statusFormAddVoca
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getVocaWithTopic: (nameTopic, topicId) => {
            dispatch(allActions.vocabularyAction.actFetchVocaWithTopicRequest(nameTopic, topicId))
        },
        onOpenFormAddVoca: () => {
            dispatch(allActions.openFormAddVoca.changeFormAddVocaOn())
        },
        onOffFormAddVoca: () => {
            dispatch(allActions.openFormAddVoca.changeFormAddVocaOff())
        },
        onOffFormEditVoca: () => {
            dispatch(allActions.openFormAddVoca.changeFormEditVocaOff())
        },
        onItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (AdminDetailTopicVocabulary);

