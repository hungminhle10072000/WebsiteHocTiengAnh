import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { BsFillPersonPlusFill } from "react-icons/bs";
import AdminItemChapter from '../../components/AdminItemChapter/AdminItemChapter'
import allActions from '../../actions';
import {connect} from 'react-redux'
import {RiAddFill} from 'react-icons/ri'

class AdminChapterPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            term: '',
            chapters:[]
        }
    }

    showItemsChapter(chapters) {
        var result = null;
        if (chapters!= undefined && chapters.length > 0) {
            result = chapters.sort((a,b) => a.numPriority - b.numPriority).map((chapter,key) => <AdminItemChapter chapter={chapter} key={key}/>) 
        }
        if (this.state.id == -1 && chapters!= undefined && chapters.length > 0) {
            result = chapters.sort((a,b) =>  (a.courseId !== b.courseId) ? a.courseId - b.courseId : a.numPriority - b.numPriority).map((chapter,key) => <AdminItemChapter chapter={chapter} key={key}/>) 
        }
        return result;
    }

    componentDidMount() {
        if (this.state.id != -1) {
            this.props.getChaptersByCourseId(this.state.id);
        } else {
            this.props.getAllChapters();
        }
    }

    callback = (term) => {
        this.setState({
            term: term
        })
    }

    render() {
        var keyword = this.state.term;
        var chapters = this.props.chapters;
        var resultSearch = []
        chapters.forEach(x => {
            if (x.id.toString().indexOf(keyword)!=-1 || x.name.indexOf(keyword)!=-1 ||
             x.courseName.indexOf(keyword)!= -1) {
                 resultSearch.push(x)
             }
        });

        return(
            <div className="container-fluid content-admin-acconut">
                <div className="row">
                    <div className="col-12">
                        <div style={{marginTop: 10}}>
                            <div className="jumbotron manager-account">
                                <h2>Quản lí chương học</h2>  
                            </div>
                            {this.props.match.params.id != -1 &&
                            <Link to={`/admin/chapter/add/${this.state.id}`} style={{textDecoration:"none", display:'inline-block'}}>
                            <button type="button" className="btn btn-success btn-add-account">Thêm mới<RiAddFill className="iconWithText"/></button> 
                            </Link>
                            
                            }
                            <input onChange={(event) => this.callback(event.target.value)}
                            type="text" name="search" placeholder="Tìm kiếm ..." maxLength={255} className="searchAccount" />
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
                                            <th scope="col">Tên chương học</th>
                                            <th scope="col">Số bài</th>
                                            <th scope="col">Khoá học</th>
                                            <th scope="col">Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Item chapter */}
                                        {this.showItemsChapter(resultSearch)}
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
        chapters:state.chapterReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllChapters: () => {
            dispatch(allActions.chapterAction.actFetchChapterRequest())
        },
        getChaptersByCourseId: (courseId) => {
            dispatch(allActions.chapterAction.actGetChapterByCourseIdRequest(courseId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminChapterPage)