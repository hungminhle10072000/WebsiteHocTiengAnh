import React, { Component } from 'react'
import { Form, Button, FloatingLabel } from "react-bootstrap"
import { connect } from 'react-redux';
import allActions from '../../actions';
import { BiSave, BiRefresh } from "react-icons/bi";

class AdminFormAddExercise extends Component {

    constructor(props){
        super(props);
        this.selectFile = this.selectFile.bind(this);

        this.state = {
            name_exercise: "",
            type_exercise: "1",
            description_exercise: "",
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

    handleAddVocaTopic = (e) => {
        e.preventDefault();
        let addDto = {
            name: this.state.name_exercise,
            type: this.state.type_exercise.toString(),
            description: this.state.description_exercise
        }
        this.props.onOpenButtonLoading()
        this.props.onAddExercise(addDto, this.state.currentFile);
    }

    render() {
        const {
            previewImage,
            statusCheck
        } = this.state;
        return (
            <Form onSubmit={(e) => this.handleAddVocaTopic(e)}>
                <Form.Group>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        placeholder="Tên bài tập *"
                        name="name_exercise"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>

                <FloatingLabel label="Loại *" className="mb-4">
                    <Form.Select aria-label="Floating label select example" name="type_exercise" onChange={(event) => this.isChange(event)} required>
                        <option value="1">Bài tập đọc</option>
                        <option value="2">Bài tập nghe</option>
                        <option value="3">Bài tập đọc + nghe</option>
                    </Form.Select>
                </FloatingLabel>

                <Form.Group className="mb-3">
                        <Form.Control
                            className="form-add-topic-vocabulary" 
                            as="textarea" 
                            rows={3} 
                            placeholder="Mô tả *"
                            name="description_exercise"
                            onChange={(event) => this.isChange(event)}
                            required
                        />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="file"
                        accept="image/*"
                        placeholder="Hình ảnh mô tả *"
                        name="image_exercise"
                        onChange={this.selectFile}
                        required
                    />
                    {previewImage && (
                        <div>
                            <img className="preview" src={previewImage} alt="" style={{height: 150, width: 150}}/>
                        </div>
                    )}
                </Form.Group>
                <Button  disabled={statusCheck} variant="success" type="submit" className="button-add-topic-vocabulary">
                    {statusCheck && "Đang xử lý "}
                    {statusCheck && <BiRefresh />}
                    {!statusCheck && "Thêm "}
                    {!statusCheck && <BiSave />}
                </Button>
                <Button variant="secondary"  onClick={this.props.handleClose} className="ml-2" style={{marginTop: '5%'}}>
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
       onAddExercise: (AddExerciseDto, img_des) => {
            dispatch(allActions.adminExerciseAction.actAddExerciseRequest(AddExerciseDto, img_des))
       },
       onOpenButtonLoading: () => {
        dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
    }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (AdminFormAddExercise)
