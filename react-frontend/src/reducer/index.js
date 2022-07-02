import { combineReducers } from "redux"
import users from './users'
import admin_alert_info from './admin_alert_info'
import itemUserEdit from './itemUserEdit'
import itemUserLogin from "./itemUserLogin"
import statusRegister from "./statusRegister"
import vocabularyTopics from './VocabularyTopicReducer/vocabularyTopics'
import statusFormAddVocaTopic from "./VocabularyTopicReducer/statusFormAddVocaTopic"
import itemVocaTopicEdit from './VocabularyTopicReducer/itemVocaTopicEdit'
import listVocabularyWithTopic from "./VocabularyReducer/listVocabularyWithTopic"
import itemVocaEdit from "./VocabularyReducer/itemVocaEdit"

import  courseReducer  from '../reducer/courseReducer/courseReducer'
import courseEditReducer from '../reducer/courseReducer/courseEditReducer'
import chapterReducer from '../reducer/chapterReducer/chapterReducer'
import chapterEditReducer from "../reducer/chapterReducer/chapterEditReducer";
import lessonReducer from "./lessonReducer/lessonReducer";

import statusFormSendMail from "./statusFormSendMail"
import statusFormAddVoca from "./VocabularyReducer/statusFormAddVoca"

import lessonEditReducer from "./lessonReducer/lessonEditReducer";

import grammarsReducer from "./GrammarReducer/grammarsReducer"
import statusFormAddGrammar from './GrammarReducer/statusFormAddGrammar'
import itemGrammarEdit from './GrammarReducer/itemGrammarEdit'

import commentReducer from "./commentReducer/commentReducer"

import userVocabularyTopicReducer from "./UserVocabularyTopicReducer/userVocabularyTopicReducer"
import userVocabularyWithTopic from './VocabularyReducer/userListVocabularyWithTopic'

import UserItemLearnGrammar from './UserItemLearnGrammar/UserItemLearnGrammar'
import userListGrammar from './UserGrammarReducer/userListGrammar'
import userValueSelectGrammar from './UserGrammarReducer/userValueSelectGrammar'
import statusFormAdminExercise from "./AdminExercise/statusFormAdminExercise"
import exerciseReducer from "./AdminExercise/exerciseReducer"
import itemExerciseEdit from './AdminExercise/itemExerciseEdit'
import questionReducer from './QuestionReducer/questionReducer'
import itemQuestionEditReducer from './QuestionReducer/itemQuestionEditReducer'
import statusItemLoading from './statusItemLoading'
import statusButtonLoading from './statusButtonLoading'
import topicVocaNew from "./VocabularyTopicReducer/topicVocabuarlyNew"
import courseNew from "./courseReducer/courseNew"

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
    itemVocaTopicEdit,
    listVocabularyWithTopic,
    statusFormAddVoca,
    itemVocaEdit,
    lessonEditReducer,
    grammarsReducer,
    statusFormAddGrammar,
    itemGrammarEdit,
    commentReducer,
    userVocabularyTopicReducer,
    userVocabularyWithTopic,
    UserItemLearnGrammar,
    userListGrammar,
    userValueSelectGrammar,
    statusFormAdminExercise,
    exerciseReducer,
    itemExerciseEdit,
    questionReducer,
    itemQuestionEditReducer,
    statusItemLoading,
    statusButtonLoading,
    topicVocaNew,
    courseNew
});
export default appReducers;