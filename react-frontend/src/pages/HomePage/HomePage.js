import Slider from '../../components/Slider/Slider';
import React, { Component, Fragment } from 'react';
import './HomePage.css';
import SliderSwipper from '../../components/SliderSwipper/SliderSwipper';
import { connect } from 'react-redux';
import allActions from '../../actions';
import uuid from 'react-uuid';

class HomePage extends Component {

  constructor(props){
    super(props);

    this.state = {
      listTopicNews: [],
      listCourseNews: []
    }
}

  componentDidMount() {
    this.props.getAllVocaTopicsNew()
    this.props.getAllCourseNew()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.topicVocaNew){
        let {topicVocaNew} = nextProps
        this.setState({
          listTopicNews: topicVocaNew
        })
    }
    if(nextProps && nextProps.courseNew){
      let {courseNew} = nextProps
      this.setState({
        listCourseNews: courseNew
      })
  }
}

  render() {
    return (
      <Fragment>
          <Slider key={uuid()}/>
          <div className="row mt-3">
            <div className='col-sm-12'>
                  <h2 className='label-course-new'>Khóa học mới</h2>
                  <SliderSwipper key={uuid()} dataCouseNew={this.state.listCourseNews}/>
            </div>
          </div>
          <div className='row mt-3'>
              <div className='col-md-12 mb-2'>
                  <h2 className='label-course-new'>Chủ đề mới</h2>
                  <SliderSwipper key={uuid()} dataTopicsNew={this.state.listTopicNews}/>
              </div >
          </div>
      </Fragment>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    topicVocaNew: state.topicVocaNew,
    courseNew: state.courseNew
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      getAllVocaTopicsNew: () => {
          dispatch(allActions.userVocabularyTopicAction.actUserFetchTopicsVocaNewRequest());
      },
      getAllCourseNew: () => {
          dispatch(allActions.userCourseAction.actUserFetchCourseNewRequest());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePage)
