/**
 * List all the UI elements
 * Add all event listeners
 */
const submitCommentBtn = document.querySelector("#submit-post");
const resetCommentBtn = document.querySelector("#reset-post");
const editCommentsBtn = document.querySelectorAll(".edit-comment");
const deleteCommentsBtn = document.querySelectorAll(".delete-comment");
const postCommentEl = document.querySelector("#post-comment");

/**
 * Listen for post comment button click and triger a dispatch
 */
submitCommentBtn.addEventListener("click", function(){
    postComment(postCommentEl.value)
});

/**
 * Listen for reset comment and triger a comment dispatch
 */
resetCommentBtn.addEventListener("click", () => {
    resetCommentUI();
});


editCommentsBtn.forEach(editComment => {
    editComment.addEventListener("click", function(){
        this.parentElement.parentElement.parentElement.lastElementChild.classList.remove("d-none");
    })
})

/**
 * This listen's for user click delete button
 * @param {element} el 
 * @param {int} comment_id 
 */
const deleteComment = (el, comment_id) => {
    deleteCommentDispatch(comment_id, () =>{
        deleteCommentUIUpdate(el);
    })
}

const editComment = (el, comment_id) => {
    const comment =el.parentElement.parentElement.querySelectorAll('.edit-comment')[0].value;
    updateEditComment(comment_id, comment)
}

const cancelEditComment = el => {
    el.parentElement.parentElement.classList.add("d-none");
}

/**
 * This removes the comment div without reloading the page.
 * @param {element} el 
 */
const deleteCommentUIUpdate = el => {
    const comment = el.parentElement.parentElement.parentElement.parentElement.parentElement;
    comment.parentNode.removeChild(comment);
}

const resetCommentUI = () => {
    postCommentEl.value = "";
}