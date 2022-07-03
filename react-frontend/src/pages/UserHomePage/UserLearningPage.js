import React, {Component} from 'react'
import UserChapterItem from '../../components/UserComponents/UserChapterItem'
import VideoContainer from '../../components/UserComponents/VideoContainer';
import allActions from '../../actions';
import { connect } from 'react-redux';
import Comments from '../../components/Comment/Comments'
import './UserLearningPage.css'

class UserLearningPage extends Component {
    constructor(props){
        super(props);
        // console.log('PROPS: ',props)

        this.state = {
            isChapter:true,
            isComment:false,
            userCurrent: {
                id: -1
            },
            learningLessonId:0,
            learningLessonName:'',
            comments:[],
            isLogin:true,
            linkVideo:'https://www.youtube.com/watch?v=aXG9VizOJUk',
            course:{
                id:this.props.match.params.id,
                name:'Khoa Hoc 1',
                image: 'linkImage',
                introduce: 'introduce',
                chapters: [],
                users:[]
            },
        }
    }
    componentDidUpdate(prevProps) {
        var course = this.props.course;
        if (prevProps.course.chapters.length !== this.props.course.chapters.length) {
            if (course.chapters.length > 0 && course.chapters[0].lessons.length >0) {
                this.changedVideo(course.chapters[0].lessons[0].video,course.chapters[0].lessons[0].id,course.chapters[0].lessons[0].name)
            }
        }

        if (prevProps.comments.length ===0 && this.props.comments.length !==0) {
            this.props.onGetCommentByLessonId(this.state.learningLessonId)
            this.setState({
                course: course,
                comments: this.props.comments,
                userCurrent: this.props.userCurrent
            })
            
        }
        if ( prevProps.comments[0] && this.props.comments[0] && prevProps.comments[0].id !== this.props.comments[0].id) {
            this.props.onGetCommentByLessonId(this.state.learningLessonId)
            this.setState({
                course: course,
                comments: this.props.comments,
                userCurrent: this.props.userCurrent
            })
        }
        if (prevProps.comments.length !== this.props.comments.length) {
            this.props.onGetCommentByLessonId(this.state.learningLessonId)
            this.setState({
                course: course,
                comments: this.props.comments,
                userCurrent: this.props.userCurrent
            })
        }

        //Note
        if (prevProps.userCurrent.id !== this.props.userCurrent.id) {
            this.props.onFetchCourseIsDone(this.props.match.params.id,this.props.userCurrent.id);
            var course = this.props.course
            this.setState({
                course: course,
                comments: this.props.comments,
                userCurrent: this.props.userCurrent
            })
        }
   
        if (prevProps.course.id !== this.props.course.id) {
            if (course.chapters.length > 0 && course.chapters[0].lessons.length >0) {
                this.changedVideo(course.chapters[0].lessons[0].video,course.chapters[0].lessons[0].id,course.chapters[0].lessons[0].name)
            }
        }
    }
    componentDidMount() {
        this.props.onFetchCourseIsDone(this.state.course.id,this.props.userCurrent.id);
        this.props.onGetCommentByLessonId(this.state.learningLessonId)
        var course = this.props.course;
        this.setState({
            course: course,
            comments: this.props.comments,
            userCurrent: this.props.userCurrent
        })
        if (course.chapters.length > 0 && course.chapters[0].lessons.length >0) {
            this.changedVideo(course.chapters[0].lessons[0].video,course.chapters[0].lessons[0].id,course.chapters[0].lessons[0].name)
        }
      
    }
    componentWillReceiveProps(nextProps) {
        
        if(nextProps && nextProps.course){
            var {course} = nextProps;
            this.setState({
                course: course,
                comments: this.props.comments,
                userCurrent: nextProps.userCurrent
            })
        }
       
    } 
    
    changedVideo = (url,lessonId,name) => {
        this.props.onGetCommentByLessonId(lessonId)
        this.setState({linkVideo:url,
            learningLessonId:lessonId,
            learningLessonName:name,
            comments: this.props.comments
        })   
    }
    changedIsChapter =()  => {
        this.setState({isChapter: true,
        isComment: false})
    }
    changedIsComment =()  => {
        this.setState({isChapter: false,
        isComment: true})
    }
    showChapterItem = (isSub) => {
        // console.log("Chay show lesson: " + this.)
        return this.state.course.chapters.map((chapter)=><UserChapterItem key={chapter.id} chapter={chapter} changedVideo={this.changedVideo} isSub = {isSub}></UserChapterItem>)
    }

    subscribeCourse = () => {
        let usercourse = {
            user: {
                id: this.state.userCurrent.id
            },
            course: {
                id: this.state.course.id
            }
        }
        this.props.onAddUserCourse(usercourse)
        window.location.pathname = ('/user/learning/'+this.state.course.id)
    }


    render() {
        var isSub = true;
        if (this.state.course.users != null && this.state.course.users.length > 0) {
            for (let x of this.state.course.users) {
                if (x.id === this.state.userCurrent.id) {
                    isSub=false
                }
            }
        }
        return(
            <div className='container-fluid mt-1'>
                <h3>{this.state.course.name}</h3>
                <br/>
                <div className='row mb-3'>
                    <VideoContainer video={this.state.linkVideo}></VideoContainer>
                </div>
                <h4>{this.state.learningLessonName}</h4>
               <br/>
               {
                   (isSub || (this.state.userCurrent.id === -1))&&(
                    <div>
                        <h2>Miễn phí</h2>
                        <button className='btn mb-3' style={{backgroundColor: '#f05123', color: 'white'}} 
                        onClick={((this.state.userCurrent.id === -1) && (()=>window.location.pathname = ('/login'))) || (()=>this.subscribeCourse())}>Đăng ký học</button>
                    </div>
                   )
               }
               <div className='row'>
                   <div className='col-3 col-btn-learn'>
                        <button className='btn btn-success' onClick={() => this.changedIsChapter()} >Tổng quan</button>
                        <button style={{marginLeft: '2%'}} className='btn btn-warning' onClick={() => this.changedIsComment()}>Bình luận</button>
                   </div>
               </div>
               <br/>
               {this.state.isChapter && this.showChapterItem(!isSub)}
               {this.state.isComment && (<Comments currentUserId={this.state.userCurrent.id} comments={this.state.comments} learningId={this.state.learningLessonId} type='1'/>)} 
                <br/>
                <br/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        course: state.courseEditReducer,
        comments: state.commentReducer,
        userCurrent: state.itemUserLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditCourse: (id) => {
            dispatch(allActions.courseAction.actGetCourseRequest(id))
        },

        onUpdateCourse: (courseDto, file) => {
            dispatch(allActions.courseAction.actUpdateCourseRequest(courseDto, file))
        },
        onGetCommentByLessonId: (lessonId) => {
            dispatch(allActions.commentAction.actGetCommentByLessonIdRequest(lessonId))
        },
        onAddUserCourse:(usercourse) => {
            dispatch(allActions.userCourseAction.actAddUserCourseRequest(usercourse))
        },
        onFetchCourseIsDone: (id,userId) => {
            dispatch(allActions.courseAction.actGetCourseByIdAndUserIdRequest(id,userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLearningPage);