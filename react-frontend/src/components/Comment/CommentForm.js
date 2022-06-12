import { useState } from "react";
import './../../App.css'

const CommentForm = ({handleSubmit,submitLabel,hasCancelButton = false,handleCancel,initialText=""}) => {
    const [text,setText] = useState(initialText)
    const isTextareaDisabled = text.length ===0
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("")
    }
    return (
        <form onSubmit={onSubmit} className="comment-form">
            <textarea
                className="comment-form-textarea"
                value= {text}
                onChange={(e) =>setText(e.target.value)}
            />
            <div className="ml--15 mt--5">
                <button className="btnn btnn--normal btnn--size-s" disabled={isTextareaDisabled}>{submitLabel}</button>
                {hasCancelButton && (
                    <button 
                        type="button" 
                        className="btnn btnn--normal btnn--size-s mt--5"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}
            </div>
            
        </form>
    )
}

export default CommentForm;