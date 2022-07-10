import React, { Component } from 'react'
import './AdminItemContentGrammar.css'
import Classiceditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { connect } from 'react-redux'
import allActions from '../../actions'
import { BiSave, BiRefresh } from "react-icons/bi"

class AdminItemContentGrammar extends Component {

    constructor(props){
        super(props);

        this.state = ({
            idGrammar: this.props.match.params.id,
            grammarEdit: {},
            statusCheck: false
        })
        
    }

    handleCkeditorState = (event, editor) => {
        const data = editor.getData();
        this.setState({
            grammarEdit: {...this.state.grammarEdit, content: data}
        })
    }
    
    componentDidMount() {
        // this.props.onItemLoading();
        this.props.getAllGrammars();
    }

    editorConfig = {
        mediaEmbed: {
            previewsInData: true
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.grammars){
            let {grammars} = nextProps
            if(grammars.length > 0){
                grammars.forEach((item) => {
                    if(item.id == this.state.idGrammar){
                        this.setState({
                            grammarEdit: {...item}
                        })
                    }
                })
            }
        }
        if(nextProps && nextProps.statusButtonLoading){
            this.setState({
                statusCheck: nextProps.statusButtonLoading.statusCheck
            })
        }
    }

    handleUpdateContent = () => {
        const {idGrammar} =  this.state
        this.props.onOpenButtonLoading();
        this.props.onUpdateContentGrammar(idGrammar, this.state.grammarEdit.content)
    }

    handleReset = () => {
        let {grammars} = this.props
        if(grammars.length > 0){
            grammars.forEach((item) => {
                if(item.id == this.state.idGrammar){
                    this.setState({
                        grammarEdit: {...item}
                    })
                }
            })
        }
    }

    

    render() {
        const {statusCheck} = this.state
        return (
            <div className="container-fluid">
                <div className="row text-center justify-content-center">
                    <div className="col-md-8 title-name-grammar text-center">{this.state.grammarEdit.name}</div>
                </div>
                <div className="row mt-4">
                    <h3>Nội dung bài học:</h3>
                    <div className="col-md-12">
                        <CKEditor 
                            editor={Classiceditor}
                            data={this.state.grammarEdit.content}
                            onReady={ editor => {
                                
                            }}
                            config={ this.editorConfig }
                            onChange={this.handleCkeditorState}
                        />             
                    </div>
                </div>
                <div className="mt-2 mb-2">
                    <button disabled={statusCheck} className="btn btn-success" onClick={() => this.handleUpdateContent()}>
                        {statusCheck && "Đang xử lý "}
                        {statusCheck && <BiRefresh />}
                        {!statusCheck && "Cập nhật "}
                        {!statusCheck && <BiSave />}
                    </button>
                    <button className="btn btn-warning btn-reset-content-grammar" type="reset" onClick={() => this.handleReset()}>Làm mới</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        grammars: state.grammarsReducer,
        statusButtonLoading: state.statusButtonLoading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllGrammars: () => {
            dispatch(allActions.grammarAction.actFetchGrammarRequest());
        },
        onUpdateContentGrammar: (id, content_grammar) => {
            dispatch(allActions.grammarAction.actUpdateContentGrammarRequest(id, content_grammar));
        },
        onItemLoading: () => {
            dispatch(allActions.userItemLoadingAction.openItemLoading())
        },
        onOpenButtonLoading: () => {
            dispatch(allActions.statusButtonLoadingAction.openButtonLoading())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminItemContentGrammar)
