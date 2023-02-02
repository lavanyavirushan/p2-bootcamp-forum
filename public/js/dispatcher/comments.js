/**
 * This will send the comment to back-end and reload the page
 * TODO: if api faild show a model with error
 * @param {string} comment 
 */
const postComment = comment => {
    const urlPathArray = window.location.pathname.split('/');
    postCommentAPI({
        comment: comment,
        post_id: urlPathArray[2]
    }, (data) => {
        /**
        * TODO: would be nice to let the user know if users comment is poseted using bootstrap model.
        * TODO: Insted of page reload we should do lazy load.
        */
        location.reload();
    })
}

/**
 * Sends the request to Comments api to update the comment and reload the page
 * @param {int} comment_id 
 * @param {string} comment 
 */
const updateEditComment = (comment_id, comment) => {
    updateCommentAPI({
        comment_id: comment_id, 
        comment: comment
    }, (data) => {
        /**
         * TODO: would be nice to let the user know if the comment was updated using bootstrap mode.
         * TODO: Insted of page reload we should do lazy load.
         */
        location.reload();
    });
}

/**
 * Sends the request to Comments api to update the comment and reload the page
 * @param {int} comment_id 
 * @param {string} comment 
 */
const deleteCommentDispatch = (comment_id, callback) => {
    deleteCommentAPI({
        comment_id: comment_id
    }, (data) => {
        /**
         * TODO: would be nice to let the user know if the comment was deleted using bootstrap mode.
         * TODO: Insted of page reload we should do lazy load.
         */
        //location.reload();
        callback()
    });
}