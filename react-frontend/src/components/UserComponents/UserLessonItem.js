import React, {Component} from 'react'
import '../css/UserCSS.css'
import { Space } from 'antd';
import {Link} from "react-router-dom"

import {
    FileDoneOutlined,
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
    AccountBookOutlined
} from '@ant-design/icons';

import {AiFillSnippets} from 'react-icons/gi';
import { TbVocabulary } from "react-icons/tb";

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
                video:this.props.lesson.video
            }
        }
    }

    render() {
        return(
            <div>
                <Row>
                    <Col span={20}>
                    <div style={{ padding: '0px' }} onClick={() => this.props.isSub && this.props.changedVideo(this.state.lesson.video, this.state.lesson.id, this.state.lesson.name)}>
                    <span style={{ fontWeight: 400, paddingRight: '5px' }}>{this.state.lesson.number}.</span>
                    <img src="/svg/schedule_black_24dp.svg" alt="" height="15" style={{ marginRight: '5px' }} />
                    <label className='title-lesson-name' title={this.state.lesson.name}>{this.state.lesson.name}</label>
                    <hr style={{ marginBottom: '8px', marginTop: '8px', color: '#dddddd', height: '1px' }} />

                </div>
                    </Col>
                    <Col span={3}>
                    <Space>
                    <Link to={"/user/exercise/1"} style={{ textDecoration: 'none' }}>    
                    <HomeOutlined className='icon-css'/>
                    </Link>
                    <Link to={"/user/topic-vocabulary/1/shopping"} style={{ textDecoration: 'none' }}>  
                        <SettingFilled className='icon-css'/>
                    </Link>
                        <SmileOutlined className='icon-css'/>
                    
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