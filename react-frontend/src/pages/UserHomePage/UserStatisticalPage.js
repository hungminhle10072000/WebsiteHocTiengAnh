import { CanvasJSChart } from 'canvasjs-react-charts'
import { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import StatisticalService from './../../services/StatisticalService'
import './css/UserStatistical.css'
import {GiTrophyCup} from  "react-icons/gi";
var scoreOfDays = [
{ x: 2, y: 0 },
{ x: 3, y: 100 },
{ x: 4, y: 0 },
{ x: 5, y: 0 },
{ x: 6, y: 10 },
{ x: 7, y: 0 },
{ x: 8, y: 0 }]

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
    useEffect(() => {
        StatisticalService.getStatisticalByUserId(userId,weekAgo)
            .then(res => {         
                let data = res.data;
                setStatisticalMasterList(data)
            })
    }, [weekAgo])
    console.log("USERINFO: ",userInfo)
    for( let i=0; i< statisticalMasterList.length; i++) {
        if (statisticalMasterList[i].statisticalDtoList[0].userId == userId) {
            let statisticalDtoList = statisticalMasterList[i].statisticalDtoList;
            scoreOfDays = statisticalDtoList.map((item,index)=> {
                return {x:index+2,y:item.score}
            } )
        }
        listFullName[i].title = statisticalMasterList[i].fullname;
        listFullName[i].totalScoreOfWeek = statisticalMasterList[i].totalScoreOfWeek;
        listFullName[i].avatar = statisticalMasterList[i].avatar;
    }

    console.log("SCOREOFDAYS: ",scoreOfDays)

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
        axisX: {
            title: "Thứ trong tuần",
            prefix: "Thứ ",
            interval: 1
        },
        data: [{
            type: "column",
            toolTipContent: "Thứ {x}: {y} điểm",
            dataPoints: scoreOfDays
        }]
    }
    return (
        <>
            <div className='statistical-layout'>
                <div className='statistical-layout__chart'>
                    <div className='statistical-layout__card'>
                        <div className='title-size-l'>Báo cáo học tập</div>
                        <div className='statistical-layout__card__title'>
                            <div className='card-header-item'>
                                <div>
                                    <label className='span__lbl--item'>Họ tên:</label>
                                    <span className='font-weight-bold'>{userInfo ? userInfo.fullname : ''}</span>
                                </div>
                                <div>
                                    <label className='span__lbl--item'>Email:</label>
                                    <span className='font-weight-bold'>{userInfo ? userInfo.email : ''}</span>
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
              
        </>
    )
}

export default UserStatisticalPage;