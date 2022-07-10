import React, { Component } from 'react'
import { connect } from 'react-redux'
import allActions from '../../actions'
import { Form, Button, FloatingLabel } from "react-bootstrap"
import { BiSave, BiRefresh } from "react-icons/bi"

class AdminFormEditExercise extends Component {

    constructor(props){
        super(props);
        this.selectFile = this.selectFile.bind(this);

        this.state = {
            name_exercise: "",
            type_exercise: "1",
            description_exercise: "",
            currentFile: undefined,
            previewImage: undefined,
            statuschossefile: false,
            statusCheck: false
        }
    }
    

    selectFile(event) {
        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0]),
            statuschossefile: true
        });
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]:value
        });
    }

    handleUpdate = (e) => {
        e.preventDefault();
        let updateDto = {
            name: this.state.name_exercise,
            type: this.state.type_exercise.toString(),
            description: this.state.description_exercise
        }
        this.props.onOpenButtonLoading()
        this.props.onUpdateExercise(this.props.itemExerciseEdit.id ,updateDto, this.state.currentFile);
    }

    resetForm = () => {
        let {itemExerciseEdit} = this.props  
        this.setState({

            name_exercise: itemExerciseEdit.name,
            type_exercise: itemExerciseEdit.type,
            description_exercise: itemExerciseEdit.description,

            // preview image
            currentFile: undefined,
            previewImage: undefined,
            statuschossefile: false
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemExerciseEdit){
            let {itemExerciseEdit} = nextProps;
            this.setState({
                name_exercise: itemExerciseEdit.name,
                type_exercise: itemExerciseEdit.type,
                description_exercise: itemExerciseEdit.description
            })
        }
        if(nextProps && nextProps.statusButtonLoading){
            this.setState({
                statusCheck: nextProps.statusButtonLoading.statusCheck
            })
        }
    }

    render() {
        const {
            previewImage,
            name_exercise,
            type_exercise,
            description_exercise,
            statuschossefile,
            statusCheck
        } = this.state;

        const checkimage = this.props.itemExerciseEdit.image !== '' && statuschossefile === false
        return (
            <Form onSubmit={(e) => this.handleUpdate(e)}>
                <Form.Group>
                    <Form.Control
                        className="form-add-topic-vocabulary"
                        type="text"
                        placeholder="Tên bài tập *"
                        defaultValue={name_exercise}
                        name="name_exercise"
                        onChange={(event) => this.isChange(event)}
                        required
                    />
                </Form.Group>

                <FloatingLabel label="Loại *" className="mb-4">
                    <Form.Select value={type_exercise} aria-label="Floating label select example" name="type_exercise" onChange={(event) => this.isChange(event)} required>
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
                            defaultValue={description_exercise} 
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
                    />
                    {checkimage && <img style={{width:150, height:150}} src={this.props.itemExerciseEdit.image} alt="Ảnh mô tả chủ đề" />}
                    {previewImage && (
                        <div>
                            <img className="preview" src={previewImage} alt="" style={{height: 150, width: 150}}/>
                        </div>
                    )}
                </Form.Group>
                <Button disabled={statusCheck} variant="success" type="submit" className="button-add-topic-vocabulary">
                    {statusCheck && "Đang xử lý "}
                    {statusCheck && <BiRefresh />}
                    {!statusCheck && "Cập nhật "}
                    {!statusCheck && <BiSave />}
                </Button>
                <Button variant="warning" type="reset" className="button-edit-topic-vocabulary" onClick={() => {this.resetForm()}}>
                    Làm mới
                </Button>
                <Button variant="secondary"  onClick={this.props.handleCloseEdit} className="ml-2" style={{marginTop: '5%'}}>
                    Hủy
                </Button>
            </Form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        itemExerciseEdit: state.itemExerciseEdit,
        statusButtonLoading: state.statusButtonLoading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUpdateExercise: (id, UpdateExerciseDto, img_des) => {
            dispatch(allActions.adminExerciseAction.actUpdateExerciseRequest(id, UpdateExerciseDto, img_des))
        },
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminFormEditExercise)
