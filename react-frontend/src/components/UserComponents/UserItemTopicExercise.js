import React from 'react'
import {Link} from "react-router-dom"
import {Card, CardImg,CardBody,CardTitle,CardSubtitle,CardText,Button,CardGroup} from 'reactstrap';
import './UserComponent.css'
import {splitString} from '../../utils/index'
function UserItemTopicExercise({id,img, name,description, status}) {
    return(        
        <div className='ma--20'>
            <Link to={"/user/exercise/"+id} style={{ textDecoration: 'none' }}>     
            <Card className='card-master-outline' >
                <CardImg style={{width:300+'px', height:200+'px'}}
                    alt="Card image cap"
                    src={img}
                    top
                />
                <CardBody className='pa--5'>
                    <CardTitle tag="h5">
                        {splitString(name,20) }
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                    {status === 0 ? <span style={{color:'orange', margin:'0px'}} >Chưa làm</span> : <span style={{color:'green', margin:'0px'}}>Đã làm</span>}
                    </CardSubtitle>
                    <CardText>
                        {splitString(description,60) }
                    </CardText>
                </CardBody>
            </Card>  
            </Link>
        </div> 
    )
}

export default UserItemTopicExercise;

    