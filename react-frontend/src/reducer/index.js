import { combineReducers } from "redux"
import users from './users'
import admin_alert_info from './admin_alert_info'
import itemUserEdit from './itemUserEdit'
import itemUserLogin from "./itemUserLogin"
import statusRegister from "./statusRegister"
import vocabularyTopics from './VocabularyTopicReducer/vocabularyTopics'
import statusFormAddVocaTopic from "./VocabularyTopicReducer/statusFormAddVocaTopic"
import itemVocaTopicEdit from './VocabularyTopicReducer/itemVocaTopicEdit'

import  courseReducer  from '../reducer/courseReducer/courseReducer'
import courseEditReducer from '../reducer/courseReducer/courseEditReducer'
import chapterReducer from '../reducer/chapterReducer/chapterReducer'
import chapterEditReducer from "../reducer/chapterReducer/chapterEditReducer";
import lessonReducer from "./lessonReducer/lessonReducer";

import statusFormSendMail from "./statusFormSendMail"

const appReducers = combineReducers({
    users,
    courseReducer,
    itemUserEdit,
    admin_alert_info,
    itemUserLogin,
    statusRegister,
    courseEditReducer,
    chapterReducer,
    chapterEditReducer,
    lessonReducer,
    statusFormSendMail,
    vocabularyTopics,
    statusFormAddVocaTopic,
    itemVocaTopicEdit
});
export default appReducers;