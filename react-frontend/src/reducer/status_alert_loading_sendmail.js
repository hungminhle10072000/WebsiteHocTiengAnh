import * as Types from '../constants/ActionTypes';

const initInitialState = {
    AlertEmailShow: false,
    AlertEmailType: ''
}


const status_alert_loading_sendmail = (state = initInitialState, action) => {
    switch (action.type) {
        case Types.ALERT_OPEN_LOADING_SENDMAIL:
            return {...state, AlertEmailShow: true, AlertEmailContent: action.alertEmailContent, AlertEmailType: action.alertEmailType}
        case Types.ALERT_OFF_LOADING_SENDMAIL:
            return {...state, AlertEmailShow: false}
        default:
            return state
    }
}

export default status_alert_loading_sendmail;