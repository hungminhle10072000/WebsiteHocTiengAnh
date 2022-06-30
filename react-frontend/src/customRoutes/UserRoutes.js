import React, { Component, Fragment } from 'react'
import {
    Switch,
    Route,
    Redirect,
    BrowserRouter
} from "react-router-dom";
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ContentPage from '../pages/ContentPage';
import UserCoursePage from '../pages/UserHomePage/UserCoursePage'
import UserLearningPage from '../pages/UserHomePage/UserLearningPage';
import UserTopicVocabulary from '../pages/UserTopicVocabulary/UserTopicVocabulary'
import UserDetailTopicVocabulary from '../pages/UserDetailTopicVocabulary/UserDetailTopicVocabulary'
import UserGrammar from '../pages/UserGrammar/UserGrammar'
import UserEditInfomation from '../pages/UserEditInfo/UserEditInfo';
import UserExercisePage from '../pages/UserHomePage/UserExercisePage';
import UserTopicExercisePage from '../pages/UserHomePage/UserTopicExercisePage';
import HomePage from '../pages/HomePage/HomePage';
import UserStatisticalPage from '../pages/UserHomePage/UserStatisticalPage';
import GroupChatUser from '../pages/GroupChatUser/GroupChatUser';
import UserPracticeVocabulary from '../pages/UserPracticeVocabulary/UserPracticeVocabulary';

export default class UserRoutes extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={HomePage}/> 
                    <Route exact path="/user/home" component={HomePage} />
                    <Route exact path="/user/topic-vocabulary" component={UserTopicVocabulary}/>
                    <Route exact path="/user/topic-vocabulary/:idTopic/:nameTopicVoca" component={UserDetailTopicVocabulary}/>
                    <Route exact path="/user/grammar" component={UserGrammar}/>    
                    <Route exact path="/user/courses/:type" component={UserCoursePage}/>   
                    <Route exact path="/user/learning/:id" component={UserLearningPage}/>
                    <Route exact path="/user/account/edit/:id" component={UserEditInfomation}/>   
                    <Route exact path="/user/exercise" component={UserTopicExercisePage}/>    
                    <Route exact path="/user/exercise/:id" component={UserExercisePage}/>   
                    <Route exact path="/user/statistical" component={UserStatisticalPage}/>
                    <Route exact path="/user/groupchat" component={GroupChatUser}/>
                    <Route exact path="/user/practice-vocabulary/:idTopic/:nameTopic" component={UserPracticeVocabulary}/>
                    {/* <Route exact path="/" component={ContentPage} />
                    <Route path="*" component={NotFoundPage} /> */}
                </Switch>   
            </Fragment>
        )
    }
}
