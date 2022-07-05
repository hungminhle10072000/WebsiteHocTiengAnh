import React, {Component} from 'react'
import UserLessonItem from './UserLessonItem';
import '../css/UserCSS.css'
class UserChapterItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            chapter: {
                id: this.props.chapter.id,
                name: this.props.chapter.name,
                number: this.props.chapter.number,
                courseId: this.props.chapter.courseId,
                courseName: this.props.chapter.courseName,
                lessons: this.props.chapter.lessons,
                numOfLesson: this.props.chapter.numOfLesson
            },
            showResults: false
        }
    }

    onClick = () => {
        this.state.showResults ? this.setState({showResults:false}):this.setState({showResults:true})
    }

    showLessonItem = () => {
        // console.log(this.state.chapter)
        return this.state.chapter.lessons.sort((a,b) => a.numPriority - b.numPriority).map((lesson)=><UserLessonItem key={lesson.id} lesson={lesson} changedVideo={this.props.changedVideo} isSub={this.props.isSub}></UserLessonItem>)
    }
    render() {
        return(
            <div>
                <div className="card-header header-chapter" style={{padding:'8px',paddingLeft:'15px'}} onClick={this.onClick}>
                    <strong style={{fontSize:'14px',color:'#1786be',textTransform:'uppercase'}}>{this.state.chapter.name}</strong>  
                    <span className="badge rounded-pill bg-danger" style={{float:'right'}}>{this.state.chapter.numOfLesson}'</span>
                </div>
                {this.state.showResults ? this.showLessonItem() : null}
            </div>
        )
    }
}
export default UserChapterItem