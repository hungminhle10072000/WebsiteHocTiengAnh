import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from "react-bootstrap"
import allActions from '../../actions'
import ReactAudioPlayer from 'react-audio-player'
import { BiSave, BiRefresh } from "react-icons/bi"


class AdminFormEditVocabulary extends Component {

    constructor(props){
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.selectFileAudio = this.selectFileAudio.bind(this);

        this.state = {
            currentFile: undefined,
            currentFileAudio: undefined,
            previewImage: undefined,
            previewAudio: undefined,
            statusChossefileAudio: false,
            statusChossefileImage: false,
            itemVoca : {
                id: -1,
                content: '',
                transcribe: '',
                mean_example_vocabulary: '',
                mean: '',
                explain_vocabulary: '',
                example_vocabulary: '',
                file_audio: '',
                image: ''
            },
            statusCheck: false
        }
    }

    selectFileAudio(event) {
        this.setState({
            currentFileAudio: event.target.files[0],
            previewAudio: URL.createObjectURL(event.target.files[0]),
            statusChossefileAudio: true
        });
    }

    selectFile(event) {
        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0]),
            statusChossefileImage: true
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemVocaEdit){
            const {itemVocaEdit} = nextProps
            this.setState({
                itemVoca : {
                    id: itemVocaEdit.id,
                    content: itemVocaEdit.content,
                    transcribe: '',
                    mean_example_vocabulary: itemVocaEdit.mean_example_vocabulary,
                    mean: itemVocaEdit.mean,
                    explain_vocabulary: itemVocaEdit.explain_vocabulary,
                    example_vocabulary: itemVocaEdit.example_vocabulary,
                    file_audio: itemVocaEdit.file_audio,
                    image: itemVocaEdit.image
                }
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
            itemVoca: {
                ...this.state.itemVoca,
                [name]:value
            }
        });
    }

    handleReset = () => {
        let {itemVocaEdit} = this.props;
        this.setState({
            itemVoca : {
                id: itemVocaEdit.id,
                content: itemVocaEdit.content,
                transcribe: itemVocaEdit.transcribe,
                mean_example_vocabulary: itemVocaEdit.mean_example_vocabulary,
                mean: itemVocaEdit.mean,
                explain_vocabulary: itemVocaEdit.explain_vocabulary,
                example_vocabulary: itemVocaEdit.example_vocabulary,
                file_audio: itemVocaEdit.file_audio,
                image: itemVocaEdit.image
            },
            currentFile: undefined,
            currentFileAudio: undefined,
            previewImage: undefined,
            previewAudio: undefined,
            statusChossefileAudio: false,
            statusChossefileImage: false
        });
    }
    
    handleUpdateVoca = (e) => {
        let {itemVoca,currentFileAudio,currentFile} = this.state
        e.preventDefault();
        this.props.onOpenButtonLoading()
        this.props.onUpdateVocabulary(itemVoca.id, itemVoca, currentFileAudio, currentFile);
    }

    render() {
        const {
            previewImage,
            previewAudio,
            itemVoca,
            statusChossefileImage,
            statusChossefileAudio,
            statusCheck
        } = this.state;

        const checkfileAudio = itemVoca.file_audio !== '' && statusChossefileAudio === false
        const checkimage = itemVoca.image !== '' && statusChossefileImage === false

        return (
            <Form onSubmit={(e) => this.handleUpdateVoca(e)}>
                <Form.Group>
                    <Form.Label style={{fontWeight: 'bold'}}>Nội dung từ *</Form.Label>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        placeholder="Nội dung từ *"
                        defaultValue={itemVoca.content}
                        name="content"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Form.Group style={{marginBottom: 20}}>
                    <Form.Label style={{fontWeight: 'bold'}}>Giải thích *</Form.Label>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        placeholder="Giải thích *"
                        as="textarea" 
                        rows={3}
                        defaultValue={itemVoca.explain_vocabulary}
                        name="explain_vocabulary"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{fontWeight: 'bold'}}>Từ loại *</Form.Label>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        placeholder="Từ loại *"
                        defaultValue={itemVoca.mean}
                        name="mean"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Form.Group style={{marginBottom: 20}}>
                    <Form.Label style={{fontWeight: 'bold'}}>Ví dụ *</Form.Label>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        placeholder="Ví dụ *"
                        as="textarea" 
                        rows={3}
                        defaultValue={itemVoca.example_vocabulary}
                        name="example_vocabulary"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Form.Group style={{marginBottom: 20}}>
                    <Form.Label style={{fontWeight: 'bold'}}>Dịch nghĩa ví dụ *</Form.Label>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        placeholder="Dịch nghĩa ví dụ *"
                        as="textarea" 
                        rows={3}
                        defaultValue={itemVoca.mean_example_vocabulary}
                        name="mean_example_vocabulary"
                        onChange={(event) => this.isChange(event)}
                        required
                    />    
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{fontWeight: 'bold'}}>
                        Chọn file audio *
                    </Form.Label>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="file"
                        accept="audio/*"
                        placeholder="File nghe cửa từ *"
                        name="file_audio"
                        onChange={this.selectFileAudio}
                    />
                    {checkfileAudio && <ReactAudioPlayer
                        src={itemVoca.file_audio}
                        controls
                    />}
                    {previewAudio && <ReactAudioPlayer
                        src={previewAudio}
                        controls
                    />}   
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{fontWeight: 'bold'}}>
                        Chọn hình ảnh mô tả *
                    </Form.Label>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="file"
                        accept="image/*"
                        placeholder="Hình ảnh mô tả *"
                        name="file_image"
                        onChange={this.selectFile}
                    />
                    {checkimage && <img style={{width:150, height:150,  marginBottom: 5}} src={itemVoca.image} alt="Ảnh mô tả từ" />}
                    {previewImage && (
                        <div>
                            <img className="preview" src={previewImage} alt="Ảnh mô tả từ" style={{height: 150, width: 150, marginBottom: 5}}/>
                        </div>
                    )}
                </Form.Group>
                <Button disabled={statusCheck} variant="success" type="submit" className="button-edit-vocabulary">  
                    {statusCheck && "Đang xử lý "}
                    {statusCheck && <BiRefresh />}
                    {!statusCheck && "Cập nhật "}
                    {!statusCheck && <BiSave />}
                </Button>
                <Button style={{marginLeft: 5}} variant="warning" type="reset" className="button-reset-vocabulary" onClick={() => this.handleReset()}>
                    Làm mới
                </Button>
                <Button variant="secondary"  onClick={this.props.handleCloseFormEdit} className="ml-2">
                    Hủy
                </Button>
            </Form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        itemVocaEdit: state.itemVocaEdit,
        statusButtonLoading: state.statusButtonLoading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUpdateVocabulary: (id , vocabularyUpdateDto, file_audio, image) => {
            dispatch(allActions.vocabularyAction.actUpdateVocabularyRequest(id , vocabularyUpdateDto, file_audio, image))
        },
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (AdminFormEditVocabulary)
