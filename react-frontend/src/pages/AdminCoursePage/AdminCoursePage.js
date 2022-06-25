import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { BsFillPersonPlusFill } from "react-icons/bs";
import AdminItemCourse from '../../components/AdminItemCourse/AdminItemCourse'
import allActions from '../../actions';
import {connect} from 'react-redux'

class AdminCoursePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            term: '',
            courses:[]
        }
    }

    showItemsCourse(courses) {
        var result = null;
        if (courses!= undefined && courses.length > 0) {
            result = courses.map((course,key) => <AdminItemCourse course={course} key={key}/>) 
        }
        return result;
    }

    componentDidMount() {
        this.props.getAllCourses();
    }

    callback = (term) => {
        this.setState({
            term: term
        })
    }

    render() {
        var keyword = this.state.term;
        var course = this.props.courseReducer;
        var resultSearch = []
        course.forEach(x => {
            if (x.id.toString().indexOf(keyword)!=-1 || x.name.indexOf(keyword)!=-1 ||
             x.introduce.indexOf(keyword)!= -1) {
                 resultSearch.push(x)
             }
        });

        return(
            <div className="container-fluid content-admin-acconut">
                <div className="row">
                    <div className="col-12">
                        <div style={{marginTop: 10}}>
                            <div className="jumbotron manager-account">
                                <h2>Quản lí khoá học</h2>  
                            </div>
                            
                            <Link to="/admin/course/add" style={{textDecoration:"none"}}>
                                <button type="button" className="btn btn-success">Thêm mới<BsFillPersonPlusFill className="iconAddAccount"/></button> 
                            </Link>
                         
                            <input onChange={(event) => this.callback(event.target.value)}
                            type="text" name="search" placeholder="Tìm kiếm ..." className="searchAccount" />
                        </div>
                    </div>
                </div>
                <div className="row">
                        <div className="col-12">
                            <div className="table-responsive">
                                <table className="table-bordered text-sm-center table-custom" style={{marginTop: 10}}>
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Tên khoá học</th>
                                            <th scope="col">Giới Thiệu</th>
                                            <th scope="col">Ảnh khoá học</th>
                                            <th scope="col" style={{width:"250px"}}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Item course */}
                                        {this.showItemsCourse(resultSearch)}
                                    </tbody>      
                                </table>
                            </div>
                        {/* <AdminPagination /> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courseReducer:state.courseReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCourses: () => {
            dispatch(allActions.courseAction.actFetchCourseRequest())
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminCoursePage)