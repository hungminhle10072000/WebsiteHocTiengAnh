import useSelection from 'antd/lib/table/hooks/useSelection';
import { CanvasJSChart } from 'canvasjs-react-charts'
import { useEffect, useState } from 'react';
import StatisticalService from './../../services/StatisticalService'
import { Row, Col } from 'antd'
import { Select } from 'antd';
import './css/UserStatistical.css'
const initialScoreOfDays = [
{ x: 1, y: 0 },
{ x: 2, y: 0 },
{ x: 3, y: 0 },
{ x: 4, y: 0 },
{ x: 5, y: 0 },
{ x: 6, y: 0 },
{ x: 7, y: 0 },
{ x: 8, y: 0 },
{ x: 9, y: 0 },
{ x: 10, y: 0 },
{ x: 11, y: 0 },
{ x: 12, y: 0 },
{ x: 13, y: 0 },
{ x: 14, y: 0 },
{ x: 15, y: 0 },
{ x: 16, y: 0 },
{ x: 17, y: 0 },
{ x: 18, y: 0 },
{ x: 19, y: 0 },
{ x: 20, y: 0 },
{ x: 21, y: 0 },
{ x: 22, y: 0 },
{ x: 23, y: 0 },
{ x: 24, y: 0 },
{ x: 25, y: 0 },
{ x: 26, y: 0 },
{ x: 27, y: 0 },
{ x: 28, y: 0 },
{ x: 29, y: 0 },
{ x: 30, y: 0 },
{ x: 31, y: 0 },]

const initialMonths = [1,2,3,4,5,6,7,8,9,10,11,12];
const initialYears = [2021,2022,2023];
const initialUserInfo = {
    "fullname": 'Bùi Văn Nghĩa',
    "process": 1,
    "streak": 1,
    "currentScore": 1000,
    "monthNow": 5,
    "yearNow": 2022,
    "email":'nghia@gmail.com'
}
const { Option } = Select;
function UserStatisticalPage() {
    const [scoreOfDays, setScoreOfDays] = useState([])
    const [userInfo, setUserInfo] = useState(initialUserInfo)
    const handleChange = (value) => {
        if (value > 1000) {
            setUserInfo({
                ...userInfo,
                "yearNow": value,
            })
        } else {
            setUserInfo({
                ...userInfo,
                "monthNow": value,
            })
        }
        console.log("MONTHNOW: ",userInfo)
        StatisticalService.getStatisticalByUserId(16,userInfo.monthNow,userInfo.yearNow)
            .then(res => {         
                let data = res.data;
                let newScoreOfDays = initialScoreOfDays;
                const userInfo = {
                    "fullname": data.fullname,
                    "process": data.process,
                    "streak": data.streak,
                    "currentScore": data.currentScore,
                    "monthNow": data.monthNow,
                    "yearNow": data.yearNow,
                    "email":data.email
                }
                setUserInfo(userInfo)
                data.statisticalDtoList.forEach(element => {
                    let date = new Date(element.dateCreateDate)
                    console.log("Days: ",date.getDate())
                    newScoreOfDays[date.getDate()-1].y += element.score;
                });
                setScoreOfDays(newScoreOfDays)
            })
        console.log(`selected ${value}`);
      };
    useEffect(() => {
        StatisticalService.getStatisticalByUserId(16,-1,-1)
            .then(res => {         
                let data = res.data;
                console.log("DATA:",data)
                let newScoreOfDays = initialScoreOfDays;
                const userInfo = {
                    "fullname": data.fullname,
                    "process": data.process,
                    "streak": data.streak,
                    "currentScore": data.currentScore,
                    "monthNow": data.monthNow,
                    "yearNow": data.yearNow,
                    "email":data.email
                }
                setUserInfo(userInfo)
                data.statisticalDtoList.forEach(element => {
                    let date = new Date(element.dateCreateDate)
                    console.log("Days: ",date.getDate())
                    newScoreOfDays[date.getDate()-1].y += element.score;
                });
                setScoreOfDays(newScoreOfDays)
            })
    }, [])
    console.log("USERINFO: ",userInfo)
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: "Thống kê điểm luyện tập của tháng"
        },
        axisY: {
            title: "Điểm",
            // suffix: "%"
        },
        axisX: {
            title: "Tháng của năm",
            prefix: "Ngày",
            interval: 1
        },
        data: [{
            type: "line",
            toolTipContent: "Ngày {x}: {y} điểm",
            dataPoints: scoreOfDays
        }]
    }
    return (
        <>
            <div className='card-header-right'>
                <Row>
                    <Col span={12}>
                        <div className='card-header'>
                            <div className='card-header-item'>
                                <div>
                                    <span>Họ tên:</span>
                                    <span className='font-weight-bold'>{userInfo ? userInfo.fullname: ''}</span>
                                </div>
                                <div>
                                    <span>Email:</span>
                                    <span className='font-weight-bold'>{userInfo ? userInfo.email : ''}</span>
                                </div>
                            </div>
                        </div>
                    
                    </Col>
                    <Col span={12}>
                        <Row>
                        <Col span={12}></Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <div>
                                        <label>
                                            Chọn tháng
                                        </label>
                                        <br/>
                                        <Select defaultValue={"Tháng "+ userInfo ? userInfo.monthNow : ''}  style={{ width: 120 }} onChange={handleChange}>
                                            {initialMonths.map(month => <Option key={month} value={month}>Tháng {month}</Option>)}
                                        </Select>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <label>
                                            Chọn năm
                                        </label>
                                        <br/>
                                        <Select defaultValue={userInfo ? userInfo.yearNow : ''}  style={{ width: 120 }} onChange={handleChange}>
                                            {initialYears.map(year => <Option key={year} value={year}>{year}</Option>)}
                                        </Select>
                                    </div>
                                </Col>
                                
                            </Row>    
                        </Col>
                        </Row>
                    </Col>
                    
                </Row>
            </div>
            <div className='chart-months'>
                <Row>
                    <CanvasJSChart options={options} />
                </Row>
            </div>    
        </>
    )
}

export default UserStatisticalPage;