import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import allActions from '../../actions';
import './UserTopicVocabulary.css';
import {Form, FormControl} from 'react-bootstrap';
import UserItemTopicVocabulary from '../../components/UserItemTopicVocabulary/userItemTopicVocabulary';

class UserTopicVocabulary extends Component {

    constructor(props){
        super(props);

        this.state = {
            term: ''
        }
    }

    componentDidMount() {
        this.props.onItemLoading()
        this.props.onUserGetAllTopicVocas()
        this.props.onUserGetAllGrammar()
    }

    showItemTopicVoca (topics) {
        var result = null;
        if(topics.length > 0 ){
            result = topics.map((topic, key) => {
                return (
                    <UserItemTopicVocabulary 
                        key={key}
                        id={topic.id}
                        name={topic.name}
                        image={topic.image}
                    />
                )
            })
        }
        return result;
    }

    callback = (term) => {
        this.setState({
            term: term
        })
    }

    render() {
        const dataSearch = this.state.term;
        const dataTable = this.props.userVocabularyTopicReducer;
        const resultSearch = []
        if(dataTable.length > 0){
            dataTable.forEach((item) => {
                if(item.name.toUpperCase().indexOf(dataSearch) !== -1){
                    resultSearch.push(item);
                }
            })
        }
        return (
            <div className='container-fluid main-content-user-topic'>
                <div className='row justify-content-center div-search-topic'>
                    <div className='col-md-12'>
                        <h6 className='text-title-topic'>Mời bạn chọn chủ đề cần học nhé!</h6>
                        <Form>
                            <FormControl maxLength={255}
                            onChange={(event) => this.callback(event.target.value.toUpperCase())} name="searchTopic"
                            type="text" placeholder="Tìm kiếm ..." className='userSearchTopic'/>
                        </Form>
                    </div>
                </div>
                <div className='user-layout'>
                    {this.showItemTopicVoca(resultSearch)}           
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userVocabularyTopicReducer: state.userVocabularyTopicReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUserGetAllTopicVocas: () => {
            dispatch(allActions.userVocabularyTopicAction.actUserFetchVocaTopicsRequest())
        },
        onUserGetAllGrammar: () => {
            dispatch(allActions.userGrammarAction.actUserFetchAllGrammarRequest())
        },
        onItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (UserTopicVocabulary);
