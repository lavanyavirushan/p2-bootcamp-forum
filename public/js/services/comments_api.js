const url = "http://localhost/api/";

/**
 * Create a comment for the post
 * User MUST BE Signed in
 * @param { "comment": string, "post_id": string } queryParam
 */
function postCommentAPI(queryPram, callback){
    $.ajax({
        method: 'POST',
        url: `${url}comment/${queryPram.post_id}`,
        contentType: 'application/json',
        data: JSON.stringify({
            comment: queryPram.comment
        }),
        success: function(result) {
            callback(result);
        },
        error: function ajaxError(jqXHR) {
            callback([]);
        }
    });
}

/**
 * If user decides to update the comment.
 * User must be signed in
 * Users can only update their own comment and not others
 * @param {comment_id, comment} queryPram 
 * @param {function} callback 
 */
const updateCommentAPI = (queryPram, callback) => {
    $.ajax({
        method: 'PUT',
        url: `${url}comment/${queryPram.comment_id}`,
        contentType: 'application/json',
        data: JSON.stringify({
            comment: queryPram.comment
        }),
        success: function(result) {
            callback(result);
        },
        error: function ajaxError(jqXHR) {
            callback([]);
        }
    });
}


/**
 * If user decides to delete the comment.
 * User must be signed in
 * Users can only delete their own comment and not others
 * @param {comment_id, comment} queryPram 
 * @param {function} callback 
 */
const deleteCommentAPI = (queryPram, callback) => {
    $.ajax({
        method: 'DELETE',
        url: `${url}comment/${queryPram.comment_id}`,
        contentType: 'application/json',
        success: function(result) {
            callback(result);
        },
        error: function ajaxError(jqXHR) {
            callback([]);
        }
    });
}