import React, { Component } from 'react'
import UserItemCourse from '../../components/UserComponents/UserItemCourse'
import './css/UserHome.css'
import allActions from '../../actions';
import { connect } from 'react-redux'
import '../../App.css'
import {splitString} from '../../utils/index'
import '../../components/UserComponents/UserComponent.css'
import Footer from '../../components/UserComponents/Footer';
class UserHomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.match.params.type,
            course: {
                name: 'Nghĩa',
                image: 'Image',
                introduce: 'Java'
            },
            courses: [],
            coursesOfUser: [],
            userCurrent: {
                id: -1
            }
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.courses != this.props.courses || prevProps.type !== this.props.type) {
            this.setState({
                type: this.props.match.params.type,
                courses: this.props.courseReducer,
                userCurrent: this.props.userCurrent
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.courseReducer) {
            const courses = nextProps.courseReducer;
            this.setState({
                type: this.props.match.params.type,
                courses: courses,
                userCurrent: nextProps.userCurrent
            })
        }
    }

    componentDidMount() {
       
        this.props.getAllCourses();
        this.setState({
            type: this.props.match.params.type,
            courses: this.props.courseReducer,
            userCurrent: this.props.userCurrent
        })
    }
    showItemsCourse(courses) {
        var result = null;
        if (courses != undefined && courses.length > 0) {
            result = courses.map((course, key) => <UserItemCourse course={course} key={key} />)
        }
        return result;
    }
    render() {
        const coursesOfUser = []
        const coursesOtherwise = []
        if (this.state.courses !== null) {
            for (let item of this.state.courses) {
                let flag = 0;
                if (item.users !== null) {
                    for (let user of item.users) {
                        if (user.id === this.state.userCurrent.id) {
                            flag = 1;
                        }
                    }
                }

                if (flag === 1) {
                    coursesOfUser.push(item)
                } else {
                    coursesOtherwise.push(item)
                }
            }
        }
        return (
           

            <div>
                {this.state.userCurrent.id !== -1 ? (
                    <div className='container-fluid main-content-user-courses bg-white'>
                        <div className='title-size-l'>Khoá đang học</div>
                        <div className='flex-outline'>
                            {this.showItemsCourse(coursesOfUser)}
                        </div>
                        <br />
                        {this.props.match.params.type == 0 && 
                        <div>
                            <div className='title-size-l'>Khoá học chưa đăng ký</div>
                            <div className='flex-outline'>
                                {this.showItemsCourse(coursesOtherwise)}
                            </div>
                        </div>}
                    </div>
                ) : (
                    <div className='container-fluid main-content-user-courses bg-white'>
                        <div className='title-size-l'>Tất cả khoá học</div>
                        <div className='flex-outline'>
                            {this.showItemsCourse(this.state.courses)}
                        </div>
                    </div>
                )
            }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        courseReducer: state.courseReducer,
        userCurrent: state.itemUserLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCourses: () => {
            dispatch(allActions.courseAction.actFetchCourseRequest())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage)