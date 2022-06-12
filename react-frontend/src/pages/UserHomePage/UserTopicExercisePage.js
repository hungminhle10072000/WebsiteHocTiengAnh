import React,{useEffect,useState, useLayoutEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import ExerciseService from '../../services/ExerciseService'
import UserItemTopicExercise from '../../components/UserComponents/UserItemTopicExercise';
import ResultService from '../../services/ResultService';

function UserTopicExercisePage() {
    const [exercises,setExercises] = useState([])
    const [results,setResults] = useState([])
    const userCurrent = useSelector((state) => state.itemUserLogin);

    useLayoutEffect(()=>{
        if (userCurrent.id !== -1) {
            ExerciseService.getAllExercise().then(res=>setExercises(res.data))
            ResultService.getResultByUserId(userCurrent.id).then(res=> setResults(res.data))
        } 
    },[userCurrent])

    return(
        <>
            <div className='title-size-l ml--25 mr--25'>Bài tập rèn luyện</div>
            <div className='user-layout'>
            {userCurrent.id === -1 ?
            <div style={{textAlign:'center', marginTop:'150px'}}>
                <h2> Vui lòng đăng nhập để sử dụng chức năng này.</h2>
                <button className='button-user-login' onClick={()=>window.location.pathname = ('/login')}>Đăng nhập</button>
            </div> 
            :
            (exercises.map(x=> {
                console.log("X ",x)
                let status =0;
                results.forEach(y => {
                    if (y.exerciseId === x.id) {
                        status = 1 ;    
                    }
                })
             return <UserItemTopicExercise key={x.id} id={x.id} img={x.image} name={x.name} description={x.description} status={status} />
            }))
            }  
         </div>
        </>
        
    )
}

export default UserTopicExercisePage;