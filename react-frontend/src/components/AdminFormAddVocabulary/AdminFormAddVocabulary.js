import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from "react-bootstrap"
import allActions from '../../actions'
import ReactAudioPlayer from 'react-audio-player'
import { BiSave, BiRefresh } from "react-icons/bi"

class AdminFormAddVocabulary extends Component {

    constructor(props){
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.selectFileAudio = this.selectFileAudio.bind(this);


        this.state = {
            currentFile: undefined,
            previewImage: undefined,
            previewAudio: undefined,
            currentFileAudio: undefined,
            vocaDto : {
                content: '',
                transcribe: '',
                mean_example_vocabulary: '',
                mean: '',
                explain_vocabulary: '',
                example_vocabulary: '',
                idVocabularyTopic: this.props.idTopic
            },
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

    selectFileAudio(event) {
        this.setState({
            currentFileAudio: event.target.files[0],
            previewAudio: URL.createObjectURL(event.target.files[0])
        });
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
            vocaDto: {
                ...this.state.vocaDto,
                [name]:value
            }
        });
    }

    handleAddVoca = (e) => {
        const {currentFile, currentFileAudio, vocaDto} = this.state
        e.preventDefault();
        this.props.onOpenButtonLoading()
        this.props.onAddVocabulary(vocaDto, currentFileAudio, currentFile)
    }

    render() {
        const {
            previewImage,
            previewAudio,
            statusCheck
        } = this.state;
        return (
            <Form onSubmit={(e) => this.handleAddVoca(e)}>
                <Form.Group>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        placeholder="Nội dung từ *"
                        name="content"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Form.Group style={{marginBottom: 20}}>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        as="textarea" 
                        rows={3}
                        placeholder="Giải thích *"
                        name="explain_vocabulary"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                            className="form-add-topic-vocabulary"
                            type="text"
                            placeholder="Từ loại *"
                            name="mean"
                            onChange={(event) => this.isChange(event)}
                            required
                        />
                </Form.Group>
                <Form.Group style={{marginBottom: 20}}>
                    <Form.Control
                            className="form-add-topic-vocabulary"
                            type="text"
                            placeholder="Ví dụ *"
                            as="textarea" 
                            rows={3}
                            name="example_vocabulary"
                            onChange={(event) => this.isChange(event)}
                            required
                        />
                </Form.Group>                    
                <Form.Group style={{marginBottom: 20}}>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        as="textarea" 
                        rows={3}
                        placeholder="Dịch nghĩa ví dụ *"
                        name="mean_example_vocabulary"
                        onChange={(event) => this.isChange(event)}
                        required
                    />    
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Chọn file audio *
                    </Form.Label>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="file"
                        accept="audio/*"
                        placeholder="File nghe cửa từ *"
                        name="file_audio"
                        onChange={this.selectFileAudio}
                        required
                    />
                    {previewAudio && <ReactAudioPlayer
                        src={previewAudio}
                        controls
                    />}   
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Chọn hình ảnh mô tả *
                    </Form.Label>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="file"
                        accept="image/*"
                        placeholder="Hình ảnh mô tả *"
                        name="file_image"
                        onChange={this.selectFile}
                        required
                    />
                    {previewImage && (
                        <div>
                            <img className="preview" src={previewImage} alt="" style={{height: 150, width: 150}}/>
                        </div>
                    )}
                </Form.Group>
                <Button disabled={statusCheck} variant="success" type="submit" className="button-add-topic-vocabulary">
                    {statusCheck && "Đang xử lý "}
                    {statusCheck && <BiRefresh />}
                    {!statusCheck && "Thêm "}
                    {!statusCheck && <BiSave />}
                </Button>
                <Button variant="secondary"  onClick={this.props.handleCloseAdd} className="ml-2" style={{marginTop: '5%'}}>
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
        onAddVocabulary: (vocaDto, file_audio, file_image) => {
            dispatch(allActions.vocabularyAction.actAddVocaForTopicRequest(vocaDto, file_audio, file_image))
        },
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminFormAddVocabulary);


