import React, { Component } from 'react'
import './userItemTopicVocabulary.css'
import convertURL from '../../constants/convertUrl'
import {
    Link
} from "react-router-dom"
import {withRouter} from 'react-router-dom'
import PropTypes from "prop-types"
import { Spring, animated } from 'react-spring'

class userItemTopicVocabulary extends Component {

    handleDetailTopic = () => {
        this.props.history.push('/user/topic-vocabulary/' + this.props.id + '/' + convertURL(this.props.name));
    }

    handleDetailPractice = () => {
        this.props.history.push('/user/practice-vocabulary/' + this.props.id + '/' + convertURL(this.props.name));
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        return (
            <Spring
                from={{opacity: 0, marginTop: -200}}
                to={{opacity: 1, marginTop: 0}}
                config= {{delay: 300, duration: 1000}}
            >
                {props => 
                    <animated.div style={props} className='col mb-2 item-topic'>
                            <div className="card card-topic h-100 card-item-vocabulary" style={{width: '197px', height: '169px'}}>
                                <img className="card-img-top img-user-topic" src={this.props.image} alt="Ảnh mô tả chủ đề topic"/>
                                <div className="card-body">
                                    <h6 className="card-title">{this.props.name}</h6>
                                </div>
                                <div>
                                    <button onClick={() => this.handleDetailTopic()}
                                    className='btn btn-success btn-detail-topic'>Xem chi tiết</button>
                                    <button 
                                    onClick={() => this.handleDetailPractice()}
                                    className='btn btn-warning btn-practice-topic'
                                    style={{color: 'white'}}
                                    >Luyện tập
                                    </button>
                                </div>
                            </div>
                    </animated.div>}
            </Spring>
        )
    }
}

export default withRouter(userItemTopicVocabulary);