import React, { Component } from 'react'
import '../css/UserCSS.css'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {splitString} from '../../utils/index'
import './UserComponent.css'
class UserItemCourse extends Component {

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

    render() {
        return (
            <Link  to={`/user/learning/${this.props.course.id}`} style={{ textDecoration: 'none', margin: "5px 10px" }}>
            <Card className='card-master-outline'>
                <Card.Img className='img-card-outline' variant="top" src={this.state.course.image} />
                <Card.Body className='pa--5'>
                    <Card.Title >{splitString(this.state.course.name,20)}</Card.Title>
                    <Card.Text>
                        {splitString(this.state.course.introduce,60)}
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
            </Link>
        )
    }
}

export default UserItemCourse;