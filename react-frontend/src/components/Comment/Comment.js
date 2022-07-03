import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import moment from 'moment'
import './Comment.css';
import { Popconfirm } from 'antd';

const Comment = ({ comment,replies,currentUserId,activeComment,setActiveComment,replyingComment, setReplyingComment, addComment, updateComment, deleteComment, parentId = null}) => {
    const fiveMinutes = 300000;
    const timePassed = new Date - new Date(comment.time) > fiveMinutes;

    const canReply = Boolean(currentUserId)
    const canEdit = currentUserId === comment.userId
    const canDelete = currentUserId === comment.userId && replies.length ===0 && !timePassed;
    // const isReplying = replyingComment && replyingComment.id===comment.id ;


    const replyId = parentId ? parentId : comment.id
    const isEditing = activeComment && activeComment.id === comment.id && activeComment.type === "editing";
    const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === "replying"

    function confirm(e) {
        deleteComment(comment.id)
      }
      
      function cancel(e) {
        console.log(e);
      }

    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src={comment.userDto.avatar}
                 alt="avatar" 
                 onError={(e) => (e.target.onerror = null, e.target.src = "https://web-english.s3.ap-southeast-1.amazonaws.com/1648460064411-download.jpg")}
                 />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    {/* <div className="comment-author"></div> */}
                    <div><span className="item-fullname-comment">{comment.userDto.fullname}</span> <span className="item-date-comment">{moment(comment.time).format("DD/MM/YYYY hh:mm:ss")}</span></div>

                </div>
                {!isEditing && <div className="comment-text">{comment.content}</div>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Cập nhập"
                        hasCancelButton
                        initialText={comment.content}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => {
                            setActiveComment(null);
                        }}
                    />
                )}
                <div className="comment-actions" >
                    {canReply && <div className="comment-action" onClick={() =>setActiveComment({id:comment.id,type:"replying"})}>Trả lời</div>}
                    {canEdit && <div className="comment-action" onClick={() =>setActiveComment({id:comment.id,type:"editing"})}>Chỉnh sửa</div>}
                    {canDelete && <div className="comment-action">
                    <Popconfirm
                        title="   Bạn có chắc chắn muốn xoá bình luận không?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <a href="#" style={{"color": "black","textDecoration": "none"}}>Xoá</a>
                    </Popconfirm>
                    </div>}
                </div>
                {
                    isReplying && <CommentForm submitLabel="Bình luận" initialText="" handleSubmit={(text) => addComment(text,replyId)} hasCancelButton handleCancel={() => {
                        setActiveComment(null);
                    }}  >

                    </CommentForm>
                }
                {replies.length > 0 && (
                    <div className="replies">
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                replies={[]}
                                currentUserId={currentUserId}
                                activeComment = {activeComment}
                                setActiveComment = {setActiveComment}
                                replyingComment={replyingComment}
                                setReplyingComment={setReplyingComment}
                                addComment={addComment}
                                updateComment={updateComment}
                                deleteComment={deleteComment}
                                parentId={comment.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment;