import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap"
import { connect } from 'react-redux';
import './AdminFormAddTopicVocabulary.css'
import allActions from '../../actions'
import { BiSave, BiRefresh } from "react-icons/bi"

class AdminFormAddTopicVocabulary extends Component {

    constructor(props){
        super(props);
        this.selectFile = this.selectFile.bind(this);

        this.state = {
            name_topic : '',
            currentFile: undefined,
            previewImage: undefined,
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

    selectFile(event) {
        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0])
        });
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        });
    }

    handleAddVocaTopic = (e,name_topic, image) => {
        e.preventDefault();
        this.props.onOpenButtonLoading()
        this.props.onAddVocaTopic(name_topic, image);
    }

    render() {
        const {
            previewImage,
            statusCheck
        } = this.state;
        return (
            <Form onSubmit={(e) => this.handleAddVocaTopic(e,this.state.name_topic, this.state.currentFile)}>
                <Form.Group>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        placeholder="Tên chủ đề *"
                        name="name_topic"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="file"
                        accept="image/*"
                        placeholder="Hình ảnh chủ đề *"
                        name="image_topic"
                        onChange={this.selectFile}
                        required
                    />
                    {previewImage && (
                        <div>
                            <img className="preview" src={previewImage} alt="" style={{height: 150, width: 150}}/>
                        </div>
                    )}
                </Form.Group>
                <Button variant="success" type="submit" className="button-add-topic-vocabulary" disabled={statusCheck}>
                    {statusCheck && "Đang xử lý "}
                    {statusCheck && <BiRefresh />}
                    {!statusCheck && "Thêm "}
                    {!statusCheck && <BiSave />}
                </Button>
                <Button variant="secondary"  style={{marginTop: '5%'}} onClick={this.props.handleClose} className="ml-2">
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
        onAddVocaTopic : (name, image) => {
            dispatch(allActions.vocabularyTopicAction.actAddVocaTopicRequest(name, image))
        },
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminFormAddTopicVocabulary);


