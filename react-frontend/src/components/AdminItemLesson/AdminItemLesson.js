import React, {Component,Fragment} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import allActions from '../../actions/index'
import { confirmAlert } from 'react-confirm-alert';


class AdminItemLesson extends Component {
    constructor(props) {
        super(props)
    }



    onDelete = () => {
       
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xóa không ?',
            buttons: [
              {
                label: 'Xác nhận',
                onClick: () => {
                    this.props.onDeleteLesson(this.props.lesson.id);
                    this.props.changeAdminAlertOn("Xóa thành công","danger");
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
    render() {
        return(
            <Fragment>
                <tr>
                    <td className="align-middle css-td-table">{this.props.lesson.id}</td>
                    <td className="align-middle css-td-table">{this.props.lesson.name}</td>
                    <td className="align-middle css-td-table">{this.props.lesson.chapterName}</td>
                    <td className="align-middle css-td-table">{this.props.lesson.courseName}</td>
                    <td className="align-middle css-td-table">        
                        <button className='btn-primary' style={{padding: '5px',borderRadius:'5px'}} onClick={()=>this.props.onOpenModal(this.props.linkVideo)}>
                            Play Video{" "}</button>
                           
                    </td>
                    <td className="align-middle css-td-table">
                        <Link to={`/admin/lesson/edit/${this.props.lesson.id}`}>
                            <button type="button" className="btn btn-warning btn-edit-account">Sửa</button>
                        </Link>
                        <button onClick={() => this.onDelete()}
                        type="button" className="btn btn-danger btn-delete-account">Xóa</button>
                    </td>
                </tr>
            </Fragment>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onDeleteLesson : (id) => {
            dispatch(allActions.lessonAction.actDeleteLessonRequest(id));
        },
        changeAdminAlertOn : (admin_alertContent, admin_alertType) => {
            dispatch(allActions.adminAlertInfoAction.changeAdminAlertOn(admin_alertContent, admin_alertType));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (AdminItemLesson);