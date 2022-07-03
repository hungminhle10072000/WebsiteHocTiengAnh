import { useEffect, useLayoutEffect, useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import CommentService from '../../services/CommentService'
import "antd/dist/antd.css";

const Comments = ({currentUserId,comments,learningId,type="1"}) => {
    const [backendComments, setBackendComments] = useState(comments)
    const [replyingComment, setReplyingComment] = useState(null)
    const [activeComment, setActiveComment] = useState(null)
    const rootComments = backendComments
                            .filter((backendComment) => backendComment.parentId===null)
                            .sort(
                                (a, b) =>
                                - new Date(a.time).getTime() - new Date(b.time).getTime()
                              );

    
    useEffect(()=> {
        if (type == '1') {
            CommentService.getCommentByLessonId(learningId).then(
                (res) => setBackendComments(res.data)
            )
        } else {
            setBackendComments(comments)
        }       
    }, [comments])

    const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
        new Date(a.time).getTime() - new Date(b.time).getTime()
      );

    const addComment = (body,parentId) => {
        if (currentUserId === -1) {
            alert('Vui lòng đăng nhập để bình luận!')
            return;
        }
        var comment = {
            content: body,
            parentId: parentId,
            lessonId: null,
            vocabularyTopicId:null,
            grammarId:null,
            userId: currentUserId,
            type: type
        }
  
        if (type === "1") {
            comment.lessonId =learningId;
        } else if (type === "2") {
            comment.vocabularyTopicId =learningId;
        } else if (type === "3") {
            comment.grammarId =learningId;
        }

        CommentService.addComment(comment).then(
            (comm) => {
                if (comm.status === 200 && comm.data.content.trim() === body.trim() ) {
                    setBackendComments([...backendComments,comm.data])
                } else {
                    alert('Thêm bình luận thất bại')
                }
        }).catch(() => {
            setActiveComment(null)
            alert('Thêm bình luận thất bại')
        })
        
        setActiveComment(null)
        setReplyingComment(null)
    }

    const updateComment = (text,commentId) => {

        if (currentUserId === -1) {
            alert('Vui lòng đăng nhập để cập nhập comment!')
            return;
        }
        var comment = {
            id: commentId,
            content: text,
        }    
        CommentService.updateComment(comment).then(
            (comm) => {
                let index = backendComments.findIndex(x => x.id === commentId)
                let lstNewComment = [...backendComments];
                if (index !== -1 && lstNewComment.length >= index) {
                    lstNewComment[index] = comm.data;
                }
                setBackendComments(lstNewComment);
        }).catch(() => {
            setActiveComment(null)
            alert('Cập nhập bình luận thất bại')
        })
        setActiveComment(null);
    }

    const deleteComment = (commentId) => {
        CommentService.deleteComment(commentId).then(
            (comm) => {
                let newLstComment = [];
                newLstComment =backendComments.filter((x)=> x.id != comm.data.id)
                setBackendComments(newLstComment)
            }
        ).catch(()=>alert('Xoá bình luận thất bại'))
    }

    return (
        
        <div className="comments">
            <h3 className="comments-title">Để lại bình luận ở bên dưới</h3>
            <CommentForm submitLabel="Bình luận" handleSubmit={addComment}/>
            <br/>
            <div className="comment-container">
                {
                rootComments.map((rootComment) =>
                <Comment key={rootComment.id}
                comment= {rootComment} 
                replies={getReplies(rootComment.id)}
                currentUserId={currentUserId}
                activeComment = {activeComment}
                setActiveComment = {setActiveComment}
                replyingComment={replyingComment} 
                setReplyingComment={setReplyingComment}
                addComment={addComment}
                updateComment={updateComment}
                deleteComment={deleteComment}/>)
                }
            </div>
        </div>
    )
}

export default Comments;