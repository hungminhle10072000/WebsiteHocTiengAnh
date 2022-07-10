import { CanvasJSChart } from 'canvasjs-react-charts'
import { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import StatisticalService from './../../services/StatisticalService'
import './css/UserStatistical.css'
import {GiTrophyCup} from  "react-icons/gi";
import { useSelector,useDispatch } from 'react-redux';
import { Spin } from 'antd';
var scoreOfDays = [
{ x: 2, y: 0, lable: 'Thứ 2' },
{ x: 3, y: 0, lable: 'Thứ 3' },
{ x: 4, y: 0, lable: 'Thứ 4' },
{ x: 5, y: 0, lable: 'Thứ 5' },
{ x: 6, y: 0, lable: 'Thứ 6' },
{ x: 7, y: 0, lable: 'Thứ 7' },
{ x: 8, y: 0, label:'Chủ nhật' }]

var listFullName = [
    {
        index: 1,  
        title: 'Ant Design Title 1',
        totalScoreOfWeek:0,
        avatar: ''
    },
    {
        index: 2,  
        title: 'Ant Design Title 1',
        totalScoreOfWeek:0,
        avatar: ''
    },
    {
        index: 3,  
        title: 'Ant Design Title 1',
        totalScoreOfWeek:0,
        avatar: ''
    },
    {
        index: 4,  
        title: 'Ant Design Title 1',
        totalScoreOfWeek:0,
        avatar: ''
    },
    {
        index: 5,  
        title: 'Ant Design Title 1',
        totalScoreOfWeek:0,
        avatar: ''
    }
  ];
  

const initialUserInfo = {
    "userId": -1,
    "fullname": 'Bùi Văn Nghĩa',
    "process": 1,
    "streak": 1,
    "currentScore": 1000,
    "monthNow": 5,
    "yearNow": 2022,
    "email":'nghia@gmail.com'
}
function UserStatisticalPage() {
    var userId = localStorage.getItem('idUser')
    const [userInfo, setUserInfo] = useState(initialUserInfo)
    const [statisticalMasterList, setStatisticalMasterList] = useState([])
    const [weekAgo,setWeekAgo] = useState(0)
    const handleChange = async(value) => {
        setWeekAgo(value)
    };
    const userCurrent = useSelector((state) => state.itemUserLogin);
    useEffect(() => {
        StatisticalService.getStatisticalByUserId(userId,weekAgo)
            .then(res => {         
                let data = res.data;
                let userIf = data.find(x=>x.userId==userId)
                setUserInfo(userIf)
                setStatisticalMasterList(data)
            })
    }, [weekAgo])
    for( let i=0; i< statisticalMasterList.length; i++) {
        if (statisticalMasterList[i].userId == userId) {
            let statisticalDtoList = statisticalMasterList[i].statisticalDtoList;
            scoreOfDays = statisticalDtoList.map((item,index)=> {
                let label = 'Thứ '+( index+2)
                if (index ===6) {
                    label = 'Chủ nhật'
                }
                return {x:index+2,y:item.score,label: label}
            } )
        }
        listFullName[i].title = statisticalMasterList[i].fullname;
        listFullName[i].totalScoreOfWeek = statisticalMasterList[i].totalScoreOfWeek;
        listFullName[i].avatar = statisticalMasterList[i].avatar;
    }
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: "Điểm luyện tập trong tuần"
        },
        axisY: {
            title: "Điểm",
            // suffix: "%"
        },
        // axisX: {
        //     title: "",
        //     prefix: "Thứ",
        //     interval: 1
        // },
        data: [{
            type: "column",
            toolTipContent: "Thứ {x}: {y} điểm",
            dataPoints: scoreOfDays
        }]
    }
    return (
        <>      
        {userInfo.userId == -1 &&  <Spin style={{position:'absolute', top:'50%', left:'50%', zIndex:2}} size="large" />}
        {userCurrent.id === -1 ?
            <div style={{textAlign:'center', marginTop:'150px'}}>
                <h2> Vui lòng đăng nhập để sử dụng chức năng này.</h2>
                <button className='button-user-login' onClick={()=>window.location.pathname = ('/login')}>Đăng nhập</button>
            </div> :
            <div className='statistical-layout'>
                <div className='statistical-layout__chart'>
                    <div className='statistical-layout__card'>
                        <div className='title-size-l'>Báo cáo học tập</div>
                        <div className='statistical-layout__card__title'>
                            <div className='card-header-item display-flex'>
                                <div>
                                    <div>
                                        <label className='span__lbl--item font-weight-bold'>Họ tên:</label>
                                        <span className='font-weight-bold'>{userInfo ? userInfo.fullname : ''}</span>
                                    </div>
                                    <div>
                                        <label className='span__lbl--item font-weight-bold'>Email:</label>
                                        <span className='font-weight-bold'>{userInfo ? userInfo.email : ''}</span>
                                    </div>
                                </div>
                                <div>
                                <div>
                                        <label className='span__lbl--item font-weight-bold cl--orange'>{userInfo ? userInfo.streak : ''} Streak</label>
                                        <span className='font-weight-bold'></span>
                                    </div>
                                    <div>
                                        <label className='span__lbl--item font-weight-bold cl--green'>{userInfo ? userInfo.currentScore : ''} XP</label>
                                        <span className='font-weight-bold'></span>
                                    </div>
                                </div>

                            </div>
                            <div className='statistical-layout__list-week'>
                                <button className='statistical-layout__week-item' onClick={()=>handleChange(0)}>Tuần này</button>
                                <button className='statistical-layout__week-item' onClick={()=>handleChange(1)}>Một tuần trước</button>
                                <button className='statistical-layout__week-item' onClick={()=>handleChange(2)}>Hai tuần trước</button>
                                <button className='statistical-layout__week-item' onClick={()=>handleChange(3)}>Ba tuần trước</button>
                            </div>
                        </div>
                    </div>
                    <div className='statistical-layout__chart__item'>
                        <CanvasJSChart options={options} />
                    </div>
                </div>
                <div className='statistical-layout__leader-board'>
                    <div className='leaderboard-header'>
                        <span><GiTrophyCup></GiTrophyCup></span>
                        <span>Leaderboard</span>
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={listFullName}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={
                                        // <a href="https://ant.design">
                                            <label className='card-ranking'>
                                                <span className='card-ranking__ranking'>{item.index}. </span>
                                                <span className='card-ranking__name'>{item.title}</span>
                                                <span className='card-ranking__total-score'>{item.totalScoreOfWeek}</span>
                                            </label>
                                        
                                        // </a>
                                        }
                                    // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </div>

            </div>
        }        
        </>
    )
}

export default UserStatisticalPage;