import React, { Component } from 'react'
import '../css/UserCSS.css'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {splitString} from '../../utils/index'
import './UserItemCourseNew.css';
import iconNew from '../../assets/images/icon-new.jpg'
import { Spring, animated } from 'react-spring'
import PropTypes from "prop-types"
import {withRouter} from 'react-router-dom'

class UserItemCourseNew extends Component {


    constructor(props) {
        super(props);

        this.state = {
            course: {
                id: this.props.course.id,
                name: this.props.course.name,
                image: this.props.course.image,
                introduce: this.props.course.introduce
            }
        }
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    
    handleDetailTopic = () => {
        this.props.history.push('/user/learning/' + this.props.course.id);
    }

    render() {
        return (
            // <Link  to={`/user/learning/${this.props.course.id}`} style={{ textDecoration: 'none', margin: "10px 15px" }}>
            // <Card className='card-master-outline'>
            //     <img className='icon-new' src={iconNew}/>
            //     <Card.Img className='img-card-outline' variant="top" src={this.state.course.image} />
            //     <Card.Body className='pa--5'>
            //         <Card.Title >{splitString(this.state.course.name,20)}</Card.Title>
            //         <Card.Text>
            //             {splitString(this.state.course.introduce,60)}
            //         </Card.Text>
            //         {/* <Button variant="primary">Go somewhere</Button> */}
            //     </Card.Body>
            // </Card>
            // </Link>
            <Spring
            from={{opacity: 0, marginTop: -200}}
            to={{opacity: 1, marginTop: 0}}
            config= {{delay: 300, duration: 1000}}
        >
            {props => 
                <animated.div style={props} className='col mb-2 item-topic-new'>
                    <div className='card card-item-topic-new'>
                        <img className='icon-new' src={iconNew}/>
                        <img className='img-topic-new' src={this.state.course.image} alt="Ảnh mô tả chủ đề topic"/>
                        <div className='card-body'>
                            <h6 className='card-title'>{splitString(this.state.course.name,20)}</h6>
                        </div>
                        <div>
                            <button onClick={() => this.handleDetailTopic()}
                            className='btn btn-success btn-detail-topic-new'>Xem chi tiết</button>
                        </div>
                    </div>
                </animated.div>}
        </Spring>
        )
    }
}

export default withRouter(UserItemCourseNew);