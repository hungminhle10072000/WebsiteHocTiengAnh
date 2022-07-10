import { notification } from 'antd';

const formatTime = time => {
    if (time < 60) {
        return time < 10 ? `0${time}` : `${time}`
    } else {
        return Math.floor(time/60)+ ' phút' + (time % 60) + ' giây'
    }
}

export {
    formatTime
} 

export const splitString = (str,length) => {
    if (!str) {
        return ""
    }
    if (str.length <= length) {
        return str;
    }
    return str.slice(0,length) + "..."
}
const openNotification = (message) => {
    notification['info']({
      message: message,
      description:'',
        placement:'top'
    });
  };
  

export const isValidStringLength = (FUNCTION_CODE,str,limit) => {
    if (str != null && str != undefined) {
        if (str.trim().length > limit) {
            let message = `Vui lòng nhập tối đa ${limit} ký tự.`
            openNotification(message);
            return false
        }
        return true
    }
    return true
}