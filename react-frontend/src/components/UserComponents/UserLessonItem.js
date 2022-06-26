import React, {Component} from 'react'
import '../css/UserCSS.css'
import { Space } from 'antd';
import {Link} from "react-router-dom"
import { Tooltip } from 'antd';
import {
    FileDoneOutlined,
    AccountBookOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

import { Row, Col } from 'antd';
  
class UserLessonItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            lesson: {
                id: this.props.lesson.id,
                name: this.props.lesson.name,
                number: this.props.lesson.number,
                chapterId:this.props.lesson.chapterId,
                chapterName: this.props.lesson.chapterName,
                courseName: this.props.lesson.courseName,
                doneExercise: this.props.lesson.doneExercise,
                video:this.props.lesson.video
            }
        }
    }

    render() {
        let hasExercise = this.props.lesson.exerciseId;
        let hasVocabulary = this.props.lesson.vocabularyTopicId;
        let isDoneExercise = this.props.lesson.doneExercise;
        // console.log("isDoneExercise",isDoneExercise)
        return(
            <div >
                <Row className={!this.props.isSub ? 'lesson-item-disable' : ''}>
                    <Col span={0.5}>
                        <div>
                            {isDoneExercise ? <CheckCircleOutlined style={{color:"green"}}/> : <div style={{width:"32px"}}></div>}
                        </div>
                    </Col>
                    <Col span={21}>
                        <div style={{ padding: '0px' }} onClick={() => this.props.isSub && this.props.changedVideo(this.state.lesson.video, this.state.lesson.id, this.state.lesson.name)}>
                            <span style={{ fontWeight: 400 }}>{this.state.lesson.number}</span>
                            <img src="/svg/schedule_black_24dp.svg" alt="" height="15" style={{ marginRight: '5px' }} />
                            <label className={this.props.isSub ? 'title-lesson-name' : ''} title={this.state.lesson.name}>{this.state.lesson.name}</label>
                            <hr style={{ marginBottom: '8px', marginTop: '8px', color: '#dddddd', height: '1px' }} />
                        </div>
                    </Col>
                    <Col span={2}>
                        <Space >
                            <Link className={this.props.isSub && hasExercise ? 'lesson-action lesson-action--enable' : 'lesson-action lesson-action--disable'} to={`/user/exercise/${hasExercise}`} style={{ textDecoration: 'none' }}>
                                <Tooltip title="Bài tập">
                                    <FileDoneOutlined className='icon-css' />
                                </Tooltip>
                            </Link>
                            <Link className={this.props.isSub && hasVocabulary ? 'lesson-action lesson-action--enable' : 'lesson-action lesson-action--disable'} to={`/user/topic-vocabulary/${hasVocabulary}/shopping`} style={{ textDecoration: 'none', marginLeft: "0 !important" }}>
                                <Tooltip title="Từ vựng">
                                    <AccountBookOutlined className='icon-css' />
                                </Tooltip>
                            </Link>
                        </Space>
                    </Col>
                    <Col span={1}>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default UserLessonItem