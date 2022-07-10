import React, { Component } from 'react'
import './AdminExercises.css'
import allActions from '../../actions';
import { Link } from 'react-router-dom';
import { Modal, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { AiOutlineFileAdd } from "react-icons/ai";
import AdminFormAddExercise from '../../components/AdminFormAddExercise/AdminFormAddExercise';
import AdminItemExercise from '../../components/AdminItemExercise/AdminItemExercise';
import AdminFormEditExercise from '../../components/AdminFormEditExercise/AdminFormEditExercise';

class AdminExercises extends Component {

    constructor(props){
        super(props);

        this.state = {
            term: '',
            showForm: false,
            showFormEdit: false
        }
    }

    componentDidMount() {
        this.props.onItemLoading()
        this.props.getAllExercise()
    }

    showItemExercise (allExercise) {
        var result = null;
        if(allExercise.length > 0 ){
            result = allExercise.map((exercise, key) => {
                return (
                    <AdminItemExercise 
                        key={key}
                        id={exercise.id}
                        name={exercise.name}
                        image={exercise.image}
                        type={exercise.type}
                        description={exercise.description}
                    />
                )
            })
        }
        return result;
    }


    handleShow = (event) => {
        event.preventDefault();
        this.props.onFormAddExercise();
    }

    handleClose = () => {
        this.props.offFormAddExercise();
    }

    handleCloseEdit = () => {
        this.props.offFormEditExercise();
    }

    callback = (term) => {
        this.setState({
            term: term
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.statusFormAdminExercise){
            let {statusFormAdminExercise} = nextProps
            this.setState({
                showForm: statusFormAdminExercise.openFormAddExercise,
                showFormEdit: statusFormAdminExercise.openFormEditExercise
            })
        }
    }


    render() {
        const dataSearch = this.state.term;
        const dataTable = this.props.exerciseReducer;
        const resultSearch = []
        dataTable.forEach((item) => {
            let idSearch = item.id.toString();
            if(idSearch.indexOf(dataSearch) !== -1 || item.name.indexOf(dataSearch) !== -1
                || item.description.indexOf(dataSearch) !== -1){
                resultSearch.push(item);
            }
        })
        return (
            <div className="container-fluid content-admin-voca-topic">
                <div className="row">
                    <div className="col-12">
                        <div style={{marginTop: 10}}>
                            <div className="jumbotron manager-voca-topic">
                                <h2>Danh sách bài tập</h2>  
                            </div>
                            
                            <Link to="#" style={{textDecoration:"none"}} onClick={this.handleShow}>
                                <button type="button" className="btn btn-success btn-add-voca-topic">Thêm mới<AiOutlineFileAdd color={"white"} className="iconAddVocaTopic"/></button> 
                            </Link>
                         
                            <input onChange={(event) => this.callback(event.target.value)}
                            type="text" name="search" placeholder="Tìm kiếm ..." className="searchTopic" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table-bordered text-sm-center table-custom" style={{marginTop: '1rem'}}>
                            <thead className="thead-inverse">
                                <tr>
                                    <th>ID</th>
                                    <th>Tên bài tập</th>
                                    <th>Ảnh</th>
                                    <th>Loại</th>
                                    <th className='th-description'>Mô tả</th>
                                    <th>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showItemExercise(resultSearch)}
                            </tbody>
                            <tfoot className="thead-inverse">
                                <tr>
                                    <th>ID</th>
                                    <th>Tên bài tập</th>
                                    <th>Ảnh</th>
                                    <th>Loại</th>
                                    <th>Mô tả</th>
                                    <th>Chức năng</th>
                                </tr>
                            </tfoot>        
                        </table>
                    </div>

                </div>
                <Modal show={this.state.showFormEdit} onHide={() => this.handleCloseEdit()}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Chỉnh sửa bài tập
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AdminFormEditExercise handleCloseEdit={this.handleCloseEdit}/>
                    </Modal.Body>
                    {/* <Modal.Footer>
                            <Button variant="secondary"  onClick={() => this.handleCloseEdit()}>
                                Hủy
                            </Button>
                    </Modal.Footer> */}
                </Modal>
                <Modal show={this.state.showForm} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Thêm bài tập
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AdminFormAddExercise handleClose={this.handleClose}/>
                    </Modal.Body>
                    {/* <Modal.Footer>
                            <Button variant="secondary"  onClick={() => this.handleClose()}>
                                Hủy
                            </Button>
                    </Modal.Footer> */}
                </Modal>
            </div>          
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        statusFormAdminExercise: state.statusFormAdminExercise,
        exerciseReducer: state.exerciseReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllExercise: () => {
            dispatch(allActions.adminExerciseAction.actFetchAllExerciseRequest());
        },
        onFormAddExercise: () => {
            dispatch(allActions.adminExerciseAction.changeFormAddExerciseOn());
        },
        offFormAddExercise: () => {
            dispatch(allActions.adminExerciseAction.changeFormAddExerciseOff());
        },
        offFormEditExercise: () => {
            dispatch(allActions.adminExerciseAction.changeFormEditExerciseOff());
        },
        onItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminExercises)