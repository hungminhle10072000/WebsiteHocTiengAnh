import React, { Component } from 'react'
import { connect } from 'react-redux'
import allActions from '../../actions'
import { Fragment } from 'react'
import {
    Link
} from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'
import convertURL from '../../constants/convertUrl'

class AdminItemExercise extends Component {

    onDelete = () => {

        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xóa không ?',
            buttons: [
              {
                label: 'Xác nhận',
                onClick: () => {
                    this.props.onDeleteExcerciseWithId(this.props.id);
                }
              },
              {
                label: 'Hủy',
                onClick: () => {
                }
              }
            ]
          });
    }

    onEdit = () => {
        this.props.onGetExerciseEdit(this.props.id)
        this.props.onFormEditExercise()
    }

    render() {
        let type_exercise = ""
        if(this.props.type === 1){
            type_exercise = "Bài tập đọc"
        }
        if(this.props.type === 2){
            type_exercise = "Bài tập nghe"
        }
        if(this.props.type === 3){
            type_exercise = "Bài tập đọc và nghe"
        }
        return (
            <Fragment>
                <tr>
                    <td className="align-middle css-td-table">{this.props.id}</td>
                    <td className="align-middle css-td-table">{this.props.name}</td>
                    <td className="align-middle css-td-table"><img style={{width:100, height:100}} src={this.props.image} alt="Ảnh minh họa chủ đề"/></td>
                    <td className="align-middle css-td-table">{type_exercise}</td>
                    <td className="align-middle css-td-table">{this.props.description}</td>
                    <td className="align-middle css-td-table">
                        <Link to="#" onClick={() => this.onEdit()}>
                            <button type="button" className="btn btn-warning btn-edit-voca-topic">Sửa</button>
                        </Link>
                        <button onClick={() => this.onDelete()}
                        type="button" className="btn btn-danger btn-delete-voca-topic">Xóa</button>
                         <Link to={"/admin/exercise/" + this.props.id + "/" + convertURL(this.props.name) }>
                            <button type="button" className="btn btn-info btn-detail-voca-topic">Chi tiết</button>
                        </Link>
                    </td>
                </tr>
            </Fragment>
        )
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onDeleteExcerciseWithId: (id) => {
            dispatch(allActions.adminExerciseAction.actDeleteExerciseWithIdRequest(id))
        },
        onFormEditExercise: () => {
            dispatch(allActions.adminExerciseAction.changeFormEditExerciseOn());
        },
        onGetExerciseEdit: (id) => {
            dispatch(allActions.adminExerciseAction.actGetExerciseWithIdRequest(id))
        }
    }
}

export default connect(null, mapDispatchToProps) (AdminItemExercise)
