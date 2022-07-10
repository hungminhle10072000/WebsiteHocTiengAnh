import * as Types from '../constants/ActionTypes';

const changeAdminAlertOn = (admin_alertContent, admin_alertType) => {
    return{
        type: Types.ALERT_ADMIN_ON,
        admin_alertContent,admin_alertType
    }
}

const changeAdminAlertOff = () => {
    return {
        type: Types.ALERT_ADMIN_OFF
    }
}

const changeOpenAlertSendMail = (alertEmailContent, alertEmailType) => {
    return {
        type: Types.ALERT_OPEN_LOADING_SENDMAIL,
        alertEmailContent,alertEmailType
    }
}

const changeOffAlertSendMail = () => {
    return {
        type: Types.ALERT_OFF_LOADING_SENDMAIL
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    changeAdminAlertOn,
    changeAdminAlertOff,
    changeOpenAlertSendMail,
    changeOffAlertSendMail
}